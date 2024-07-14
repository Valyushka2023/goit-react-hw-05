import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getTrendingMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;


