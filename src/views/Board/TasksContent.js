import React, { useContext, useEffect, useMemo, useState } from "react";
import TaskHeader from "./components/TaskHeader";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { updateContactRec } from "../../redux/services/contact";
import moment from "moment";
import { MdAlternateEmail, MdOutlineSms } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import Loader from "../../components/Loader/Loader";
import "./kanban.css";
const initialItems = {
  pending: [
    { id: "1", content: "First task" },
    { id: "2", content: "Second task" },
  ],
  inProgress: [
    { id: "3", content: "Third task" },
    { id: "4", content: "Fourth task" },
  ],
  completed: [
    { id: "5", content: "Fifth task" },
    { id: "6", content: "Sixth task" },
  ],
  paused: [
    { id: "7", content: "Fifth task" },
    { id: "8", content: "Sixth task" },
  ],
  cancelled: [
    { id: "9", content: "Fifth task" },
    { id: "10", content: "Sixth task" },
  ],
  new: [
    { id: "11", content: "Fifth task" },
    { id: "12", content: "Sixth task" },
  ],
};
const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
};
const SortableItem = ({ id, content, containerId, barColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-container-id={containerId}
    >
      {/* {content} */}
      <div className="card  tasklist-card">
        {/* <div className="card-header card-header-action bg-primary ">
        </div> */}

        <div className="">
          <h6
            className="fw-bold text-dark pt-2 ps-3 rounded-4"
            style={{ borderTop: `3px solid ${barColor}` }}
          >
            {content?.firstname}({content?.phone})
          </h6>
          <div>{content?.bio?.slice(0, 150)}</div>
        </div>
        <div className="card-footer text-muted justify-content-between">
          <div>
            <span className="task-counter">
              <span>
                <MdAlternateEmail />
              </span>
              {/* <span>23</span> */}
            </span>
            <span className="task-discuss">
              <span>
                <MdOutlineSms />
              </span>
              {/* <span>24</span> */}
            </span>
            <span className="task-discuss">
              <span>
                <IoCallOutline />
              </span>
              {/* <span>24</span> */}
            </span>
          </div>
          <div>
            <span className="task-deadline">
              {moment(Date.now()).format("DD MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropZone = ({ containerId }) => {
  return (
    <div
      style={{
        minHeight: "50px",
        border: "2px dashed lightgrey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      data-container-id={containerId}
    >
      Drop here
    </div>
  );
};
const Column = ({ id, items, boardDetails }) => {
  console.log("🚀 ~ Column ~ id:", id);
  const [color, setColor] = useState(null);
  const statusArray =
    boardDetails?.pipeline_status_array &&
    JSON.parse(boardDetails?.pipeline_status_array)?.status_array;
  const status =
    statusArray?.length > 0 &&
    statusArray?.filter((status) => status.stage === id)[0];
  function getRandomColorFromList(colorList) {
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  }

  useMemo(() => {
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "orange",
      "purple",
      "pink",
      "teal",
    ];
    const randomColor = getRandomColorFromList(colors);
    setColor(randomColor);
  }, []);
  return (
    <div className="col-md-3">
      <div
        className="card shadow mb-5"
        style={{ borderTop: `5px solid ${status?.color}` }}
      >
        <div className="card-body">
          <h5 className="text-center">{id}</h5>
        </div>
      </div>
      <div
        style={
          {
            // minHeight: "150px",
            // maxHeight: "100%",
            // overflow: "scroll",
            // scrollBehavior: "smooth",
          }
        }
      >
        <Droppable id={id}>
          <SortableContext
            items={items?.map((item) => item.id) || []}
            strategy={verticalListSortingStrategy}
            id={id}
          >
            {items?.map((item) => (
              <SortableItem
                key={item?.id}
                id={item?.id}
                content={item}
                containerId={id}
                barColor={status?.color}
              />
            ))}
            {/* {items.length === 0 && <DropZone id={id} />} */}
          </SortableContext>
        </Droppable>
      </div>
    </div>
  );
};

const TasksContent = ({
  token,
  contactsData,
  boardDetails,
  boardsData,
  onDataViewFromChild,
  isShowTask,
  tasksLoading,
}) => {
  const [items, setItems] = useState(initialItems);
  const [data, setData] = useState({});
  const [contacts, setContacts] = useState(contactsData);
  const dispatch = useDispatch();

  useEffect(() => {
    const contactsFilterArray = contactsData?.filter(
      (contact) => contact?.board_id === boardDetails?.id
    );
    setContacts(contactsFilterArray);
  }, [contactsData, boardDetails]);
  useEffect(() => {
    var dataObj = {};
    const statusArray =
      boardDetails?.pipeline_status_array &&
      JSON.parse(boardDetails?.pipeline_status_array)?.status_array;
    statusArray?.length > 0 &&
      statusArray?.map((status) => {
        dataObj[status?.stage] =
          contacts?.filter(
            (contact) => contact?.board_status === status?.stage
          ) || [];
      });
    setData(dataObj);
  }, [boardDetails, contacts]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const source = active.data.current.sortable.containerId;
    const destination = over.data.current?.sortable?.containerId || over.id;
    if (source === destination) {
      setData((data) => {
        const updatedItems = {
          ...data,
          [source]: arrayMove(
            data[source],
            data[source]?.findIndex((item) => item.id === active.id),
            data[source]?.findIndex((item) => item.id === over.id)
          ),
        };
        return updatedItems;
      });
    } else {
      setData((data) => {
        const sourceItems = [...data[source]];
        const destinationItems = [...data[destination]];

        const [movedItem] = sourceItems.splice(
          sourceItems?.findIndex((item) => item.id === active.id),
          1
        );

        destinationItems.splice(
          destinationItems?.findIndex((item) => item.id === over.id),
          0,
          movedItem
        );

        return {
          ...data,
          [source]: sourceItems,
          [destination]: destinationItems,
        };
      });

      dispatch(
        updateContactRec(token, active.id, { board_status: destination })
      );
    }
  };

  return (
    <div>
      <TaskHeader
        boardsData={boardsData}
        onDataViewFromChild={onDataViewFromChild}
        isShowTask={isShowTask}
      />
      <div
        className="taskboard-body"
        style={{ height: "100vh", backgroundColor: "rgb(135 206 235 / 13%)" }}
      >
        {tasksLoading ? (
          <div className="w-100">
            <Loader />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div
              className="d-flex gap-5 p-3 card-body"
              style={{
                overflow: "scroll",
                scrollBehavior: "smooth",
                flexDirection: "row",
                maxHeight: "750px",
              }}
            >
              {Object.keys(data)?.length > 0 &&
                Object.keys(data)?.map((columnId) => {
                  return (
                    <Column
                      key={columnId}
                      id={columnId}
                      items={data[columnId]}
                      boardDetails={boardDetails}
                    />
                  );
                })}
            </div>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default TasksContent;
