import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { DetailRecipe } from './pages/DetailRecipe/DetailRecipe';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/detail-recipe/:id',
        element: <DetailRecipe />,
      },
    ],
  },
]);
