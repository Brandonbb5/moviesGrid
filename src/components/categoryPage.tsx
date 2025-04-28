// 'CategoryPage' es el componente que muestra las películas pertenecientes a una categoría específica seleccionada por el usuario.
// Este componente accede a los contextos 'CategoryDataContext' y 'MoviesDataContext' para obtener los datos

import { useContext } from 'react';
import { CategoryDataContext } from '../context/categoryDataContext';
import { MoviesDataContext } from '../context/movieDataContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotFoundPage from './notFoundPage';

const CategoryPage = () => {
  const catContext = useContext(CategoryDataContext);
  
  if(!catContext){
    console.log("No se pudo acceder al contexto 'CategoryDataContext'");
    return <NotFoundPage />
  }
  const { movieCategories, isLoadingCategories, categoryError } = catContext


  const movContext = useContext(MoviesDataContext);

  if(!movContext){
    console.log("No se pudo acceder al contexto: 'MoviesDataContext'");
    return <NotFoundPage />
  }
  
  const { movieData, isLoading, movieError } = movContext;


  const { categoryId } = useParams();

  if (!categoryId || isNaN((+categoryId))) {
    return <NotFoundPage />;
  }

  if (isLoadingCategories || isLoading) {
    return <div>Cargando...</div>;
  }

  if (categoryError || movieError) {
    return <div>Error al cargar los datos</div>;
  }


  const selectedCategory = movieCategories.find(
    (cat) => cat.id === +categoryId
  );

  if (!selectedCategory || isNaN(+categoryId)) {
    return <div>Categoría no encontrada</div>;
  }

  const moviesInCategory = movieData.filter((movie) =>
    movie.genre_ids.includes(+categoryId)
  );

  return (
    <div className="mt-20 min-h-screen">
      <h1 className="p-4 text-2xl font-bold">
        Películas de {selectedCategory.name}
      </h1>

      {moviesInCategory.length === 0 ? (
        <p className="p-4">No hay películas en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
          {moviesInCategory.map((movie) => (
            <div key={movie.id} className="flex flex-col items-center">
              {movie.poster_path && (
                <Link to={`/pelicula/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    className="h-[280px] w-full rounded-lg opacity-85 transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:opacity-100"
                  />
                </Link>
              )}

              <div className="mt-2 w-fit text-left text-sm">
                <h2 className="font-semibold">{movie.title}</h2>
                {movie.release_date && (
                  <p className="text-xs text-gray-600">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
