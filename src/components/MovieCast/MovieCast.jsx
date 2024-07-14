import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api/tmdbApi';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        // console.log('Fetched cast data:', data); 
        setCast(data.slice(0, 5)); // Обмеження показу  кількості акторів до 5
      } catch (error) {
        console.error('Failed to fetch movie credits:', error);
        setError('Failed to load cast data');
      }
    };
    getMovieCredits();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>The main cast</h3>
    <ul className={css.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className={css.castImage}
          />
          <p className={css.actorName}>{actor.name}</p>
          <p className={css.actorCharacter}>Character: {actor.character}</p>
        </li>
      ))}
      </ul>
    </div>  
  );
};

export default MovieCast;