import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/tmdbApi';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch movie reviews:', error);
        setError('Failed to load reviews data');
      }
    };
    getMovieReviews();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={css.reviews}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={css.reviewItem}>
              <h4 className={css.author}>Author: {author}</h4>
              <p className={css.content}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry! There are no reviews. 🤷🏼‍♂️</p>
      )}
    </div>
  );
};

export default MovieReviews;

