import React from "react";
import Layout from "../layout/Layout";
import CalenderContent from "./CalenderContent";

const Board = () => {
  return (
    <div>
      <Layout component={<CalenderContent />} />
    </div>
  );
};

export default Board;
