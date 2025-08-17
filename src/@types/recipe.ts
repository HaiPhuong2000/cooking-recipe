export interface Recipe {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  cooking_time: number;
  country: string;
  rating: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  ingredients?: string[];
  instructions?: string[];
  servings?: number;
  created_at?: string;
  updated_at?: string;
}

export interface RecipeSearchResult {
  data: Recipe[];
  totalCount: number;
  totalPages: number;
}

export interface SearchFilters {
  searchTerm?: string;
  selectedCountry?: string;
  page?: number;
  limit?: number;
  sortBy?: SortOption;
}

export type SortOption = 'newest' | 'highest_rated' | 'easiest' | 'fastest';
