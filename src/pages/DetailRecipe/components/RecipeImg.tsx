import type { Recipe } from '@/@types/recipe';

interface RecipeImgProps {
  recipe: Recipe | null;
}

export const RecipeImg = ({ recipe }: RecipeImgProps) => {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
      <img
        src={recipe?.image_url ?? ''}
        alt={recipe?.name ?? ''}
        className="w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute bottom-6 left-6 text-white">
        <h1 className="text-4xl font-bold mb-2">{recipe?.name}</h1>
        <p className="text-xl opacity-90">{recipe?.description}</p>
      </div>
    </div>
  );
};
