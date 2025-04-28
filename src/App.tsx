import { useState, useEffect, useContext } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { MoviesDataContext } from './context/movieDataContext';
import NotFoundPage from './components/notFoundPage';

function App() {
  const context = useContext(MoviesDataContext);
  
  if(!context){
    console.log("No se pudo accede al contexto 'MoviesDataContext'");
    return <NotFoundPage />
  }
  
  const { isLoading, movieData } = context
  
  return (
    <>
      <section className="relative min-h-[80vh] w-full">
        <img
          src="/fondo.jpeg"
          alt="Fondo"
          className="absolute  h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-28 left-6 z-20 max-w-[90%] text-shadow text-white md:left-20 md:max-w-[700px] lg:bottom-10">
          <h1 className="font-me text-[2.8rem] leading-[1.1] tracking-tight uppercase sm:text-3xl md:text-4xl lg:text-5xl">
            Descubre
          </h1>
          <h1 className="text-[2.8rem] leading-[1.1] font-semibold text-shadow tracking-tight uppercase sm:text-3xl md:text-6xl lg:text-5xl">
            Las Mejores Películas
          </h1>
          <h1 className="font-me text-[2.8rem] leading-[1.1] tracking-tight text-shadow uppercase sm:text-3xl md:text-4xl lg:text-5xl">
            Para Todos los Gustos
          </h1>

          <p className="mt-4 max-w-2xs text-sm font-light tracking-wide text-white/80 md:text-base lg:max-w-md">
            Explora los últimos estrenos, clásicos atemporales y lanzamientos
            exclusivos, todo en un solo lugar.
          </p>
        </div>

        <div className="absolute right-6 bottom-10 z-30 md:right-20">
          <Link to={'/pelicula/12445'}>
            <button className="inline-flex items-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-md transition-transform hover:scale-105 hover:cursor-pointer">
              Recomendacion del dia
            </button>
          </Link>
        </div>
      </section>

      <div className="min-h-screen p-10">
        {!isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movieData.map((movie) => (
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

                <div className="mt-2 w-full text-center text-sm">
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
        ) : (
          <div className="text-center text-xl font-semibold">Cargando...</div>
        )}
      </div>
    </>
  );
}

export default App;
