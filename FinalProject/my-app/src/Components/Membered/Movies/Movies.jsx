import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import ColorBtn from "../../../Services/ColorBtn.jsx";
import MainPageDataContext from "../../../Services/MainPageDataContext.js";
import NoPremission from "../NoPremission";
import FilteredUsersContext from "../../../Services/FilteredUsersContext.js";

export default function Movies() {
  const navigate = useNavigate();
  const { pathname, state: findMovie } = useLocation();
  const [SubscriptionsWBData, userData] = useContext(MainPageDataContext);
  const { movies } = SubscriptionsWBData || {};
  const [searchInput, setSearchInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const permission = "View Movies";
  const { Permissions } = userData;

  useEffect(() => {
    if (!findMovie) return setFilteredMovies([...movies]);

    setFilteredMovies(
      [...movies].filter((movie) => {
        const movieName = movie.Name.toLowerCase();
        const findMovieName = findMovie.Name.toLowerCase();
        if (movieName.includes(findMovieName)) return true;
        return false;
      })
    );
  }, [findMovie, movies]);

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  const filteredResults = () => {
    if (!searchInput) return setFilteredMovies([...movies]);

    setFilteredMovies(
      [...movies].filter((movie) => {
        const movieName = movie.Name.toLowerCase();
        if (movieName.includes(searchInput.toLowerCase())) return true;
        return false;
      })
    );
  };
  return (
    <div>
      <h2>Movies</h2> <br />
      <button
        className={ColorBtn("AllMovies", "sm", pathname)}
        onClick={() => navigate("AllMovies")}
      >
        All Movies
      </button>
      {Permissions.find((p) => p === "Create Movies") ? (
        <button
          className={ColorBtn("AddMovie", "sm", pathname)}
          onClick={() => navigate("AddMovie")}
        >
          Add Movie
        </button>
      ) : null}
      {pathname === "/Movies/AllMovies" ? (
        <>
          <br /> <br />
          <label htmlFor="search">
            Find Movie{" "}
            <input
              type="text"
              name="search"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>
          <button
            className="btn btn-info btn-sm mb-1 ms-sm-3"
            onClick={filteredResults}
          >
            Find
          </button>
        </>
      ) : null}
      <br /> <br />
      <FilteredUsersContext.Provider value={filteredMovies}>
        <Outlet />
      </FilteredUsersContext.Provider>
    </div>
  );
}
