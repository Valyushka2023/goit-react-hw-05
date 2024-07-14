import { useState } from 'react';
import { searchMovies } from '../../api/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = await searchMovies(query);
      // console.log('Fetched movies:', data); 
    setMovies(data);
  };

  return (
    <div className={css.moviesPage}>
      <form onSubmit={handleSearch} className={css.form}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className={css.input} 
          placeholder="Search movies" 
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;