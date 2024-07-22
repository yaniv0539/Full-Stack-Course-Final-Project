const express = require("express");
const moviesService = require("../services/moviesService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const movies = await moviesService.getAllMovies();
    return res.json(movies);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const movie = await moviesService.getMovieById(req.params.id);
    return res.json(movie);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await moviesService.addMovie(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await moviesService.updateMovie(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await moviesService.deleteMovie(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
