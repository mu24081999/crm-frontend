// components/RoleAuthorization.js

import React from "react";
import NotFound from "./views/NotFound/NotFound";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoleAuthorization =
  (allowedRoles, role, subscribed, user) => (WrappedComponent) => {
    const AuthorizedComponent = () => {
      if (
        allowedRoles.includes(role) &&
        subscribed &&
        role === "USER" &&
        user.parent_id === null &&
        user.client_id === null &&
        user?.verified === 1
      ) {
        return <WrappedComponent />;
      } else if (
        allowedRoles.includes(role) &&
        role === "USER" &&
        subscribed &&
        user.parent_id !== null &&
        user.client_id === null &&
        user?.verified === 1
      ) {
        return <WrappedComponent />;
      } else if (
        allowedRoles.includes(role) &&
        subscribed &&
        role === "AGENT" &&
        user.parent_id === null &&
        user.client_id !== null &&
        user?.verified === 1
      ) {
        return <WrappedComponent />;
      } else if (role === "ADMIN") {
        return <WrappedComponent />;
      } else {
        return <NotFound />;
        // Redirect or show unauthorized message
        // Alternatively, you can render an unauthorized message component
        // return <UnauthorizedMessage />;
      }
    };

    return AuthorizedComponent();
  };

export default RoleAuthorization;
