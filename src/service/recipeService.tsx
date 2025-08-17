import type {
  Recipe,
  RecipeSearchResult,
  SearchFilters,
  SortOption,
} from '@/@types/recipe';
import supabase from '@/supabase-client';

class RecipeServiceError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'RecipeServiceError';
  }
}

// Lấy tất cả món ăn với phân trang
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

// Tìm kiếm recipes với filter
export const searchRecipes = async ({
  searchTerm = '',
  selectedCountry = 'Tất cả',
  page = 1,
  limit = 10,
  sortBy = 'newest',
}: SearchFilters): Promise<RecipeSearchResult> => {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = supabase
      .from('recipes')
      .select(
        'id, name, description, image_url, cooking_time, country, rating, difficulty_level',
        { count: 'exact' }
      );

    // Filter theo nước
    if (selectedCountry && selectedCountry !== 'Tất cả') {
      query = query.eq('country', selectedCountry);
    }

    // Filter theo tên
    if (searchTerm && searchTerm.trim() !== '') {
      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    // Sort
    query = applySorting(query, sortBy);
    query = query.range(start, end);

    const { data, error, count } = await query;

    if (error) throw new RecipeServiceError('Failed to search recipes', error);

    return {
      data: data || [],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    };
  } catch (error) {
    if (error instanceof RecipeServiceError) throw error;
    throw new RecipeServiceError(
      'Unexpected error while searching recipes',
      error
    );
  }
};

// Helper function để apply sorting
const applySorting = (query: any, sortBy: SortOption) => {
  switch (sortBy) {
    case 'newest':
      return query.order('created_at', { ascending: false });
    case 'highest_rated':
      return query.order('rating', { ascending: false });
    case 'easiest':
      return query.order('difficulty_level', { ascending: true });
    case 'fastest':
      return query.order('cooking_time', { ascending: true });
    default:
      return query.order('created_at', { ascending: false });
  }
};

// Lấy các nước ngẫu nhiên
export const getRandomCountries = async (
  limit: number = 4
): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('country')
      .limit(20); // Get more data to shuffle

    if (error) throw new RecipeServiceError('Failed to fetch countries', error);

    // Remove duplicates and shuffle
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

// Lấy chi tiết recipe
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
