import { useParams } from 'react-router-dom';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeImg } from './components/RecipeImg';
import { useRecipeDetail } from '@/hook/useRecipeDetail';
import { Skeleton } from '@/components/Skeleton';

export const DetailRecipe = () => {
  const { id } = useParams();
  const { recipe, loading } = useRecipeDetail(id);
  console.log(recipe);
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <RecipeImg recipe={recipe} />
      <RecipeDetail recipe={recipe} />
    </div>
  );
};
