
// MoviesDataProvider: Componente que proporciona el contexto de los datos de películas a los componentes hijos.
// Realiza una solicitud a la API para obtener las películas más populares y las pone a disposición de la aplicación.
// Maneja el estado de carga (isLoading), los errores (movieError), y las películas obtenidas (movieData).
// También gestiona una búsqueda de películas mediante el estado searchQuery y permite actualizarlo con setSearchQuery.

import { useEffect, useState, ReactNode } from 'react';
import { MoviesDataContext } from './movieDataContext';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  tagline: string;
  genre_ids: number[];
}

export const MoviesDataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieError, setMovieError] = useState(false);
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovieData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES&sort_by=revenue.desc&page=1`
      );
      if (!response.ok)
        throw new Error(
          `Algo salio mal durante el fetch de datos!!! Estatus: ${response.status}`
        );
      const movieDataObject = await response.json();
      console.log(movieDataObject.results);
      setMovieData(movieDataObject.results);
    } catch (err: any) {
      console.log(err);
      setMovieError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <MoviesDataContext.Provider
      value={{ movieData, isLoading, movieError, searchQuery, setSearchQuery }}
    >
      {children}
    </MoviesDataContext.Provider>
  );
};
