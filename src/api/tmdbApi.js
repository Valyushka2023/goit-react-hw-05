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

// Загальна функція для обробки запитів з обробкою помилок
const fetchData = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error);
    throw error;
  }
};

// Функція для отримання популярних фільмів
const fetchTrendingMovies = async () => {
  const data = await fetchData('/trending/movie/day');
  return data.results;
};

// Функція для пошуку фільмів
const searchMovies = async (query) => {
  const params = {
    query,
    include_adult: false,
    language: 'en-US',
    page: 1,
  };
  const data = await fetchData('/search/movie', params);
  return data.results;
};

// Функція для отримання деталей фільму
const fetchMovieDetails = async (movieId) => {
  return await fetchData(`/movie/${movieId}`);
};

// Функція для отримання акторів фільму
const fetchMovieCredits = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/credits`);
  return data.cast;
};

// Функція для отримання відгуків про фільм
const fetchMovieReviews = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/reviews`);
  return data.results;
};

// Експорт функцій для використання в інших частинах додатку
export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};