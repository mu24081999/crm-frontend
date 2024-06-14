// GoogleLoginButton.js
import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com"
      buttonText="Login with Google"
      // redirectUri="https://app.desktopcrm.com/auth/google/callback"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
// GoogleLoginButton.js
// import React from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GoogleLoginButton = ({ onSuccess, onFailure }) => {
//   return (
//     <GoogleOAuthProvider clientId="73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com">
//       <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           console.log(credentialResponse);
//         }}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;
