import React, { useState } from "react";

function MovieCard({ movie, onDelete }) {
  const starsEmoji = "⭐".repeat(movie.rating);

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p><strong>Review:</strong> {movie.review}</p>
      <p><strong>Rating:</strong> {starsEmoji}</p>
      <button onClick={() => onDelete(movie.id)} className="delete-btn">
        Remove Movie
      </button>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);

  function handleAddMovie() {
    if (!title || !review) return;

    const newMovie = {
      id: Date.now(),
      title: title,
      review: review,
      rating: Number(rating)
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setReview("");
    setRating(1);
  }

  function handleDeleteMovie(id) {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
  }

  return (
    <div className="app-container">
      <h1>Movie Watch List</h1>

      <div className="form-container">
        <input 
          type="text" 
          placeholder="Movie Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Your Review" 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button onClick={handleAddMovie} className="add-btn">Add</button>
      </div>

      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onDelete={handleDeleteMovie} 
          />
        ))}
      </div>
    </div>
  );
}