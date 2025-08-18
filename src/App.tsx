import { Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { RecipeProvider } from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </RecipeProvider>
  );
}

export default App;
