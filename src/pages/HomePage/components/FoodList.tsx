import { useRecipes } from '@/hook/useRecipe';
import { FoodItem } from './FoodItem';
import { Skeleton } from '@/components/Skeleton';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  DIFFICULTY_LEVELS,
  RATING_FILTERS,
  COOKING_TIME_FILTERS,
  SORT_OPTIONS,
} from '@/utils/constants';
import { Select } from '@/components/Select';

type FilterType = {
  difficulty_level: keyof typeof DIFFICULTY_LEVELS;
  rating: keyof typeof RATING_FILTERS;
  cooking_time: keyof typeof COOKING_TIME_FILTERS;
  sort: keyof typeof SORT_OPTIONS;
};

const DEFAULT_FILTERS: FilterType = {
  difficulty_level: 'all',
  rating: 'all',
  cooking_time: 'all',
  sort: 'newest',
};

export const FoodList = () => {
  const {
    recipes,
    loading,
    totalCount,
    currentPage,
    goToPage,
    performSearch,
    searchTerm,
    selectedCountry,
    resetEvent,
  } = useRecipes();

  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    const unsubscribe = resetEvent.subscribe(() => {
      setFilters(DEFAULT_FILTERS);
    });

    return () => unsubscribe();
  }, [resetEvent]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    initialInView: false,
    rootMargin: '100px',
  });

  const handleFilterChange = (filterType: keyof FilterType, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value as FilterType[keyof FilterType],
    };
    setFilters(newFilters);
    goToPage(1);

    performSearch({
      searchTerm,
      country: selectedCountry,
      ...newFilters,
    });
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (inView && !loading && recipes.length < totalCount) {
      setIsLoadingMore(true);
      goToPage(currentPage + 1);
    }
  }, [
    inView,
    loading,
    currentPage,
    recipes.length,
    totalCount,
    goToPage,
    initialLoad,
  ]);

  useEffect(() => {
    if (!loading) {
      setIsLoadingMore(false);
      if (recipes.length > 0) {
        setIsFirstLoad(false);
      }
    }
  }, [loading, recipes.length]);

  if (loading && isFirstLoad) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="py-12">
          <div className="h-9 bg-gray-200 rounded-full  w-48 mb-4"></div>
          <div className="flex gap-4">
            <div className="h-5 w-48 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-5 w-48 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-5 w-48 bg-gray-200 rounded-full  mb-2.5"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Tất cả công thức</h2>
        <span className="text-gray-900">{totalCount} công thức</span>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Select
            id="difficulty_level"
            value={filters.difficulty_level}
            onChange={(e) =>
              handleFilterChange('difficulty_level', e.target.value)
            }
          >
            {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            id="rating"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            {Object.entries(RATING_FILTERS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            id="cooking_time"
            value={filters.cooking_time}
            onChange={(e) => handleFilterChange('cooking_time', e.target.value)}
          >
            {Object.entries(COOKING_TIME_FILTERS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            id="sort"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            {Object.entries(SORT_OPTIONS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length === 0 && !loading ? (
          <div className="text-center py-16 col-span-full">
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Không tìm thấy công thức
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy thử tìm kiếm công thức khác hoặc điều chỉnh lại bộ lọc của bạn
            </p>
          </div>
        ) : (
          recipes.map((recipe) => <FoodItem key={recipe.id} recipe={recipe} />)
        )}
      </div>

      {recipes.length < totalCount && (
        <div ref={ref} className="py-8 flex justify-center">
          {isLoadingMore && (
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
