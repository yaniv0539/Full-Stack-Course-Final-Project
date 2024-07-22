import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UsersDataContext from "../../../Services/UsersDataContext";
import { permissionsJsonDeleteUser } from "../../../Utils/permissionsJsonUtils";
import { usersDBDeleteUser } from "../../../Utils/usersDBUtils";
import { usersJsonDeleteUser } from "../../../Utils/usersJsonUtils";

export default function AllUsers() {
  const navigate = useNavigate();
  const [usersData, reloadData] = useContext(UsersDataContext);
  const { usersDB, usersJson, permissionsJson } = usersData || {};

  const showUsersJson = usersJson.map((userJson, index) => {
    const userDB = usersDB.find((userDB) => userDB._id === userJson.id);
    const permissionJson = permissionsJson.find((p) => p.id === userJson.id);

    const {
      id: UserId,
      FirstName,
      LastName,
      SessionTimeOut,
      CreatedDate,
    } = userJson || {};

    const { Username } = userDB || {};
    const { Permissions } = permissionJson || {};

    if (Username === "Admin") return null;

    let permissionsStr = "";
    if (Permissions.length > 1)
      permissionsStr = Permissions.reduce((sum, cur) => `${sum}, ${cur}`);
    else if (Permissions.length === 1) permissionsStr = Permissions[0];

    return (
      <div
        key={index}
        className="border border-4 p-5 border-secondary bg-dark text-white"
      >
        <b>Name: </b>
        {`${FirstName} ${LastName}`} <br /> <br />
        <b>User Name: </b> {Username}
        <br /> <br />
        <b>Session time out (Minutes):</b> {SessionTimeOut}
        <br /> <br />
        <b>Created Date: </b> {CreatedDate.slice(0, 10)}
        <br /> <br />
        <b>Permissions: </b> {permissionsStr}
        <br /> <br />
        <button
          className="m-2 btn btn-primary"
          onClick={() => navigate(`/Management/${UserId}`)}
        >
          Edit
        </button>
        <button
          className="m-2 btn btn-danger"
          onClick={() => handleDelete(UserId)}
        >
          Delete
        </button>{" "}
      </div>
    );
  });

  const handleDelete = async (UserId) => {
    await usersDBDeleteUser(UserId);
    await permissionsJsonDeleteUser(UserId);
    await usersJsonDeleteUser(UserId);
    reloadData();
  };

  return <div>{showUsersJson}</div>;
}
