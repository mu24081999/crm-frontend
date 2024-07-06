import React, { useState } from "react";
import Boards from "./Boards";
import Members from "./Members";

const BoardList = ({
  toggleType,
  teamsData,
  boardsData,
  onDataFromChild,
  onDataViewFromChild,
  isShowTask,
}) => {
  return (
    <div className="tab-content">
      {toggleType === "board" && (
        <Boards
          boardsData={boardsData}
          onDataFromChild={onDataFromChild}
          onDataViewFromChild={onDataViewFromChild}
          isShowTask={isShowTask}
        />
      )}
      {toggleType === "team" && <Members teamsData={teamsData} />}
    </div>
  );
};

export default BoardList;
