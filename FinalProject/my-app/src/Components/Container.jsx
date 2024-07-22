import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UsersDataContext from "../Services/UsersDataContext";
import DataContext from "../Services/DataContext";
import useToken from "../Services/useToken";

import { permissionsJsonGetUsers } from "../Utils/permissionsJsonUtils";
import { usersDBGetUsers } from "../Utils/usersDBUtils";
import { usersJsonGetUsers } from "../Utils/usersJsonUtils";

import Login from "./Guest/Login";
import Signup from "./Guest/Signup";
import MainPage from "./Membered/MainPage";
import Movies from "./Membered/Movies/Movies";
import AllMovies from "./Membered/Movies/AllMovies";
import AddMovie from "./Membered/Movies/AddMovie";
import EditMovie from "./Membered/Movies/EditMovie";
import Subscriptions from "./Membered/Subscriptions/Subscriptions";
import AllMembers from "./Membered/Subscriptions/AllMembers";
import AddMember from "./Membered/Subscriptions/AddMember";
import EditMember from "./Membered/Subscriptions/EditMember";
import UsersManagement from "./Membered/Management/UsersManagement";
import AllUsers from "./Membered/Management/AllUsers";
import AddUser from "./Membered/Management/AddUser";
import EditUser from "./Membered/Management/EditUser";

export default function Container() {
  const { token, setToken } = useToken({});
  const [usersData, setUsersData] = useState({
    usersDB: [],
    usersJson: [],
    permissionsJson: [],
  });

  const reloadData = async () => {
    const usersDB = await usersDBGetUsers();
    const usersJson = await usersJsonGetUsers();
    const permissionsJson = await permissionsJsonGetUsers();
    setUsersData({ usersDB, usersJson, permissionsJson });
  };

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <div>
      <UsersDataContext.Provider value={[usersData, reloadData]}>
        <DataContext.Provider value={[token, setToken]}>
          <h1>Movies - Subscriptions Web Site</h1> <br /> <br />
          {token ? UserRoutes() : GuestRoutes()}
        </DataContext.Provider>
      </UsersDataContext.Provider>
    </div>
  );

  function UserRoutes() {
    const usersManagement =
      token.Username === "Admin" ? (
        <UsersManagement />
      ) : (
        <p>You Are Not The Admin!</p>
      );

    return (
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="Movies" element={<Movies />}>
            <Route path="AllMovies" element={<AllMovies />} />
            <Route path="AddMovie" element={<AddMovie />} />
            <Route path=":userId" element={<EditMovie />} />
          </Route>
          <Route path="Subscriptions" element={<Subscriptions />}>
            <Route path="AllMembers" element={<AllMembers />} />
            <Route path="AddMember" element={<AddMember />} />
            <Route path=":userId" element={<EditMember />} />
          </Route>
          <Route path="Management" element={usersManagement}>
            <Route path="AllUsers" element={<AllUsers />} />
            <Route path="AddUser" element={<AddUser />} />
            <Route path=":userId" element={<EditUser />} />
          </Route>
          <Route path="/*" element={<p>Page Not Found :(</p>} />
        </Route>
      </Routes>
    );
  }

  function GuestRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="Login" />} />
        <Route path="Login" element={<Login setToken={setToken} />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
    );
  }
}
