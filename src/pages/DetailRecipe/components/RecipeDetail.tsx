import { Rate } from '@/components/Rate';
import { Tag } from '@/components/Tag';
import type { Recipe } from '@/@types/recipe';
import { DIFFICULTY_LEVELS } from '@/utils/constants';

interface RecipeProps {
  recipe: Recipe | null;
}

export const RecipeDetail = ({ recipe }: RecipeProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-wrap items-center space-x-8 mb-6">
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
          <span className="text-gray-700">{recipe?.cooking_time} phút</span>
        </div>
        <div className="flex items-center space-x-9 justify-center">
          <Rate rating={recipe?.rating ?? 0} />
          <span className="text-gray-700">
            {
              DIFFICULTY_LEVELS[
                recipe?.difficulty_level as keyof typeof DIFFICULTY_LEVELS
              ]
            }
          </span>
          <Tag tag={recipe?.country ?? ''} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nguyên liệu</h2>
          <ul className="space-y-3">
            {recipe?.ingredients?.map((ingredient) => (
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Chế biến</h2>
          <ol className="space-y-4">
            {recipe?.instructions?.map((step, index) => (
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
