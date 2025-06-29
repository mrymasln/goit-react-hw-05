import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Movie movie data could not be retrieved.");
      } finally {
        setLoading(false);
      }
    };

    getTrending();
  }, []);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Trending Today</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
