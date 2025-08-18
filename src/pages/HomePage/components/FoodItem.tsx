import { Link } from 'react-router-dom';
import { Tag } from '@/components/Tag';
import { Rate } from '@/components/Rate';
import type { Recipe } from '@/@types/recipe';
import { BlurImage } from '@/components/BlurImage';

interface FoodItemProps {
  recipe: Recipe;
}

export const FoodItem = ({ recipe }: FoodItemProps) => {
  return (
    <div>
      <div className="max-w-sm h-full bg-white border-gray-200 !rounded-2xl shadow-lg border-0 overflow-hidden cursor-pointer ">
        <Link to={`/detail-recipe/${recipe.id}`}>
          <div className="relative">
            <BlurImage
              className="rounded-t-lg h-70 w-full"
              src={recipe.image_url ?? ''}
              alt={recipe.name ?? ''}
            />
            <div className="absolute top-3 right-3">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="#FFD700"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">
                  {recipe.rating}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <Tag tag={recipe.country} />
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-gray-700">{recipe.cooking_time} phút</span>
            </div>
          </div>
          <Link to={`/detail-recipe/${recipe.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {recipe.name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 ">
            {recipe.description}
          </p>
          <div className="flex justify-between">
            <Rate rating={recipe.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};
