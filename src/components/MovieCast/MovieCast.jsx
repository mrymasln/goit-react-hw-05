import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb-api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch {
        setError("No player information found");
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No player information found.</p>;

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        listStyle: "none",
        padding: 0,
      }}
    >
      {cast.map(({ cast_id, name, character, profile_path }) => (
        <li key={cast_id} style={{ width: "150px", textAlign: "center" }}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : "https://via.placeholder.com/150x225?text=No+Image"
            }
            alt={name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p style={{ fontWeight: "bold", margin: "8px 0 4px" }}>{name}</p>
          <p style={{ margin: 0 }}>{character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
