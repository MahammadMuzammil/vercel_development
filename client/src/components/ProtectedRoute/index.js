// components/ProtectedRoute.jsx

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get('jwt_token');

  // Check if JWT token exists or handle token expiration logic here
  if (!jwtToken) {
    // Redirect to login page if JWT token is not present
    return <Redirect to="/login"/>;
  }

  // Render the Route component with the provided element
  return <Route {...props}  />;
};

export default ProtectedRoute;
