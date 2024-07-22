import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainPageDataContext from "../../../Services/MainPageDataContext";
import { deleteMember } from "../../../Utils/membersUtils";
import { deleteSubscription } from "../../../Utils/subscriptionsUtils";
import NoPremission from "../NoPremission";
import MemberMovies from "./Member_Movies/MemberMovies";

export default function AllMembers() {
  const navigate = useNavigate();
  const [SubscriptionsWBData, userData, getSubscriptionsWBData] =
    useContext(MainPageDataContext);
  const { movies, members, subscriptions } = SubscriptionsWBData || {};
  const permission = "View Subscriptions";
  const { Permissions } = userData;

  if (!Permissions) return <div>Loadind...</div>;

  if (!Permissions.find((p) => p === permission))
    return <NoPremission permission={permission} />;

  if (!movies || !members || !subscriptions) return <div>Loadind...</div>;

  const handleDelete = async (member) => {
    const index = subscriptions.findIndex((sub) => sub.MemberId === member._id);
    await deleteSubscription(subscriptions[index]._id);
    await deleteMember(member._id);
    getSubscriptionsWBData();
  };

  const showMembers = members.map((member, index) => {
    const memberSub =
      subscriptions.find(
        (subscription) => subscription.MemberId === member._id
      ) || [];

    return (
      <div
        key={index}
        className="border border-4 p-5 border-secondary bg-dark text-white"
      >
        <strong>{member.Name}</strong> <br /> <br />
        <span>Email: {member.Email}</span> <br /> <br />
        <span>City: {member.City}</span> <br /> <br />
        {Permissions.find((p) => p === "Update Subscriptions") ? (
          <button
            className="btn btn-primary m-2"
            onClick={() =>
              navigate(`/Subscriptions/${member._id}`, { state: member })
            }
          >
            Edit
          </button>
        ) : null}
        {Permissions.find((p) => p === "Delete Subscriptions") ? (
          <button
            className="btn btn-danger m-2"
            onClick={() => handleDelete(member)}
          >
            Delete
          </button>
        ) : null}
        <br /> <br />
        <MemberMovies memberSub={memberSub} member={member} movies={movies} />
      </div>
    );
  });

  return <div>{showMembers}</div>;
}
