import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersDBGetUsers, usersDBUpdateUser } from "../../Utils/usersDBUtils";

export default function NewUser() {
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    if (!Username || !Password)
      return alert("Please enter username and password");

    const usersDB = await usersDBGetUsers();
    const index = usersDB.findIndex((user) => user.Username === Username);

    if (index !== -1) {
      if (usersDB[index].Password !== undefined)
        alert("This username has already been created");
      else {
        usersDBUpdateUser(usersDB[index]._id, { Username, Password });
        alert("Great!");
        navigate(-1);
      }
    } else {
      alert(
        "User does not exist in our database. please contact with your superior"
      );
    }
  };
  return (
    <div className="text-black">
      <main className="form-check-inline">
        <form>
          <h1 className="h3 mb-3 fw-normal text-white">Please Sign up</h1>
          <div className="form-floating">
            <input
              type="text"
              name="username"
              id="floatingUsername"
              className="form-control"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>{" "}
          <br />
          <div className="form-floating">
            <input
              type="password"
              name="password"
              id="floatingPassword"
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>{" "}
          <br />
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={createUser}
          >
            Create
          </button>
          <br /> <br />
          <div>
            <Link to="/">I've Already Signed up...</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
