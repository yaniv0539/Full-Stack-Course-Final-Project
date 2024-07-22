import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPageDataContext from "../../../Services/MainPageDataContext";
import { addMovie } from "../../../Utils/moviesUtils";
import NoPremission from "../NoPremission";

export default function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    Premiered: new Date().toISOString().slice(0, 10),
  });
  const [, userData, getSubscriptionsWBData] = useContext(MainPageDataContext);
  const permission = "Create Movies";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  const handleChange = (e) => {
    const newMovie = { ...movie };
    newMovie[e.target.id] = e.target.value;
    setMovie(newMovie);
  };

  const handleAdd = async () => {
    const { Name, Genres, Image } = movie || {};
    if (!Name || !Genres || !Image)
      return alert("Please enter name, genres and image url");
    const genresArr = movie.Genres.split(",");
    addMovie({ ...movie, Genres: genresArr });
    getSubscriptionsWBData();
    navigate("/Movies/AllMovies");
  };

  return (
    <div className="border border-4 p-5 border-secondary bg-dark text-white">
      <h2>Add New Movie</h2> <br /> <br />
      <label htmlFor="Name">
        Name:{" "}
        <input
          type="text"
          name="Name"
          id="Name"
          size={100}
          required
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
          required
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="Image">
        Image URL:{" "}
        <input
          type="text"
          name="Image"
          id="Image"
          size={100}
          required
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="Premiered">
        Premiered:{" "}
        <input
          type="date"
          name="Premiered"
          id="Premiered"
          size={100}
          required
          value={movie.Premiered}
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <button className="m-2 btn btn-primary" onClick={handleAdd}>
        Add
      </button>
      <button className="m-2 btn btn-danger" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}
