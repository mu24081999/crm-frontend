import React from "react";
import { useParams } from "react-router-dom";

const GoogleAuth = () => {
  const params = useParams();
  console.log("🚀 ~ GoogleAuth ~ params:", params);

  return <div>GoogleAuth Loading...</div>;
};

export default GoogleAuth;
