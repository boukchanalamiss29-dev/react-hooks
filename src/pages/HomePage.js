import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Filter from "../components/Filter";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

function AddMovieForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "", year: 2024, rating: 3,
    genre: "Action", description: "", posterURL: "", trailerURL: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert("Title & description required!");
    onAdd({ ...form, id: Date.now(), rating: Number(form.rating) });
  };

  return (
    <div className="add-form mb-4 p-4">
      <h5 className="mb-3"> Add New Movie</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input className="form-control dark-input" placeholder="Title *"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control dark-input" type="number" placeholder="Year"
              value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-select dark-input"
              value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
              {["Action","Comedy","Drama","Sci-Fi","Horror","Crime","Thriller","Animation","Romance"].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <input className="form-control dark-input" placeholder="Poster URL"
              value={form.posterURL} onChange={(e) => setForm({ ...form, posterURL: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control dark-input" type="number" placeholder="Rating (1-5)"
              min="1" max="5" step="0.5"
              value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control dark-input" placeholder="Trailer (YouTube embed URL)"
              value={form.trailerURL} onChange={(e) => setForm({ ...form, trailerURL: e.target.value })} />
          </div>
          <div className="col-12">
            <textarea className="form-control dark-input" rows={2} placeholder="Description *"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn-add-nav">+ Add Movie</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function HomePage({ movies, addMovie, genreEmoji }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const genres = [...new Set(movies.map((m) => m.genre))];

  const filteredMovies = movies.filter((movie) => {
    const matchTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchRating = movie.rating >= ratingFilter;
    return matchTitle && matchRating;
  });

  const handleAdd = (newMovie) => {
    addMovie(newMovie);
    setShowForm(false);
  };

  return (
    <div className="app-wrapper">
      <Navbar onAddClick={() => setShowForm(!showForm)} />
      <Hero />

      <div className="container-fluid py-4 px-4">

        

        {/* Filter */}
        <Filter
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />

        {/* Add Form */}
        {showForm && <AddMovieForm onAdd={handleAdd} />}

        {/* Movies */}
        {titleFilter || ratingFilter > 0 ? (
          <>
            <h2 className="section-title mt-4">🔍 Search Results</h2>
            <MovieList movies={filteredMovies} />
          </>
        ) : (
          genres.map((genre) => (
            <div key={genre} className="genre-section mt-4">
              <h2 className="section-title">
                <span className="genre-dot" />
                {genreEmoji(genre)} {genre}
              </h2>
              <MovieList movies={movies.filter((m) => m.genre === genre)} />
            </div>
          ))
        )}

      </div>
      <Footer />
    </div>
  );
}

export default HomePage;