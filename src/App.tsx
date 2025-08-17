import { Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { RecipeProvider } from './context/RecipeProvider';

function App() {
  return (
    <div>
      <RecipeProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </RecipeProvider>
    </div>
  );
}

export default App;
