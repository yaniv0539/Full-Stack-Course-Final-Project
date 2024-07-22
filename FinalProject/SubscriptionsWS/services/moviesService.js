const Movie = require("../models/moviesModel");

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    Movie.find((err, movies) => (err ? reject(err) : resolve(movies)));
  });
};

const getMovieById = (movieId) => {
  return new Promise((resolve, reject) => {
    Movie.findById(movieId, (err, movie) =>
      err ? reject(err) : resolve(movie)
    );
  });
};

const addMovie = (newMovie) => {
  return new Promise((resolve, reject) => {
    const movie = new Movie(newMovie);
    movie.save((err) => (err ? reject(err) : resolve("Added Successfully!")));
  });
};

const addManyMoviesAtOnce = (newMovies) => {
  return new Promise((resolve, reject) => {
    Movie.insertMany(newMovies, (err) =>
      err ? reject(err) : resolve("Added Successfully!")
    );
  });
};

const updateMovie = (movieId, newMovie) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndUpdate(movieId, newMovie, (err) =>
      err ? reject(err) : resolve("Updated Successfully!")
    );
  });
};

const deleteMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndRemove(movieId, (err) =>
      err ? reject(err) : resolve("Deleted Successfully!")
    );
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
  addManyMoviesAtOnce,
};
