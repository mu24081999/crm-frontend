// import { useEpg, Epg, Layout } from "planby";

// import React from "react";

// const Calender = () => {
//   const channels = React.useMemo(
//     () => [
//       {
//         logo: "https://via.placeholder.com",
//         uuid: "10339a4b-7c48-40ab-abad-f3bcaf95d9fa",
//       },
//     ],
//     []
//   );

//   const epg = React.useMemo(
//     () => [
//       {
//         channelUuid: "30f5ff1c-1346-480a-8047-a999dd908c1e",
//         description: "Ut anim nisi consequat minim deserunt...",
//         id: "b67ccaa3-3dd2-4121-8256-33dbddc7f0e6",
//         image: "https://via.placeholder.com",
//         since: "2022-02-02T23:50:00",
//         till: "2022-02-02T00:55:00",
//         title: "Title",
//       },
//     ],
//     []
//   );

//   const {
//     getEpgProps,
//     getLayoutProps,
//     onScrollToNow,
//     onScrollLeft,
//     onScrollRight,
//   } = useEpg({
//     epg,
//     channels,
//     startDate: "2022-02-02T10:00:00",
//     endDate: "2022-02-02T20:00:00",
//   });
//   return (
//     <div className="" style={{ margin: "500px" }}>
//       <div
//         style={{ height: "600px", width: "1200px", backgroundColor: "white" }}
//       >
//         <Epg {...getEpgProps()}>
//           <Layout {...getLayoutProps()} />
//         </Epg>
//       </div>
//     </div>
//   );
// };

// export default Calender;
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

// export default function Calendar() {
//   return (
//     <div style={{ margin: "500px" }}>
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         weekends={true}
//         events={[
//           { title: "event 1", date: "2024-03-04" },
//           { title: "event 2", date: "2024-04-05" },
//         ]}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { getEventDetails } from "../../redux/services/calendar_event";
import Loader from "../Loader/Loader";
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T00:00:00",
//     end: todayStr + "T01:00:00",
//   },
// ];

function createEventId() {
  return String(eventGuid++);
}

export default function Calendar({
  INITIAL_EVENTS,
  isLoading,
  onDataFromChild,
  dispatch,
  token,
}) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const [currentEvents, setCurrentEvents] = useState(INITIAL_EVENTS);
  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
    dispatch(getEventDetails(token, clickInfo.event.id));
    onDataFromChild("0px");
  }

  function handleEvents(events) {
    console.log("🚀 ~ handleEvents ~ events:", INITIAL_EVENTS);
    setCurrentEvents(INITIAL_EVENTS);
    console.log("🚀 ~ handleEvents ~ events:", currentEvents);
  }
  function renderEventContent(eventInfo) {
    console.log(
      "🚀 ~ renderEventContent ~ eventInfo:",
      eventInfo.event.backgroundColor
    );
    return (
      <div
        className="fc-event-title d-flex rounded-3 gap-2 p-1"
        style={{
          backgroundColor: eventInfo.event.backgroundColor,
          color: "black",
        }}
      >
        {eventInfo.timeText}
        <br />
        <strong>{eventInfo.event.title}</strong>
      </div>
    );
  }

  return (
    <div className="w-100">
      {/* <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      /> */}
      <div className="demo-app-main">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                // "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listMonth,listDay",
                "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // eventClassNames={(arg) => "bg-primary"} // Dynamically add CSS class to the event based on its ID
            renderEventContent={renderEventContent}
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        )}
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
