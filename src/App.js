import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";
import "./App.css";

const initialMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 5,
    genre: "Action",
    description: "Batman fights the Joker who brings chaos to Gotham City.",
    posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 4.5,
    genre: "Sci-Fi",
    description: "A thief enters people's dreams to steal secrets.",
    posterURL: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 5,
    genre: "Sci-Fi",
    description: "Astronauts travel through a wormhole to save humanity.",
    posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 4,
    title: "The Godfather",
    year: 1972,
    rating: 5,
    genre: "Crime",
    description: "The aging patriarch of an organized crime dynasty transfers control to his son.",
    posterURL: "https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/08/IMG_4675-scaled.jpeg",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    rating: 5,
    genre: "Crime",
    description: "The lives of two mob hitmen, a boxer, and others intertwine in this classic.",
    posterURL: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    rating: 4.5,
    genre: "Sci-Fi",
    description: "A hacker discovers the world is a simulation and joins the resistance.",
    posterURL: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 7,
    title: "Forrest Gump",
    year: 1994,
    rating: 5,
    genre: "Drama",
    description: "The story of a man with a low IQ who achieves extraordinary things.",
    posterURL: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    id: 8,
    title: "Fight Club",
    year: 1999,
    rating: 4.5,
    genre: "Drama",
    description: "An insomniac and a soap salesman form an underground fight club.",
    posterURL: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    id: 9,
    title: "Gladiator",
    year: 2000,
    rating: 4.5,
    genre: "Action",
    description: "A Roman general seeks revenge after being betrayed and enslaved.",
    posterURL: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 4.5,
    genre: "Action",
    description: "The Avengers assemble one final time to reverse Thanos's actions.",
    posterURL: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    rating: 5,
    genre: "Thriller",
    description: "A poor family schemes to become employed by a wealthy family.",
    posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    id: 12,
    title: "The Lion King",
    year: 1994,
    rating: 5,
    genre: "Animation",
    description: "A young lion prince flees his kingdom after his father's murder.",
    posterURL: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
  },
  {
    id: 13,
    title: "Joker",
    year: 2019,
    rating: 4.5,
    genre: "Drama",
    description: "A failed comedian descends into madness and becomes the Joker.",
    posterURL: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 14,
    title: "Titanic",
    year: 1997,
    rating: 4.5,
    genre: "Romance",
    description: "A love story unfolds aboard the ill-fated RMS Titanic.",
    posterURL: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  },
  {
    id: 15,
    title: "Spider-Man: No Way Home",
    year: 2021,
    rating: 4.5,
    genre: "Action",
    description: "Spider-Man asks Doctor Strange for help and opens the multiverse.",
    posterURL: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
];

function App() {
  // 🪝 Hook 1: liste des films
  const [movies, setMovies] = useState(initialMovies);

  // 🪝 Hook 2: filtre par titre
  const [titleFilter, setTitleFilter] = useState("");

  // 🪝 Hook 3: filtre par note
  const [ratingFilter, setRatingFilter] = useState(0);

  // 🪝 Hook 4: show/hide formulaire
  const [showForm, setShowForm] = useState(false);

  // Films filtrés
  const filteredMovies = movies.filter((movie) => {
    const matchTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchRating = movie.rating >= ratingFilter;
    return matchTitle && matchRating;
  });

  // Ajouter un film
  const handleAddMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
    setShowForm(false);
  };

  return (
    <div className="app-wrapper">
      <Navbar onAddClick={() => setShowForm(!showForm)} />
      <Hero />
      <div className="container py-4">
        <Filter
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
        {showForm && <AddMovieForm onAdd={handleAddMovie} />}
        <MovieList movies={filteredMovies} />
      </div>
      <Footer />
    </div>
  );
}

// ── Formulaire inline simple ──
function AddMovieForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "", year: 2024, rating: 3,
    genre: "Action", description: "", posterURL: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return alert("Title & description required!");
    onAdd({ ...form, id: Date.now(), rating: Number(form.rating) });
  };

  return (
    <div className="add-form mb-4 p-4">
      <h5 className="mb-3">🎬 Add New Movie</h5>
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
              {["Action","Comedy","Drama","Sci-Fi","Horror","Crime"].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="col-md-8">
            <input className="form-control dark-input" placeholder="Poster URL"
              value={form.posterURL} onChange={(e) => setForm({ ...form, posterURL: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input className="form-control dark-input" type="number" placeholder="Rating (1-5)"
              min="1" max="5" step="0.5"
              value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          </div>
          <div className="col-12">
            <textarea className="form-control dark-input" rows={2} placeholder="Description *"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-danger px-4">Add Movie</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;