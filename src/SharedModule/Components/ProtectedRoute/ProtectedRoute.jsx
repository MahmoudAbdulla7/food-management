import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../../../AuthModule/Components/Login/Login';

export default function ProtectedRoute({adminData,children}) {
    if (adminData==null && localStorage.getItem("adminTkn") == null) {
        return <Navigate to="/login"/>;
    }else{
        // console.log("7elw");
        return children;
    }

}
