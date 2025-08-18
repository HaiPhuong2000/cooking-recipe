import type { Recipe } from '@/@types/recipe';
import { createContext } from 'react';
import type {
  DIFFICULTY_LEVELS,
  RATING_FILTERS,
  COOKING_TIME_FILTERS,
  SORT_OPTIONS,
} from '@/utils/constants';

type EventEmitter = {
  emit: () => void;
  subscribe: (listener: () => void) => () => void;
};

interface RecipeContextState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCountry: string;
  availableCountries: string[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  sortBy: keyof typeof SORT_OPTIONS;
  selectedRecipe: Recipe | null;
}

interface RecipeContextActions {
  updateSearchTerm: (term: string) => void;
  updateSelectedCountry: (country: string) => void;
  updateSortBy: (sort: keyof typeof SORT_OPTIONS) => void;
  goToPage: (page: number) => void;
  loadRecipeDetail: (recipeId: string) => Promise<void>;
  clearError: () => void;
  performSearch: (options?: {
    country?: string;
    searchTerm?: string;
    difficulty_level?: keyof typeof DIFFICULTY_LEVELS;
    rating?: keyof typeof RATING_FILTERS;
    cooking_time?: keyof typeof COOKING_TIME_FILTERS;
    sort?: keyof typeof SORT_OPTIONS;
  }) => Promise<void>;
  resetSearch: () => void;
  resetEvent: EventEmitter;
}

export type RecipeContextType = RecipeContextState & RecipeContextActions;

export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined
);
