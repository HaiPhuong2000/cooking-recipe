import type { Recipe, SortOption } from '@/@types/recipe';
import {
  getRandomCountries,
  getRecipeById,
  searchRecipes,
} from '@/service/recipeService';
import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { RecipeContext, type RecipeContextType } from './recipeContext';

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  // States
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
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Load countries khi khởi động
  useEffect(() => {
    loadCountries();
  }, []);

  // Bỏ auto search khi có thay đổi
  // useEffect(() => {
  //   performSearch();
  // }, [searchTerm, selectedCountry, currentPage, sortBy]);

  // Chỉ auto search khi thay đổi trang hoặc sắp xếp
  useEffect(() => {
    performSearch();
  }, [currentPage, sortBy]);

  // Load countries
  const loadCountries = async (): Promise<void> => {
    try {
      const countries = await getRandomCountries(4);
      setAvailableCountries(['Tất cả', ...countries]);
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  };

  // Perform search
  const performSearch = useCallback(
    async (options?: {
      country?: string;
      searchTerm?: string;
    }): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchRecipes({
          searchTerm:
            options?.searchTerm !== undefined ? options.searchTerm : searchTerm,
          selectedCountry:
            options?.country !== undefined ? options.country : selectedCountry,
          page: currentPage,
          limit: 10,
          sortBy,
        });

        // Trong hàm performSearch, thêm log để debug
        console.log('API response:', {
          data: result.data.length,
          totalCount: result.totalCount,
          totalPages: result.totalPages,
          currentPage,
        });

        // Đảm bảo rằng tất cả các trạng thái được cập nhật đúng
        setRecipes((prevRecipes) => {
          const newRecipes =
            currentPage === 1 ? result.data : [...prevRecipes, ...result.data];
          console.log('Updated recipes:', newRecipes.length);
          return newRecipes;
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

  // Load recipe detail
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

  // Actions (chỉ update state)
  const updateSearchTerm = (term: string): void => {
    setSearchTerm(term);
    // Không tự động reset trang khi thay đổi searchTerm
    setCurrentPage(1);
  };

  const updateSelectedCountry = (country: string): void => {
    setSelectedCountry(country);
    setCurrentPage(1);
    // Gọi performSearch với country mới
    performSearch({ country });
  };

  const updateSortBy = (sort: SortOption): void => {
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

  const resetSearch = (): void => {
    setSearchTerm('');
    setSelectedCountry('Tất cả');
    setSortBy('newest');
    setCurrentPage(1);
    performSearch();
  };

  // Context value
  const value: RecipeContextType = {
    // States
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

    // Actions
    updateSearchTerm,
    updateSelectedCountry,
    updateSortBy,
    goToPage,
    loadRecipeDetail,
    clearError,
    performSearch,
    resetSearch,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
