import axios from 'axios';

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2QyMzQ2Yjg0NTc4OGE5ZmE0MWQ5Mzc4YjdiMDY0YiIsIm5iZiI6MTcyMDk0MTMwOS4xMDg0OCwic3ViIjoiNjY5MDRhOTYwZjdhYWFkYmZmMmNjNTY4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.8Ee9HvDE7xWPVsj7kFGaSDDpXhR1_601N5Naz8cgHlM';

const BASE_URL = 'https://api.themoviedb.org/3';

// Створення екземпляра axios з токеном доступу
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

// Функція для отримання популярних фільмів
async function fetchTrendingMovies() {
  const response = await apiClient.get('/trending/movie/day');
  return response.data.results;
}

// Функція для пошуку фільмів
async function searchMovies(query) {
  const response = await apiClient.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
}

// Функція для отримання деталей фільму
async function fetchMovieDetails(movieId) {
  const response = await apiClient.get(`/movie/${movieId}`);
  return response.data;
}

// Функція для отримання акторів фільму
async function fetchMovieCredits(movieId) {
  const response = await apiClient.get(`/movie/${movieId}/credits`);
  return response.data.cast;
}

// Функція для отримання відгуків про фільм
async function fetchMovieReviews(movieId) {
  const response = await apiClient.get(`/movie/${movieId}/reviews`);
  return response.data.results;
}

// Експорт функцій для використання в інших частинах  додатку
export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};