import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMovie } from "../../../Utils/moviesUtils";
import MainPageDataContext from "../../../Services/MainPageDataContext";
import NoPremission from "../NoPremission";

export default function EditMovie() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const genresToStr = () => {
    let Genres = "";
    if (state.Genres.length === 1) Genres = state.Genres[0];
    if (state.Genres.length > 1)
      Genres = state.Genres.reduce((pre, cur) => `${pre}, ${cur}`);
    return Genres;
  };

  const Genres = genresToStr();
  const [movie, setMovie] = useState({ ...state, Genres });
  const [, userData, getSubscriptionsWBData] = useContext(MainPageDataContext);
  const permission = "Update Movies";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  const handleChange = (e) => {
    const newMovie = { ...movie };
    newMovie[e.target.id] = e.target.value;
    setMovie(newMovie);
  };

  const handleUpdate = async () => {
    const { Name, Genres, Image } = movie || {};

    if (!Name || !Genres || !Image)
      return alert("Please enter name, genres and image url");

    const genresArr = movie.Genres.split(",");

    updateMovie(movie._id, { ...movie, Genres: genresArr });
    getSubscriptionsWBData();
    navigate("/Movies/AllMovies");
  };

  return (
    <div className="border border-4 p-5 border-secondary bg-dark text-white">
      <h2>Edit Movie: {movie.Name}</h2> <br /> <br />
      <label htmlFor="Name">
        Name:{" "}
        <input
          type="text"
          name="Name"
          id="Name"
          size={100}
          value={movie.Name}
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <label htmlFor="lastName">
        Genres:{" "}
        <input
          type="text"
          name="Genres"
          id="Genres"
          size={100}
          value={movie.Genres}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="userName">
        Image URL:{" "}
        <input
          type="text"
          name="Image"
          id="Image"
          size={100}
          value={movie.Image}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="sessionTimeOut">
        Premiered:{" "}
        <input
          type="date"
          name="Premiered"
          id="Premiered"
          size={100}
          value={movie.Premiered.slice(0, 10)}
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <button className="m-2 btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
      <button className="m-2 btn btn-danger" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}
