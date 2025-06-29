import { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdb-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Movie details not found.");
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const { title, overview, vote_average, release_date, genres, poster_path } =
    movie;

  const posterURL = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <main style={{ padding: "24px" }}>
      <Link to={backLinkRef.current}>← Go back</Link>

      <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
        <img src={posterURL} alt={title} width="300" />

        <div>
          <h1 style={{ marginBottom: "8px" }}>{title}</h1>
          <p>User Score: {vote_average}</p>

          <h2 style={{ marginTop: "16px", marginBottom: "8px" }}>Overview</h2>
          <p>{overview}</p>

          <h2 style={{ marginTop: "16px", marginBottom: "8px" }}>Genres</h2>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>

          <h2 style={{ marginTop: "16px", marginBottom: "8px" }}>
            Release Date
          </h2>
          <p>{release_date || "Bilgi yok"}</p>
        </div>
      </div>

      <h3 style={{ marginTop: "32px", fontWeight: "normal" }}>
        Additional information
      </h3>
      <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
        <li>
          <Link
            to="cast"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Cast
          </Link>
        </li>
        <li>
          <Link
            to="reviews"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Reviews
          </Link>
        </li>
      </ul>

      <hr style={{ marginTop: "24px" }} />

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
