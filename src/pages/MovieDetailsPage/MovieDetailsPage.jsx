import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation, Link, Route, Routes } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbApi';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const backLocation = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className={css.movieDetailsPage}>
      <button
        className={css.backButton}
        onClick={() =>
          navigate(backLocation)}>Go back</button>
      
      {movie && (
      <>
      <div className={css.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.moviePoster}
        />
      <div>
              <h2>{movie.title} ({releaseYear})</h2>
        <p className={css.rating}><span className={css.label}>User Score:</span> {Math.round(movie.vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p className={css.overview}>{movie.overview}</p>
        <h4>Genres</h4>
              <p className={css.genres}>{movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
  
      <div className={css.additionalInfo}>
        <h5>Additional information</h5>
        <ul>
          <li>
            <Link to="cast" className={css.link}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" className={css.link}>Reviews</Link>
          </li>
        </ul>
      </div>
      </>
      )}
      
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
      
  );
};

export default MovieDetailsPage;