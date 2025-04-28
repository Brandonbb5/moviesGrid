// 'MovieDetailsPage' es el componente que muestra los detalles completos de una película seleccionada por el usuario.
// Este componente se encarga de obtener los detalles de la película usando la API de The Movie Database (TMDb), mostrar la información relevante 

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFoundPage from './notFoundPage';
import { TbStarFilled } from "react-icons/tb";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  genres: Genre[];
  tagline: string;
}

const MovieDetailsPage = () => {
  

  const { movieId } = useParams();

  if(!movieId) return <NotFoundPage />

  //Al recibir movieId como string se convierte a number y se valida
  if(isNaN(+movieId)){
    return <NotFoundPage />
  }
  
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchDetail = async () => {
      try{
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`
      );
      if(!response.ok) throw new Error(`Algo salio mal durante la obtencion de los detalles de la pelicula!! Estatus: ${response.status}`)
        const dataObjectDetails = await response.json();
      console.log(dataObjectDetails);
      setMovie(dataObjectDetails);
    }catch(error:any){
      console.log(error)
    }finally{
      setIsLoading(false);
    }
    }

    fetchDetail();
  }, [movieId]);
  
  //Se valida el caso  en que los datos no esten definidos
  if (isLoading)
    return <div className="p-10 text-white">Cargando detalles...</div>;

  if (!movie)
    return <div className="p-10 text-white">Película no encontrada</div>;

  if (!movie.genres) return <NotFoundPage />;
  
  return (
    <div className="min-h-screen items-center text-white lg:flex">
      <div className="mx-auto flex w-full flex-col items-center gap-10 md:w-[92%] md:flex-row">
        
        {/* Imagen */}
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="inset-0 block h-[400px] w-full rounded-b-lg bg-black bg-linear-to-t object-cover md:hidden"
          />
        )}

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="hidden h-[480px] w-full rounded-lg md:block md:w-1/3"
        />

        {/* Detalles */}
        <div className="mb-10S mx-auto w-[92%] flex-1">
          <h1 className="mb-2 text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="mb-4 text-indigo-400 italic">{movie.tagline}</p>
          )}
          {/* Géneros */}
          <div className="mb-4 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-gray-700 px-3 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Calificaciones */}
          <div className="mb-4 flex items-center gap-4">
            <span className="flex text-yellow-400 gap-2">
            <TbStarFilled size={20}/>{movie.vote_average.toFixed(1)}/10
            </span>
            <p className="text-gray-400">
              Año de lanzamiento: {new Date(movie.release_date).getFullYear()}
            </p>
            <span className="text-gray-400">Duracion: {movie.runtime} min</span>
          </div>

          {/* Sinopsis */}
          <p className="mb-6 text-gray-300">{movie.overview}</p>

          {/* Botones */}
          <div className="flex gap-4">
            <button className="rounded-full bg-blue-500 px-5 py-2 hover:cursor-pointer hover:bg-blue-600">
              Ver Trailer
            </button>
            <button className="rounded-full bg-gray-700 px-5 py-2 hover:cursor-pointer hover:bg-gray-600">
              Añadir a Favoritos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
