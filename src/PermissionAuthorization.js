import React from "react";
import NotFound from "./views/NotFound/NotFound";

const PermissionAuthorization =
  (allowedPermissions, permission) => (WrappedComponent) => {
    const AuthorizedComponent = () => {
      if (allowedPermissions.includes(permission)) {
        console.log("🚀 ~ AuthorizedComponent ~ userRole:", permission);
        return <WrappedComponent />;
      } else {
        return <NotFound />;
      }
    };

    return AuthorizedComponent();
  };

export default PermissionAuthorization;
