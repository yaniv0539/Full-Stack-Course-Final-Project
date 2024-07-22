import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoPremission({ permission }) {
  const navigate = useNavigate();
  return (
    <div>
      <strong>You Don't Have The Premission To {permission} :(</strong> <br />{" "}
      <br />
      <button className="btn btn-danger btn-sm" onClick={() => navigate(-1)}>
        Go Back
      </button>{" "}
      <br />
    </div>
  );
}
