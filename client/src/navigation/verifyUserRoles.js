/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Navigate } from "react-router-dom";
import loading from "../assets/loading.gif";

export default function VerifyUserRoles({ children, userRole }) {
  
  if (!userRole) {
    return (
      <div className="grid place-items-center h-screen ">
        <img className="h-8 w-8" src={loading}></img>
      </div>
    );
  } else {
    if (userRole !== "Admin") {
      return <Navigate to="/error" />;
    }

    return children;
  }
}
