import { useRecipes } from '@/hook/useRecipe';
import { useNavigate, useLocation } from 'react-router-dom';

interface TagProps {
  tag: string;
}

export const Tag = ({ tag }: TagProps) => {
  const { updateSelectedCountry } = useRecipes();

  const navigate = useNavigate();
  const location = useLocation();

  const handleCountrySelect = (country: string) => {
    updateSelectedCountry(country);

    if (location.pathname !== '/') {
      navigate('/');
    }
  };
  return (
    <span
      onClick={() => handleCountrySelect(tag)}
      className="bg-purple-100 cursor-pointer text-purple-800 text-xs font-medium me-2 px-2.5 py-1 rounded-sm  border border-purple-400"
    >
      {tag}
    </span>
  );
};
