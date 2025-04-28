// MoviesDataContext: Crea el contexto para compartir los datos de películas en toda la aplicación.
// El contexto se crea con un valor inicial de 'undefined', lo que implica que debe ser utilizado dentro de un proveedor de contexto (MoviesDataProvider).
import { createContext } from 'react';
import { Movie } from './movieDataProvider';

export interface MoviesDataContextType {
  movieData: Movie[];
  isLoading: boolean;
  movieError: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const MoviesDataContext = createContext<
  MoviesDataContextType | undefined
>(undefined);
