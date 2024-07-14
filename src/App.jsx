import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';
import css from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userToken');
    setIsLoggedIn(!!isAuthenticated);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className={css.app}>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;


