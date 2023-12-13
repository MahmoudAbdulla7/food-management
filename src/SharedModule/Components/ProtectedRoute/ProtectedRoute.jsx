import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Context/authContext";

export default function ProtectedRoute({  children }) {
  let {userData}=useContext(AuthContext);

  if (userData && userData.userId ) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
}
