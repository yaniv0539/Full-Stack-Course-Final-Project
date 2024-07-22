import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPageDataContext from "../../../Services/MainPageDataContext";
import { addMember } from "../../../Utils/membersUtils";
import NoPremission from "../NoPremission";

export default function AddMember() {
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [, userData, getSubscriptionsWBData] = useContext(MainPageDataContext);
  const permission = "Create Subscriptions";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  const handleChange = (e) => {
    const newMember = { ...member };
    newMember[e.target.id] = e.target.value;
    setMember(newMember);
  };

  const handleAdd = async () => {
    const { Name, Email, City } = member || {};

    if (!Name || !Email || !City)
      return alert("Please enter name, email and city");

    addMember(member);
    getSubscriptionsWBData();
    navigate("/Subscriptions/AllMembers");
  };

  return (
    <div className="border border-4 p-5 border-secondary bg-dark text-white">
      <h2>Add New Member</h2> <br /> <br />
      <label htmlFor="Name">
        Name:{" "}
        <input
          type="text"
          name="Name"
          id="Name"
          size={100}
          required
          onChange={handleChange}
        />
      </label>{" "}
      <br /> <br />
      <label htmlFor="Email">
        Email:{" "}
        <input
          type="email"
          name="Email"
          id="Email"
          size={100}
          required
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
          required
          onChange={handleChange}
        />
      </label>
      <br /> <br />
      <button className="m-2 btn btn-primary" onClick={handleAdd}>
        Add
      </button>
      <button className="m-2 btn btn-danger" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}
