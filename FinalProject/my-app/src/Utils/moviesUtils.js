import axios from "axios";

const url = "http://localhost:8000/movies";

export async function getMovies() {
  const { data } = await axios.get(url);
  return data;
}

export async function getMovieById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function addMovie(newUser) {
  const { data } = await axios.post(url, newUser);
  return data;
}

export async function updateMovie(id, newUser) {
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function deleteMovie(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
