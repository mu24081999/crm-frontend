import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const GoogleAuth = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  console.log("🚀 ~ useEffect ~ queryParams:", queryParams);
  useEffect(() => {
    // Parse query parameters
    const queryParams = queryString.parse(location.search);
    // Send the data to the backend
    const sendDataToBackend = async () => {
      try {
        const response = await fetch(
          `https://desktopcrm.com:51/v1/auth/google/callback?code=${queryParams.code}&scope=${queryParams.scope}&`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(queryParams),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Handle successful authentication, e.g., redirect to the profile page
          console.log("Authentication successful", data);
          // Redirect or handle authenticated user data
        } else {
          // Handle authentication errors
          console.error("Authentication failed", data);
        }
      } catch (error) {
        console.error("Error during authentication", error);
      }
    };

    sendDataToBackend();
  }, [location.search]);

  return <div>GoogleAuth Loading...</div>;
};

export default GoogleAuth;
