import React from "react";
import { Navigate } from "react-router-dom";

export default function VerifyUserFalse({ children }, userRole) {


  if (userRole !== "false") {
    return <Navigate to="/error" />;//pasar mensaje de usuario bloqueado 
    
  }

  return children;
}
