import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const initialMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 5,
    genre: "Action",
    description: "Batman fights the Joker who brings chaos to Gotham City. When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 4.5,
    genre: "Sci-Fi",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterURL: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 5,
    genre: "Sci-Fi",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 4,
    title: "The Godfather",
    year: 1972,
    rating: 5,
    genre: "Crime",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterURL: "https://tse3.mm.bing.net/th/id/OIP.Wz7R4kPkQAChN_rsArY7-gHaKh?rs=1&pid=ImgDetMain&o=7&rm=3",
    trailerURL: "https://www.youtube.com/embed/sY1S34973zA",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    rating: 5,
    genre: "Crime",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterURL: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    trailerURL: "https://www.youtube.com/embed/s7EdQ4FqbhY",
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    rating: 4.5,
    genre: "Sci-Fi",
    description: "A hacker discovers the world is a simulation and joins the resistance against the machines.",
    posterURL: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    trailerURL: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
  {
    id: 7,
    title: "Forrest Gump",
    year: 1994,
    rating: 5,
    genre: "Drama",
    description: "The story of a man with a low IQ who achieves extraordinary things in life.",
    posterURL: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    trailerURL: "https://www.youtube.com/embed/bLvqoHBptjg",
  },
  {
    id: 8,
    title: "Fight Club",
    year: 1999,
    rating: 4.5,
    genre: "Drama",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    posterURL: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    trailerURL: "https://www.youtube.com/embed/qtRKdVHc-cE",
  },
  {
    id: 9,
    title: "Gladiator",
    year: 2000,
    rating: 4.5,
    genre: "Action",
    description: "A Roman general seeks revenge after being betrayed and enslaved. He becomes a gladiator.",
    posterURL: "https://tse2.mm.bing.net/th/id/OIP.sVF7bauZozkPM_WInBFgxwHaLH?w=1400&h=2100&rs=1&pid=ImgDetMain&o=7&rm=3",
    trailerURL: "https://www.youtube.com/embed/owK1qxDselE",
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 4.5,
    genre: "Action",
    description: "The Avengers assemble one final time to reverse Thanos's devastating actions.",
    posterURL: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    trailerURL: "https://www.youtube.com/embed/TcMBFSGVi1c",
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    rating: 5,
    genre: "Thriller",
    description: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
    posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailerURL: "https://www.youtube.com/embed/5xH0HfJHsaY",
  },
  {
    id: 12,
    title: "The Lion King",
    year: 1994,
    rating: 5,
    genre: "Animation",
    description: "A young lion prince flees his kingdom after his father's murder.",
    posterURL: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    trailerURL: "https://www.youtube.com/embed/4sj1MT05lAA",
  },
  {
    id: 13,
    title: "Joker",
    year: 2019,
    rating: 4.5,
    genre: "Drama",
    description: "A failed comedian descends into madness and becomes the iconic villain Joker.",
    posterURL: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    trailerURL: "https://www.youtube.com/embed/zAGVQLHvwOY",
  },
  {
    id: 14,
    title: "Titanic",
    year: 1997,
    rating: 4.5,
    genre: "Romance",
    description: "A love story unfolds aboard the ill-fated RMS Titanic.",
    posterURL: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    trailerURL: "https://www.youtube.com/embed/2e-eXJ6HgkQ",
  },
  {
    id: 15,
    title: "Spider-Man: No Way Home",
    year: 2021,
    rating: 4.5,
    genre: "Action",
    description: "Spider-Man asks Doctor Strange for help and accidentally opens the multiverse.",
    posterURL: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    trailerURL: "https://www.youtube.com/embed/JfVOs4VSpmA",
  },
];

function genreEmoji(genre) {
  const map = {
    Action: "", "Sci-Fi": "", Crime: "",
    Drama: "", Thriller: "", Animation: "",
    Romance: "", Horror: "", Comedy: "",
  };
  return map[genre] || "";
}

function App() {
  const [movies, setMovies] = useState(initialMovies);

  const addMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              addMovie={addMovie}
              genreEmoji={genreEmoji}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={<MovieDetailPage movies={movies} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;