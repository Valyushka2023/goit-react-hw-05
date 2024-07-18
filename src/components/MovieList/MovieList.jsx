import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (

    <ul className={css.movieList}>
      {movies.map(movie => (
      <li className={css.linkMovieList} key={movie.id} >
          <Link to={`/movies/${movie.id}`} state = {{from: location}}>
            <img className={ css.imgMovieList} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
      </ul>
   
  );
};

export default MovieList;