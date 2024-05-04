import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar className=" " onChange={onChange} value={value} />
    </div>
  );
};
export default ReactCalendar;
