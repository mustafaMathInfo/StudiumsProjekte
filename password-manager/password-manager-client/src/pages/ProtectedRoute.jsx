import React, {ReactNode} from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/authContext.jsx";

const ProtectedRoute = (props) => {
    const {isAuthenticated } = useAuth();
    if (isAuthenticated){
        return <>{props.children}</>
    }
    return <Navigate to='/'/>
};

export default ProtectedRoute;
