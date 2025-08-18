import type { Recipe } from '@/@types/recipe';
import { getRecipeById } from '@/service/recipeService';
import { useState, useEffect } from 'react';

interface UseRecipeDetailReturn {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRecipeDetail = (recipeId: string): UseRecipeDetailReturn => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipe = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const recipeData = await getRecipeById(recipeId);
      setRecipe(recipeData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load recipe';
      setError(errorMessage);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  return {
    recipe,
    loading,
    error,
    refetch: loadRecipe,
  };
};
