import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const userKey = localStorage.getItem('access_token');

    if (!userKey) {
        return <Navigate to="/inicioSesion" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
