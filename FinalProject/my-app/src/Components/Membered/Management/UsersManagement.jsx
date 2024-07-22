import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import ColorBtn from "../../../Services/ColorBtn.jsx";
export default function UsersManagement() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div>
      <h2>Users</h2> <br />
      <button
        className={ColorBtn("AllUsers", "sm", pathname)}
        onClick={() => navigate("AllUsers")}
      >
        All Users
      </button>
      <button
        className={ColorBtn("AddUser", "sm", pathname)}
        onClick={() => navigate("AddUser")}
      >
        Add User
      </button>{" "}
      <br /> <br />
      <Outlet />
    </div>
  );
}
