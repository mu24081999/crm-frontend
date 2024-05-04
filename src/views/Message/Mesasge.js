import React from "react";
import Layout from "../layout/Layout";
import MessageContent from "./MessageContent";

const Mesasge = () => {
  return (
    <div>
      <Layout component={<MessageContent />} />
    </div>
  );
};

export default Mesasge;
