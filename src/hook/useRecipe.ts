import { RecipeContext } from '@/context/recipeContext';
import { useContext } from 'react';
export const useRecipes = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('useRecipes must be used within RecipeProvider');
  }

  return context;
};
