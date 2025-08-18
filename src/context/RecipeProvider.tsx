import type { Recipe } from '@/@types/recipe';
import {
  getRandomCountries,
  getRecipeById,
  searchRecipes,
} from '@/service/recipeService';
import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { RecipeContext, type RecipeContextType } from './recipeContext';
import type {
  SORT_OPTIONS,
  DIFFICULTY_LEVELS,
  RATING_FILTERS,
  COOKING_TIME_FILTERS,
} from '@/utils/constants';

const createEventEmitter = () => {
  const listeners = new Set<() => void>();
  return {
    emit: () => listeners.forEach((listener) => listener()),
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

const resetEvent = createEventEmitter();

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('Tất cả');
  const [availableCountries, setAvailableCountries] = useState<string[]>([
    'Tất cả',
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<keyof typeof SORT_OPTIONS>('newest');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    performSearch();
  }, [currentPage, sortBy]);

  const loadCountries = async (): Promise<void> => {
    try {
      const countries = await getRandomCountries(4);
      setAvailableCountries(['Tất cả', ...countries]);
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  };

  const performSearch = useCallback(
    async (options?: {
      country?: string;
      searchTerm?: string;
      difficulty_level?: keyof typeof DIFFICULTY_LEVELS;
      rating?: keyof typeof RATING_FILTERS;
      cooking_time?: keyof typeof COOKING_TIME_FILTERS;
      sort?: keyof typeof SORT_OPTIONS;
    }): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const countryToUse =
          options?.country !== undefined ? options.country : selectedCountry;
        const result = await searchRecipes({
          searchTerm:
            options?.searchTerm !== undefined
              ? options.searchTerm.trim()
              : searchTerm,
          selectedCountry: countryToUse,
          difficulty_level: options?.difficulty_level || 'all',
          rating: options?.rating || 'all',
          cooking_time: options?.cooking_time || 'all',
          sort: options?.sort || sortBy,
          page: currentPage,
          limit: 10,
        });

        setRecipes((prevRecipes) => {
          if (currentPage === 1 || options) {
            return result.data;
          }
          return [...prevRecipes, ...result.data];
        });

        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        if (currentPage === 1) {
          setRecipes([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage, sortBy, searchTerm, selectedCountry]
  );

  const loadRecipeDetail = async (recipeId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const recipe = await getRecipeById(recipeId);
      setSelectedRecipe(recipe);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load recipe details';
      setError(errorMessage);
      setSelectedRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchTerm = (term: string): void => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const updateSelectedCountry = (country: string): void => {
    setSelectedCountry(country);
    setCurrentPage(1);
    setRecipes([]);
    performSearch({
      country,
      searchTerm: searchTerm,
      difficulty_level: 'all',
      rating: 'all',
      cooking_time: 'all',
      sort: sortBy,
    });
  };

  const updateSortBy = (sort: keyof typeof SORT_OPTIONS): void => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const resetSearch = useCallback((): void => {
    setSearchTerm('');
    setSelectedCountry('Tất cả');
    setSortBy('newest');
    setCurrentPage(1);
    setRecipes([]);

    resetEvent.emit();

    performSearch({
      searchTerm: '',
      country: 'Tất cả',
      difficulty_level: 'all',
      rating: 'all',
      cooking_time: 'all',
      sort: 'newest',
    });
  }, []);

  const value: RecipeContextType = {
    recipes,
    loading,
    error,
    searchTerm,
    selectedCountry,
    availableCountries,
    currentPage,
    totalPages,
    totalCount,
    sortBy,
    selectedRecipe,

    updateSearchTerm,
    updateSelectedCountry,
    updateSortBy,
    goToPage,
    loadRecipeDetail,
    clearError,
    performSearch,
    resetSearch,
    resetEvent,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
