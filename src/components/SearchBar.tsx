import { useRecipes } from '@/hook/useRecipe';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const SearchBar = () => {
  const {
    updateSearchTerm,
    availableCountries,
    selectedCountry,
    updateSelectedCountry,
    performSearch,
    searchTerm,
  } = useRecipes();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchRecipe, setSearchRecipe] = useState(searchTerm);

  useEffect(() => {
    setSearchRecipe(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchTerm(searchRecipe);
    performSearch({ searchTerm: searchRecipe });

    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleCountrySelect = (country: string) => {
    updateSelectedCountry(country);

    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="flex-1">
        <form onSubmit={handleSearch}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              value={searchRecipe}
              onChange={(e) => setSearchRecipe(e.target.value)}
              className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search"
            />
            <button
              type="submit"
              className="cursor-pointer absolute top-0 end-0 py-2.5 px-4 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap gap-2">
        {availableCountries.map((country) => (
          <button
            key={country}
            type="button"
            onClick={() => handleCountrySelect(country)}
            className={`${
              selectedCountry === country
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'bg-white text-black hover:text-blue-400'
            } cursor-pointer border border-none rounded-xl text-base font-medium px-3 py-1.5 text-center me-3 `}
          >
            {country}
          </button>
        ))}
      </div>
    </div>
  );
};
