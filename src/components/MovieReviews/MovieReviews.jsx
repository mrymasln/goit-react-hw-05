import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb-api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("We don't have any reviews for this movie.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No comments found for this movie.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} style={{ marginBottom: "24px" }}>
          <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{author}</p>
          <p style={{ margin: 0 }}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
