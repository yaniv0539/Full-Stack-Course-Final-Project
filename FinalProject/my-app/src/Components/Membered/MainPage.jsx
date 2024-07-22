import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import DataContext from "../../Services/DataContext";
import MainPageDataContext from "../../Services/MainPageDataContext";
import ColorBtn from "../../Services/ColorBtn.jsx";

import { usersJsonGetUsersById } from "../../Utils/usersJsonUtils";
import { permissionsJsonGetUsersById } from "../../Utils/permissionsJsonUtils";
import { getMovies } from "../../Utils/moviesUtils";
import { getMembers } from "../../Utils/membersUtils";
import { getSubscriptions } from "../../Utils/subscriptionsUtils";

export default function MainPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [userData, setUserData] = useState({});
  const [SubscriptionsWBData, setSubscriptionsWBData] = useState({
    movies: [],
    members: [],
    subscriptions: [],
  });
  const [token, setToken] = useContext(DataContext);

  useEffect(() => {
    getSubscriptionsWBData();
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = JSON.parse(localStorage["token"]);
    const { _id, Username, Password } = token || {};
    const { FirstName, LastName, CreatedDate, SessionTimeOut } =
      await usersJsonGetUsersById(_id);
    const { Permissions } = await permissionsJsonGetUsersById(_id);
    const userData = {
      Username,
      Password,
      FirstName,
      LastName,
      CreatedDate,
      SessionTimeOut,
      Permissions,
    };
    setUserData(userData);
  };

  const getSubscriptionsWBData = async () => {
    const movies = await getMovies();
    const members = await getMembers();
    const subscriptions = await getSubscriptions();
    setSubscriptionsWBData({ movies, members, subscriptions });
  };

  const handleClick = (e) => navigate(e.target.name);

  const handleLogoutClick = () => {
    setToken();
    navigate("/");
  };

  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  return (
    <MainPageDataContext.Provider
      value={[SubscriptionsWBData, userData, getSubscriptionsWBData]}
    >
      <div>
        {Permissions.find((p) => p === "View Movies") ? (
          <button
            className={ColorBtn("Movies", "", pathname)}
            name="Movies"
            onClick={handleClick}
          >
            Movies
          </button>
        ) : null}
        {Permissions.find((p) => p === "View Subscriptions") ? (
          <button
            className={ColorBtn("Subscriptions", "", pathname)}
            name="Subscriptions"
            onClick={handleClick}
          >
            Subscriptions
          </button>
        ) : null}
        {token.Username === "Admin" ? (
          <button
            className={ColorBtn("Management", "", pathname)}
            name="Management"
            onClick={handleClick}
          >
            Users Management
          </button>
        ) : null}
        <button
          className="m-2 btn btn-danger"
          name="LogOut"
          onClick={handleLogoutClick}
        >
          Log Out
        </button>
        <br /> <br />
        <Outlet />
      </div>
    </MainPageDataContext.Provider>
  );
}
