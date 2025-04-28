// CategoryDataContext: Crea el contexto para compartir los datos de las categorías de películas en toda la aplicación.
// El contexto se crea con un valor inicial de 'undefined', lo que implica que debe ser utilizado dentro de un proveedor de contexto (CategoryDataProvider).

import { createContext } from 'react';
import { Category } from './categoryDataProvider';

export interface CategoryDataContextType {
  movieCategories: Category[];
  isLoadingCategories: boolean;
  categoryError: boolean;
}

export const CategoryDataContext = createContext<
  CategoryDataContextType | undefined
>(undefined);
