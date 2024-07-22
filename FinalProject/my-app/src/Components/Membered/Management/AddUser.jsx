import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { permissionsJsonAddUser } from "../../../Utils/permissionsJsonUtils";
import { usersDBAddUser } from "../../../Utils/usersDBUtils";
import { usersJsonAddUser } from "../../../Utils/usersJsonUtils";

import UsersDataContext from "../../../Services/UsersDataContext";

export default function AddUser() {
  const navigate = useNavigate();
  const [, reloadData] = useContext(UsersDataContext);

  const [userObj, setUserObj] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    sessionTimeOut: "",
    createdDate: new Date(),
    permissions: [],
  });

  const handleChange = (e) => {
    const newObj = { ...userObj };
    newObj[e.target.id] = e.target.value;
    setUserObj(newObj);
  };

  const handleCheckboxChange = (e) => {
    const newObj = { ...userObj };
    const index = newObj.permissions.findIndex((p) => p === e.target.id);

    if (index === -1) newObj.permissions.push(e.target.id);
    else newObj.permissions.splice(index, 1);

    const subfilt = newObj.permissions.filter((p) =>
      p.includes("Subscriptions")
    );
    const movfilt = newObj.permissions.filter((p) => p.includes("Movies"));

    const VSnotExist = newObj.permissions.every(
      (p) => p !== "View Subscriptions"
    );
    const VMnotExist = newObj.permissions.every((p) => p !== "View Movies");

    if (VSnotExist && subfilt.length > 0)
      newObj.permissions.push("View Subscriptions");
    if (VMnotExist && movfilt.length > 0)
      newObj.permissions.push("View Movies");

    setUserObj(newObj);
  };

  const handleUpdate = async () => {
    const { firstName, lastName, userName, sessionTimeOut } = userObj || {};

    if (!firstName || !lastName || !userName || !sessionTimeOut)
      return alert(
        "Please enter first name, last name, username and session time out"
      );

    const { _id } = await usersDBAddUser({
      Username: userObj.userName,
    });

    await usersJsonAddUser({
      id: _id,
      FirstName: userObj.firstName,
      LastName: userObj.lastName,
      CreatedDate: userObj.createdDate,
      SessionTimeOut: userObj.sessionTimeOut,
    });
    await permissionsJsonAddUser({
      id: _id,
      Permissions: userObj.permissions,
    });

    reloadData();
    navigate("/Management/AllUsers");
  };

  return (
    <div className="border border-4 p-5 border-secondary bg-dark text-white">
      <label htmlFor="firstName">
        First Name:{" "}
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={userObj.firstName}
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <label htmlFor="lastName">
        Last Name:{" "}
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={userObj.lastName}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="userName">
        User Name:{" "}
        <input
          type="text"
          name="userName"
          id="userName"
          value={userObj.userName}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="sessionTimeOut">
        Session Time Out (Minutes):{" "}
        <input
          type="number"
          name="sessionTimeOut"
          id="sessionTimeOut"
          value={userObj.sessionTimeOut}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="permissions">Permissions:</label> <br />
      <label htmlFor="viewSubscriptions">
        <input
          type="checkbox"
          name="permissions"
          id="View Subscriptions"
          onChange={handleCheckboxChange}
          checked={
            !userObj.permissions.every((p) => p !== "View Subscriptions")
          }
        />{" "}
        View Subscriptions
      </label>
      <br />
      <label htmlFor="createSubscriptions">
        <input
          type="checkbox"
          name="permissions"
          id="Create Subscriptions"
          onChange={handleCheckboxChange}
          checked={
            !userObj.permissions.every((p) => p !== "Create Subscriptions")
          }
        />{" "}
        Create Subscriptions
      </label>
      <br />
      <label htmlFor="deleteSubscriptions">
        <input
          type="checkbox"
          name="permissions"
          id="Delete Subscriptions"
          onChange={handleCheckboxChange}
          checked={
            !userObj.permissions.every((p) => p !== "Delete Subscriptions")
          }
        />{" "}
        Delete Subscriptions
      </label>
      <br />
      <label htmlFor="updateSubscriptions">
        <input
          type="checkbox"
          name="permissions"
          id="Update Subscriptions"
          onChange={handleCheckboxChange}
          checked={
            !userObj.permissions.every((p) => p !== "Update Subscriptions")
          }
        />{" "}
        Update Subscriptions
      </label>
      <br />
      <label htmlFor="viewMovies">
        <input
          type="checkbox"
          name="permissions"
          id="View Movies"
          onChange={handleCheckboxChange}
          checked={!userObj.permissions.every((p) => p !== "View Movies")}
        />{" "}
        View Movies
      </label>
      <br />
      <label htmlFor="createMovies">
        <input
          type="checkbox"
          name="permissions"
          id="Create Movies"
          onChange={handleCheckboxChange}
          checked={!userObj.permissions.every((p) => p !== "Create Movies")}
        />{" "}
        Create Movies
      </label>{" "}
      <br />
      <label htmlFor="deleteMovies">
        <input
          type="checkbox"
          name="permissions"
          id="Delete Movies"
          onChange={handleCheckboxChange}
          checked={!userObj.permissions.every((p) => p !== "Delete Movies")}
        />{" "}
        Delete Movies
      </label>{" "}
      <br />
      <label htmlFor="updateMovies">
        <input
          type="checkbox"
          name="permissions"
          id="Update Movies"
          onChange={handleCheckboxChange}
          checked={!userObj.permissions.every((p) => p !== "Update Movies")}
        />{" "}
        Update Movies
      </label>{" "}
      <br />
      <button className="m-2 btn btn-primary" onClick={handleUpdate}>
        Add
      </button>
      <button className="m-2 btn btn-danger" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}
