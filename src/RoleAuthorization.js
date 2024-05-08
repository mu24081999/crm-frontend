// components/RoleAuthorization.js

import React from "react";
import NotFound from "./views/NotFound/NotFound";
import { useSelector } from "react-redux";

const RoleAuthorization =
  (allowedRoles, role, subscribed, user) => (WrappedComponent) => {
    const AuthorizedComponent = () => {
      // Assume userRole is fetched from authentication context or props
      const userRole = "USER"; // Example role

      if (
        allowedRoles.includes(role) &&
        subscribed &&
        role === "USER" &&
        user.parent_id === null &&
        user.client_id === null
      ) {
        console.log("🚀 ~ AuthorizedComponent ~ userRole:", userRole);

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
