import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MoviesDataProvider } from './context/movieDataProvider.tsx';
import { CategoryDataProvider } from './context/categoryDataProvider.tsx';
import RootLayout from './layout.tsx';

//Para utilizar lazy, es necesario que el componente se exporte por default
const App = lazy(() => import('./App.tsx'));
const NotFoundPage = lazy(() => import('./components/notFoundPage.tsx'));
const MovieDetailsPage = lazy(
  () => import('./components/movieDetailsPage.tsx')
);
const CategoriesListPage = lazy(
  () => import('./components/categoriesListPage.tsx')  
);
const CategoryPage = lazy(() => import('./components/categoryPage.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <App />
          </Suspense>
        ),
      },
      {
        path: '/pelicula/:movieId',
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <MovieDetailsPage />
          </Suspense>
        ),
      },
      {
        path: '/categorias',
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <CategoriesListPage />
          </Suspense>
        ),
      },
      {
        path: '/categorias/:categoryId',
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoviesDataProvider>
      <CategoryDataProvider>
        <RouterProvider router={router} />
      </CategoryDataProvider>
    </MoviesDataProvider>
  </StrictMode>
);
