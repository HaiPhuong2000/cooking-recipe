import type {
  Recipe,
  RecipeSearchResult,
  SearchFilters,
} from '@/@types/recipe';
import supabase from '@/supabase-client';
import { FILTER_VALUES } from '@/utils/constants';

class RecipeServiceError extends Error {
  public originalError?: any;

  constructor(message: string, originalError?: any) {
    super(message);
    this.name = 'RecipeServiceError';
    this.originalError = originalError;
  }
}

export const fetchAllRecipes = async (
  page: number = 1,
  limit: number = 10
): Promise<RecipeSearchResult> => {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from('recipes')
      .select(
        'id, name, description, image_url, cooking_time, country, rating',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) throw new RecipeServiceError('Failed to fetch recipes', error);

    return {
      data: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    if (error instanceof RecipeServiceError) throw error;
    throw new RecipeServiceError(
      'Unexpected error while fetching recipes',
      error
    );
  }
};

export const searchRecipes = async ({
  searchTerm = '',
  selectedCountry = 'Tất cả',
  difficulty_level = 'all',
  rating = 'all',
  cooking_time = 'all',
  sort = 'newest',
  page = 1,
  limit = 10,
}: SearchFilters): Promise<RecipeSearchResult> => {
  try {
    let countQuery = supabase
      .from('recipes')
      .select('id', { count: 'exact', head: true });

    if (selectedCountry && selectedCountry !== 'Tất cả') {
      countQuery = countQuery.eq('country', selectedCountry);
    }

    if (searchTerm && searchTerm.trim() !== '') {
      countQuery = countQuery.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    if (difficulty_level !== 'all') {
      countQuery = countQuery.eq('difficulty_level', difficulty_level);
    }

    if (rating !== 'all') {
      const minRating = FILTER_VALUES.rating[rating];
      if (rating === 'five') {
        countQuery = countQuery.eq('rating', minRating);
      } else {
        countQuery = countQuery.gte('rating', minRating);
      }
    }

    if (cooking_time !== 'all') {
      const maxTime = FILTER_VALUES.cooking_time[cooking_time];
      countQuery = countQuery.lte('cooking_time', maxTime);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      throw new RecipeServiceError('Failed to get total count', countError);
    }

    if (!count || count === 0) {
      return {
        data: [],
        totalCount: 0,
        totalPages: 0,
      };
    }

    const totalPages = Math.ceil(count / limit);
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const end = Math.min(start + limit - 1, count - 1);

    let query = supabase
      .from('recipes')
      .select(
        'id, name, description, image_url, cooking_time, country, rating, difficulty_level, created_at'
      );

    if (selectedCountry && selectedCountry !== 'Tất cả') {
      query = query.eq('country', selectedCountry);
    }

    if (searchTerm && searchTerm.trim() !== '') {
      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    if (difficulty_level !== 'all') {
      query = query.eq('difficulty_level', difficulty_level);
    }

    if (rating !== 'all') {
      const minRating = FILTER_VALUES.rating[rating];
      if (rating === 'five') {
        query = query.eq('rating', minRating);
      } else {
        query = query.gte('rating', minRating);
      }
    }

    if (cooking_time !== 'all') {
      const maxTime = FILTER_VALUES.cooking_time[cooking_time];
      query = query.lte('cooking_time', maxTime);
    }

    if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    }

    query = query.range(start, end);

    const { data, error } = await query;

    if (error) throw new RecipeServiceError('Failed to search recipes', error);

    return {
      data: data || [],
      totalCount: count,
      totalPages,
    };
  } catch (error) {
    if (error instanceof RecipeServiceError) throw error;
    throw new RecipeServiceError(
      'Unexpected error while searching recipes',
      error
    );
  }
};

export const getRandomCountries = async (
  limit: number = 4
): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('country')
      .limit(20);

    if (error) throw new RecipeServiceError('Failed to fetch countries', error);

    const uniqueCountries = Array.from(
      new Set(data?.map((item) => item.country) || [])
    );
    const shuffled = uniqueCountries.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, limit);
  } catch (error) {
    if (error instanceof RecipeServiceError) throw error;
    throw new RecipeServiceError(
      'Unexpected error while fetching countries',
      error
    );
  }
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  try {
    if (!recipeId) {
      throw new RecipeServiceError('Recipe ID is required');
    }

    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', recipeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new RecipeServiceError('Recipe not found');
      }
      throw new RecipeServiceError('Failed to fetch recipe details', error);
    }

    return data;
  } catch (error) {
    if (error instanceof RecipeServiceError) throw error;
    throw new RecipeServiceError(
      'Unexpected error while fetching recipe details',
      error
    );
  }
};
