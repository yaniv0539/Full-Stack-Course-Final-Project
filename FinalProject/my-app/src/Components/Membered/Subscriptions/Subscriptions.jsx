import React, { useContext } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import ColorBtn from "../../../Services/ColorBtn.jsx";
import MainPageDataContext from "../../../Services/MainPageDataContext.js";
import NoPremission from "../NoPremission.jsx";

export default function Subscriptions() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, userData] = useContext(MainPageDataContext);
  const permission = "View Subscriptions";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  return (
    <div>
      <h2>Subscriptions</h2> <br />
      {Permissions.find((p) => p === "View Subscriptions") ? (
        <button
          className={ColorBtn("AllMembers", "sm", pathname)}
          onClick={() => navigate("AllMembers")}
        >
          All Members
        </button>
      ) : null}
      {Permissions.find((p) => p === "Create Subscriptions") ? (
        <button
          className={ColorBtn("AddMembers", "sm", pathname)}
          onClick={() => navigate("AddMember")}
        >
          Add Member
        </button>
      ) : null}
      <br /> <br />
      <Outlet />
    </div>
  );
}
