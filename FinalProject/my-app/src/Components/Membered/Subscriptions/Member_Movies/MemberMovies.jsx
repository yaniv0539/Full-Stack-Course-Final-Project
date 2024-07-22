import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddMemberMovie from "./AddMemberMovie";

export default function MemberMovies({ memberSub, member, movies }) {
  const [shouldShowAddMemberMovie, setShouldShowAddMemberMovie] =
    useState(false);

  const unSubs = [...movies];

  const showMemberMovies = () => {
    if (memberSub.length === 0)
      return <div>Member Doesn't have subscription</div>;

    return memberSub.Movies.map((memberMovie, index) => {
      const movieIndex = movies.findIndex(
        (movie) => movie._id === memberMovie.MovieId
      );
      const unSubsIndex = unSubs.findIndex(
        (movie) => movie._id === memberMovie.MovieId
      );

      if (movieIndex === -1 || unSubsIndex === -1) return null;

      unSubs.splice(unSubsIndex, 1);

      return (
        <li key={index}>
          <Link to={"/Movies/AllMovies"} state={movies[movieIndex]}>
            {movies[movieIndex].Name}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="border border-4 p-2 border-info">
      <strong>Movies Watched</strong> <br /> <br />
      <button
        onClick={() => setShouldShowAddMemberMovie(!shouldShowAddMemberMovie)}
        className="btn btn-info btn-sm"
      >
        Subscribe to new movie
      </button>{" "}
      <br /> <br />
      {shouldShowAddMemberMovie && (
        <AddMemberMovie memberSub={memberSub} member={member} unSubs={unSubs} />
      )}
      <ul>{showMemberMovies()}</ul>
    </div>
  );
}
