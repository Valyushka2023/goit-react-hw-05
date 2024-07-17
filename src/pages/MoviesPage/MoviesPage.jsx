import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const data = await searchMovies(query);
          setMovies(data);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.search.value.trim();
    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: `/movies?query=${query}` } });
  };

  return (
    <div className={css.moviesPage}>
      <form onSubmit={handleSearch} className={css.form}>
        <input 
          type="text" 
          name="search"
          defaultValue={query} 
          className={css.input} 
          placeholder="Search movies" 
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MoviesPage;