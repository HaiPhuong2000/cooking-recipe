import type {
  DIFFICULTY_LEVELS,
  RATING_FILTERS,
  COOKING_TIME_FILTERS,
  SORT_OPTIONS,
} from '@/utils/constants';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image_url: string;
  cooking_time: number;
  country: string;
  rating: number;
  ingredients?: string[];
  instructions?: string[];
  difficulty_level?: keyof typeof DIFFICULTY_LEVELS;
  created_at?: string;
}

export interface RecipeSearchResult {
  data: Recipe[];
  totalCount: number;
  totalPages: number;
}

export interface SearchFilters {
  searchTerm?: string;
  selectedCountry?: string;
  difficulty_level?: keyof typeof DIFFICULTY_LEVELS;
  rating?: keyof typeof RATING_FILTERS;
  cooking_time?: keyof typeof COOKING_TIME_FILTERS;
  sort?: keyof typeof SORT_OPTIONS;
  page?: number;
  limit?: number;
}
