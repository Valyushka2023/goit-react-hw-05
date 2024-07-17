import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTrendingMovies } from '../../api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: '/' } });
  };

  return (
    <div className={css.homePage}>
      <h1>Trending today</h1>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;