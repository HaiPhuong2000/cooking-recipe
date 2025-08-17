import type { Recipe, SortOption } from '@/@types/recipe';
import { createContext } from 'react';

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
  sortBy: SortOption;
  selectedRecipe: Recipe | null;
}

interface RecipeContextActions {
  updateSearchTerm: (term: string) => void;
  updateSelectedCountry: (country: string) => void;
  updateSortBy: (sort: SortOption) => void;
  goToPage: (page: number) => void;
  loadRecipeDetail: (recipeId: string) => Promise<void>;
  clearError: () => void;
  performSearch: (options?: {
    country?: string;
    searchTerm?: string;
  }) => Promise<void>;
  resetSearch: () => void;
}

export type RecipeContextType = RecipeContextState & RecipeContextActions;

export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined
);
