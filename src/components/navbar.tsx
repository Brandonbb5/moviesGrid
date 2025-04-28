//Componente Navbar
// Su función principal es ofrecer accesos rápidos a la página de inicio ('/') y a la página de categorías ('/categorias').
// Además, implementa un modal de búsqueda para que los usuarios puedan buscar películas por título.

import { Link } from 'react-router-dom';
import { TbCategoryPlus, TbSearch } from 'react-icons/tb';
import { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import { MoviesDataContext } from '../context/movieDataContext';
import NotFoundPage from './notFoundPage';

const Navbar = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const context = useContext(MoviesDataContext);

  if (!context) {
    console.log("No fue posible acceder al contexto 'MoviesDataContext'");
    return <NotFoundPage />;
  }

  const { movieData, searchQuery, setSearchQuery } = context;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        console.log('Click fuera del modal');
        setShowSearchModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSearchModal = () => {
    setShowSearchModal((prev) => !prev);
    setSearchQuery('');
  };

  const movieFilteredByQuery = () => {
    return movieData.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
      {showSearchModal && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>
      )}
      <nav
        className={`fixed top-0 z-50 w-full bg-black rounded-b-2xl px-10 py-4 shadow-md transition-colors duration-300`}
      >
        <div className="relative mx-auto flex max-w-7xl flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold hover:underline">
                <img src="/logo.png" width={100} height={100} alt="Logo" />
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <button
                onClick={toggleSearchModal}
                className="rounded-3xl p-2 transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-black"
              >
                <TbSearch size={25} />
              </button>

              <div className="rounded-3xl p-2 transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-black">
                <Link to="/categorias">
                  <TbCategoryPlus size={25} />
                </Link>
              </div>
            </div>
          </div>

          {showSearchModal && (
            <div
              ref={modalRef}
              className="absolute top-[140%] left-1/2 w-full -translate-x-1/2 rounded-lg bg-[#141920] px-6 py-4 shadow-md sm:w-10/12 md:w-9/12 lg:w-1/2 xl:w-[800px]"
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full rounded-lg border border-gray-300 bg-[#141920] p-3 text-white outline-none placeholder:text-gray-400 focus:border-2 focus:border-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {searchQuery.trim() !== '' && (
                <div className="mt-4 rounded-lg bg-[#141920] p-6 text-center text-white">
                  {movieFilteredByQuery().length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {movieFilteredByQuery().map((movie) => (
                        <Link
                          to={`/pelicula/${movie.id}`}
                          onClick={() => setShowSearchModal(false)}
                        >
                          <li
                            key={movie.title}
                            className="border-b border-gray-700 pb-2 hover:cursor-pointer"
                          >
                            {movie.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">
                      ¡No se encontraron resultados!
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
