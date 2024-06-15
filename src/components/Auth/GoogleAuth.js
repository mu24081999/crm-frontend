// GoogleLoginButton.js
// import React from "react";
// import { GoogleLogin } from "react-google-login";

// const GoogleLoginButton = ({ onSuccess, onFailure }) => {
//   return (
//     <GoogleLogin
//       clientId="73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com"
//       buttonText="Login with Google"
//       // redirectUri="https://app.desktopcrm.com/auth/google/callback"
//       onSuccess={onSuccess}
//       onFailure={onFailure}
//       cookiePolicy={"single_host_origin"}
//     />
//   );
// };

// export default GoogleLoginButton;
// GoogleLoginButton.js
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId="73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com">
      <GoogleLogin
        theme="outline"
        shape="pill"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const decoded = jwtDecode(credentialResponse.credential);
          onSuccess(decoded);
          console.log(decoded);
        }}
        onError={(err) => {
          console.log("Login Failed", err);
        }}
        auto_select
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
