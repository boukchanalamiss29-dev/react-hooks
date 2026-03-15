import { useRef } from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const rowRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - rowRef.current.offsetLeft;
    scrollLeft = rowRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <span>🎬</span>
        <p>No movies found. Try different filters.</p>
      </div>
    );
  }

  return (
    <div
      className="movies-scroll-row"
      ref={rowRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;