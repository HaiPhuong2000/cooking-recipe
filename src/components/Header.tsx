import logo from '@/assets/img/Logo.svg';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" className="h-28 " />
            </Link>
          </div>
          <div className="grow-3">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
};
