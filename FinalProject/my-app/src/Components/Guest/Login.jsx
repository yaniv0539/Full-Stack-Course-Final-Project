import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { usersDBGetUsers } from "../../Utils/usersDBUtils";

export default function Auth({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const setSession = async (e) => {
    e.preventDefault();

    if (!username || !password)
      return alert("Please enter username and password");

    const usersDB = await usersDBGetUsers();

    const index = usersDB.findIndex(
      (user) => username === user.Username && password === user.Password
    );

    if (index === -1) return alert("Username and/or password are incorrect");

    setToken(usersDB[index]);
    navigate("/");
  };

  return (
    <div className="text-black">
      <main className="form-check-inline">
        <form>
          <h1 className="h3 mb-3 fw-normal text-white">Please log in</h1>
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
          </div>
          <br />
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={setSession}
          >
            Log in
          </button>
          <br /> <br />
          <div>
            <Link to="/Signup">New User?</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
