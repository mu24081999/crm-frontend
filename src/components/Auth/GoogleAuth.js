// GoogleLoginButton.js
import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="73457248543-ajrfqvu4dia9uk53c218j68jc34c7a44.apps.googleusercontent.com"
      buttonText="Login with Google"
      // redirectUri="https://desktopcrm.com:51/v1/auth/google/callback"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
