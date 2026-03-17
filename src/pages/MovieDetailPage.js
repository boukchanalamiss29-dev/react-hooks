import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

function MovieDetailPage({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return (
      <div className="not-found">
        <h2> Movie not found</h2>
        <button className="btn-back mt-3" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* Blurred background */}
      <div
        className="detail-bg"
        style={{ backgroundImage: `url(${movie.posterURL})` }}
      />

      {/* Navbar */}
      <nav className="cine-nav">
        <div className="logo">CINE<span>VAULT</span></div>
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </nav>

      <div className="container py-5">
        <div className="row g-5 align-items-start">

          {/* Poster */}
          <div className="col-md-3">
            <img
              src={movie.posterURL}
              alt={movie.title}
              className="detail-poster"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450/1a1a2e/e94560?text=No+Image";
              }}
            />
          </div>

          {/* Info */}
          <div className="col-md-9">
            <span className="genre-tag mb-3 d-inline-block">{movie.genre}</span>
            <h1 className="detail-title">{movie.title}</h1>
            <p className="detail-year"> {movie.year}</p>

            <div className="mb-3">
              <ReactStars
                count={5}
                value={movie.rating}
                edit={false}
                size={28}
                color2="#ffd93d"
              />
            </div>

            <p className="detail-desc">{movie.description}</p>

            {/* Trailer */}
            {movie.trailerURL && (
              <div className="trailer-section mt-4">
                <h4 className="trailer-title"> Official Trailer</h4>
                <div className="trailer-wrapper">
                  <iframe
                    src={movie.trailerURL}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;