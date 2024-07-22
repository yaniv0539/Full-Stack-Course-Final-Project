import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMember } from "../../../Utils/membersUtils";
import MainPageDataContext from "../../../Services/MainPageDataContext";
import NoPremission from "../NoPremission";

export default function EditMember() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [member, setMember] = useState(state);
  const [, userData, getSubscriptionsWBData] = useContext(MainPageDataContext);
  const permission = "Update Subscriptions";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  const handleChange = (e) => {
    const newMember = { ...member };
    newMember[e.target.id] = e.target.value;
    setMember(newMember);
  };

  const handleUpdate = async () => {
    const { Name, Email, City } = member || {};

    if (!Name || !Email || !City)
      return alert("Please enter name, email and city");

    updateMember(member._id, member);
    getSubscriptionsWBData();
    navigate("/Subscriptions/AllMembers");
  };

  return (
    <div className="border border-4 p-5 border-secondary bg-dark text-white">
      <h2>Edit Member: {member.Name}</h2> <br /> <br />
      <label htmlFor="Name">
        Name:{" "}
        <input
          type="text"
          name="Name"
          id="Name"
          size={100}
          value={member.Name}
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <label htmlFor="Email">
        Email:{" "}
        <input
          type="text"
          name="Email"
          id="Email"
          size={100}
          value={member.Email}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <label htmlFor="City">
        City:{" "}
        <input
          type="text"
          name="City"
          id="City"
          size={100}
          value={member.City}
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <button className="m-2 btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
      <button className="m-2 btn btn-danger" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}
