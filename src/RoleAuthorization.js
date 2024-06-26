// components/RoleAuthorization.js

import React from "react";
import NotFound from "./views/NotFound/NotFound";
import { useSelector } from "react-redux";

const RoleAuthorization =
  (allowedRoles, role, subscribed, user, is_approved) => (WrappedComponent) => {
    const AuthorizedComponent = () => {
      // Assume userRole is fetched from authentication context or props
      if (
        allowedRoles.includes(role) &&
        subscribed &&
        role === "USER" &&
        user.parent_id === null &&
        user.client_id === null
      ) {
        return <WrappedComponent />;
      } else if (
        allowedRoles.includes(role) &&
        role === "USER" &&
        user.parent_id !== null &&
        user.client_id === null
      ) {
        return <WrappedComponent />;
      } else if (
        allowedRoles.includes(role) &&
        role === "AGENT" &&
        user.parent_id === null &&
        user.client_id !== null
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
