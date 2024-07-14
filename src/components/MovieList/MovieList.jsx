import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  // console.log('Movies to display:', movies); 

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link to={{
            pathname: `/movies/${movie.id}`,
            state: { from: location }
          }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;