import {
  UncontrolledBoard,
  KanbanBoard,
  ControlledBoard,
} from "@caldwell619/react-kanban";
// import { ControlledBoard } from '@caldwell619/react-kanban'
import "@caldwell619/react-kanban/dist/styles.css"; // import here for "builtin" styles

import React from "react";

const Kanban = () => {
  const board = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "Add card",
            description: "Add capability to add a card in a column",
          },
        ],
      },
      {
        id: 2,
        title: "Pending",
        cards: [
          {
            id: 2,
            title: "Add card",
            description: "Add capability to add a card in a column",
          },
        ],
      },
      {
        id: 3,
        title: "In-Progress",
        cards: [
          {
            id: 3,
            title: "Add card",
            description: "Add capability to add a card in a column",
          },
        ],
      },
      {
        id: 4,
        title: "Completed",
        cards: [
          {
            id: 4,
            title: "Add card",
            description: "Add capability to add a card in a column",
          },
        ],
      },
    ],
  };
  return (
    <UncontrolledBoard
      initialBoard={board}
      onCardDragEnd={(data) => console.log(data)}
    />
  );
};

export default Kanban;
