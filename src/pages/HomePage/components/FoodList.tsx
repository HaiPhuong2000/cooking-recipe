import { useRecipes } from '@/hook/useRecipe';
import { FoodItem } from './FoodItem';
import { Skeleton } from '@/components/Skeleton';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const FoodList = () => {
  const { recipes, loading, totalCount, currentPage, goToPage } = useRecipes();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.1,
    triggerOnce: false,
    // Chỉ bắt đầu quan sát sau khi component đã render
    initialInView: false,
    // Đảm bảo phần tử phải hiển thị ít nhất 100px trước khi kích hoạt
    rootMargin: '100px',
  });
  // if (recipes.length === 0) {
  //   return (
  //     <EmptyState
  //       message={
  //         searchTerm
  //           ? `Không tìm thấy món ăn nào với từ khóa "${searchTerm}"`
  //           : "Chưa có món ăn nào"
  //       }
  //     />
  //   );
  // }
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (inView && !loading && recipes.length < totalCount) {
      console.log(
        'Loading more data, current page:',
        currentPage,
        'total recipes:',
        recipes.length,
        'total count:',
        totalCount
      );
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
      <div className='className="max-w-7xl mx-auto px-6 py-12"'>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <FoodItem key={recipe.id} recipe={recipe} />
        ))}
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
