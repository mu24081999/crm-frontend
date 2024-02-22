import React, { useState } from "react";
import Boards from "./Boards";
import Members from "./Members";

const BoardList = ({ toggleType, teamsData, boardsData }) => {
  return (
    <div className="tab-content">
      {toggleType === "board" && <Boards boardsData={boardsData} />}
      {toggleType === "team" && <Members teamsData={teamsData} />}
    </div>
  );
};

export default BoardList;
