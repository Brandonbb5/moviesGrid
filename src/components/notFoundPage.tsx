// 'NotFoundPage' es el componente que muestra una página de error 404 personalizada para el usuario.
// Este componente también maneja errores de carga de datos, no solo rutas no encontradas.
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoryDataContext } from '../context/categoryDataContext';
import { MoviesDataContext } from '../context/movieDataContext';

const NotFoundPage = () => {
  const catContext = useContext(CategoryDataContext);
  const movContext = useContext(MoviesDataContext);

  if (!catContext || !movContext) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-[#405FF2]">Oops!</h1>
          <h2 className="mt-4 text-5xl font-semibold">
            No pudimos encontrar lo que buscabas
          </h2>
          <h3 className="mt-4 text-lg text-gray-400">
            Se producio un error durante la carga de la pagina
          </h3>
          <Link to={'/'}>
            <button className="mt-8 rounded-lg bg-[#405FF2] px-6 py-3 text-xl text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-600">
              Regresar al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { categoryError } = catContext;
  const { movieError } = movContext;

  return (
    <div className="flex h-screen items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#405FF2]">Oops!</h1>
        <h2 className="mt-4 text-5xl font-semibold">
          No pudimos encontrar lo que buscabas
        </h2>

        {movieError || categoryError ? (
          <h3 className="mt-4 text-lg text-gray-400">
            Se producio un error durante la carga de la pagina
          </h3>
        ) : (
          <h3 className="mt-4 text-lg text-gray-400">
            La página que intentas ver no existe o ha sido eliminado.
          </h3>
        )}
        <Link to={'/'}>
          <button className="mt-8 rounded-lg bg-[#405FF2] px-6 py-3 text-xl text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-600">
            Regresar al inicio
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
