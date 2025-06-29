import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWM0MzQ4ZDk0MDQ2YjdlNzZmMDYxNDVmNjNmMmVkMyIsIm5iZiI6MTc1MTE3ODE5NS42NTY5OTk4LCJzdWIiOiI2ODYwZGJkMzRmNGRhNjg2OTBhNGQzZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0Qm44-EVp-SN5AJGUmAMy67adyd9YVzXmU_dF2bUkYU";

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&include_adult=false`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};
