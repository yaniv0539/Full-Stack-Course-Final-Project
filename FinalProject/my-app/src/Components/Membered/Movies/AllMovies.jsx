import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainPageDataContext from "../../../Services/MainPageDataContext";
import FilteredUsersContext from "../../../Services/FilteredUsersContext";
import { deleteMovie } from "../../../Utils/moviesUtils";
import NoPremission from "../NoPremission";

export default function AllMovies() {
  const navigate = useNavigate();
  const [SubscriptionsWBData, userData, getSubscriptionsWBData] =
    useContext(MainPageDataContext);
  const movies = useContext(FilteredUsersContext);
  const { members, subscriptions } = SubscriptionsWBData || {};
  const permission = "View Movies";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  if (!movies || !members || !subscriptions) return <div>Loadind...</div>;

  const movieGenres = (movie) => {
    let genres = "";

    if (movie.Genres.length === 1) genres = movie.Genres[0];
    if (movie.Genres.length > 1)
      genres = movie.Genres.reduce((pre, cur) => `${pre}, ${cur}`);
    return genres;
  };

  const handleDelete = async (movie) => {
    await deleteMovie(movie._id);
    getSubscriptionsWBData();
  };

  const showMovies = movies.map((movie, index) => {
    return (
      <div
        key={index}
        className="border border-4 p-5 border-secondary bg-dark text-white"
      >
        <strong>{`${movie.Name}, ${movie.Premiered.slice(0, 4)}`}</strong>{" "}
        <br /> <br />
        <span>Genres: {movieGenres(movie)}</span> <br /> <br />
        <img src={movie.Image} alt={movie.Name} className="m-2" />
        <div className="border border-4 border-secondary d-inline-block p-3 m-3">
          <strong>Subscriptions watched</strong> <br /> <br />
          <ul>
            {subscriptions.map((sub, index) => {
              const movieSubIndex = sub.Movies.findIndex(
                (subMovie) => subMovie.MovieId === movie._id
              );

              if (movieSubIndex === -1) return null;
              const memberWithName = members.find(
                (member) => member._id === sub.MemberId
              );

              if (!memberWithName) return null;

              return (
                <li key={index}>
                  <Link to={"/Subscriptions/AllMembers"}>
                    {memberWithName.Name}
                  </Link>
                  {", "}
                  {sub.Movies[movieSubIndex].Date.slice(0, 10)}
                </li>
              );
            })}
          </ul>
        </div>{" "}
        <br /> <br />
        {Permissions.find((p) => p === "Update Movies") ? (
          <button
            className="btn btn-primary m-2"
            onClick={() => navigate(`/Movies/${movie._id}`, { state: movie })}
          >
            Edit
          </button>
        ) : null}
        {Permissions.find((p) => p === "Delete Movies") ? (
          <button
            className="btn btn-danger m-2"
            onClick={() => handleDelete(movie)}
          >
            Delete
          </button>
        ) : null}
      </div>
    );
  });

  return <div>{showMovies}</div>;
}
