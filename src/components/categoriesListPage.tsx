// 'CategoriesListPage' es el componente que muestra una lista de todas las categorías de películas disponibles.
// Este componente accede al contexto 'CategoryDataContext' para obtener la información de las categorías.

import { useContext } from 'react';
import { CategoryDataContext } from '../context/categoryDataContext';
import NotFoundPage from './notFoundPage';
import { Link } from 'react-router-dom';

const CategoriesListPage = () => {
  const context = useContext(CategoryDataContext);

  if (!context) {
    console.log("No se pudo acceder al contexto 'CategoryDataContext'");
    return <NotFoundPage />;
  }

  const { movieCategories } = context;

  const colors = [
    'from-indigo-900 to-indigo-950',
    'from-purple-900 to-purple-950',
    'from-rose-900 to-rose-950',
    'from-blue-900 to-blue-950',
    'from-emerald-900 to-emerald-950',
    'from-cyan-900 to-cyan-950',
  ];

  return (
    <div className="mx-auto mt-22 flex min-h-screen w-[90%] items-center justify-center lg:mt-2 lg:min-h-[120vh]">
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movieCategories.map((category, index) => (
          <Link key={category.id} to={`/categorias/${category.id}`}>
            <div
              key={category.id}
              className={`bg-gradient-to-r ${colors[index % colors.length]} transform rounded-lg p-9 shadow-xl transition-all hover:scale-105 hover:cursor-pointer`}
            >
              <h1 className="text-center text-xl font-bold text-white">
                {category.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesListPage;
