import React, { useContext, useEffect, useState } from "react";
import {
  addSubscription,
  updateSubscription,
} from "../../../../Utils/subscriptionsUtils";
import MainPageDataContext from "../../../../Services/MainPageDataContext";
import mongoose from "mongoose";

export default function AddMemberMovie({ memberSub, member, unSubs }) {
  const [selectedMovie, setSelectMovie] = useState();
  const [dateSeen, setDateSeen] = useState();
  const [, , getSubscriptionsWBData] = useContext(MainPageDataContext);
  const options = unSubs.map((movie, index) => (
    <option key={index} value={movie._id}>
      {movie.Name}
    </option>
  ));

  useEffect(() => {
    setSelectMovie(unSubs[0]._id);
  }, [unSubs]);

  const handleSelectChange = (e) => setSelectMovie(e.target.value);
  const handleDateChange = (e) => setDateSeen(e.target.value);

  const handleSubClick = async () => {
    if (!selectedMovie || !dateSeen)
      return alert("Please select movie and date");

    if (memberSub.length === 0) {
      const newSub = {
        MemberId: mongoose.Types.ObjectId(member._id),
        Movies: [
          {
            MovieId: mongoose.Types.ObjectId(selectedMovie),
            Date: dateSeen,
          },
        ],
      };
      addSubscription(newSub);
    } else {
      memberSub.Movies.push({
        MovieId: mongoose.Types.ObjectId(selectedMovie),
        Date: dateSeen,
      });
      updateSubscription(memberSub._id, memberSub);
    }
    getSubscriptionsWBData();
  };

  return (
    <div className="border border-4 border-info p-3 m-3">
      <strong>Add a new movie</strong> <br /> <br />
      <select
        name="addMovieList"
        id="addMovieList"
        className="form-select-sm m-2"
        onChange={handleSelectChange}
      >
        {options}
      </select>{" "}
      <input
        type="date"
        name="dateSeen"
        id="dateSeen"
        onChange={handleDateChange}
      />{" "}
      <br /> <br />
      <button className="btn btn-info btn-sm" onClick={handleSubClick}>
        Subscribe
      </button>
    </div>
  );
}
