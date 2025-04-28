// CategoryDataProvider: Componente que proporciona el contexto de las categorías de películas a los componentes hijos.
// Realiza una solicitud a la API para obtener las categorías de películas disponibles y las pone a disposición de la aplicación.
// Maneja el estado de carga (isLoadingCategories), los errores (categoryError), y las categorías obtenidas (movieCategories).

import { useState, useEffect, ReactNode } from 'react';
import { CategoryDataContext } from './categoryDataContext';

export interface Category {
  id: number;
  name: string;
}

export const CategoryDataProvider = ({ children }: { children: ReactNode }) => {
  const [categoryError, setCategoryError] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [movieCategories, setMovieCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchMovieCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`
        );

        if (!response.ok)
          throw Error(
            `Algo salio mal al obtener las categorias! Estatus; ${response.status}`
          );

        const categoriesDataObj = await response.json();

        console.log(categoriesDataObj.genres);
        setMovieCategories(categoriesDataObj.genres);
      } catch (error: any) {
        setCategoryError(true);
        console.log(error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchMovieCategories();
  }, []);

  return (
    <CategoryDataContext.Provider
      value={{ movieCategories, isLoadingCategories, categoryError }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
