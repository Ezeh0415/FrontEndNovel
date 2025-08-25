import React from 'react'
import { Navigate } from 'react-router-dom';



const ProtectedRoute = ({isAuthenticated, children}) => {
    if (!isAuthenticated) {
        return <Navigate to="/signup" replace />;
    }
  return children;
}

export default ProtectedRoute;
