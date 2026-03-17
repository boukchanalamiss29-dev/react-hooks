import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="movie-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* POSTER */}
      <div className="movie-card">
        <img
          src={movie.posterURL || "https://via.placeholder.com/300x450/1a1a2e/e94560?text=No+Image"}
          alt={movie.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450/1a1a2e/e94560?text=No+Image";
          }}
        />

        {/* OVERLAY يبان عند hover */}
        <div className={`card-overlay ${hovered ? "visible" : ""}`}>
          <span className="genre-tag">{movie.genre}</span>
          <h5 className="overlay-title">{movie.title}</h5>
          <p className="overlay-year">{movie.year}</p>
          <ReactStars
            count={5}
            value={movie.rating}
            edit={false}
            size={20}
            color2="#e94560"
          />
          <p className="overlay-desc">{movie.description}</p>
        </div>
      </div>

      {/* TITRE تحت الكارد */}
      <p className="card-title-below">{movie.title}</p>
    </div>
  );
}

export default MovieCard;