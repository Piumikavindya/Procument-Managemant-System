import React from "react";
import EventCalendar from "./EventCalendar";

function CalendarDiv() {
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-NeutralSilver py-16">
      <div className="flex items-center justify-center ">
        <div className="text-center"  id="events">
          <h2 className="lg:text-4xl  text-neutral-800 font-semibold mb-6 lg:leading-snug">
            Organizes events, tasks, and important dates for an entire year.
          </h2>

          <EventCalendar />
        </div>
      </div>
    </div>
  );
}

export default CalendarDiv;