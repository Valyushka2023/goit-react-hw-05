import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, onMovieClick }) => {
  return (
  
    <ul className={css.movieList}>
      {movies.map(movie => (
      <li className={css.linkMovieList} key={movie.id} onClick={() => onMovieClick(movie.id)}>
          <Link to={`/movies/${movie.id}`}>
            <img className={ css.imgMovieList} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
      </ul>
   
  );
};

export default MovieList;