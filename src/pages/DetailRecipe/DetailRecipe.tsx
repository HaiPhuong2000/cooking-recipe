import { useParams, Navigate } from 'react-router-dom';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeImg } from './components/RecipeImg';
import { useRecipeDetail } from '@/hook/useRecipeDetail';
import { SkeletonDetail } from '@/components/SkeletonDetail';

export const DetailRecipe = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const { recipe, loading, error } = useRecipeDetail(id);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SkeletonDetail />
      </div>
    );
  }

  if (error || !recipe) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <RecipeImg recipe={recipe} />
      <RecipeDetail recipe={recipe} />
    </div>
  );
};
