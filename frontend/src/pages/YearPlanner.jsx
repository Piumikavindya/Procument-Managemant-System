import { useState } from "react";
import Calendar from "../components/EventCalendar";
import { MOCKEVENTS } from "../components/CalendarConst";

function YearPlanner() {
  const [count, setCount] = useState(0);

  const [events, setEvents] = useState(MOCKEVENTS);

  const addEvent = (date,color) => {
    const text = window.prompt("Add Event :");
    setEvents((prev) => [...prev, {date, title:text, color, id:Math.random()}]);
  };

  const onDragEvents = (updateEvents) => {
    setEvents(updateEvents);
  }
  return (
    <div className="App">
      <Calendar
       startingDate={new Date()} 
       eventsArr={events} 
       addEvent={addEvent}
       onDragEvents={onDragEvents}
       setEvents={setEvents}
       />
    </div>
  );
}

export default YearPlanner;
