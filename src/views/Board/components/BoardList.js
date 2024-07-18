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
  boardsLoading,
}) => {
  return (
    <div className="tab-content">
      {toggleType === "board" && (
        <Boards
          boardsData={boardsData}
          onDataFromChild={onDataFromChild}
          onDataViewFromChild={onDataViewFromChild}
          isShowTask={isShowTask}
          boardsLoading={boardsLoading}
        />
      )}
      {toggleType === "team" && <Members teamsData={teamsData} />}
    </div>
  );
};

export default BoardList;
