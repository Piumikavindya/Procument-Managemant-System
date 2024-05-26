import React, { useState, useContext, useEffect } from "react";
import "../../../Calendar.css";
import { getMonth } from "../../../util";
import CalendarHeader from '../../../components/CalendarHeader';
import Sidebar from "../../../components/Sidebar";
import Month from "../../../components/Month";
import GlobalContext from "../../../context/GlobalContext";
import EventModal from "../../../components/EventModal";
import { Breadcrumb } from "flowbite-react";
function EventPlanner() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
         <Breadcrumb
        crumbs={[
          { label: "Home", link: "/adminhome/:id" },
          { label: "Event Planner", link: "/EventPlanner" },
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      {showEventModal && <EventModal />}
   
      <div className="h-screen flex flex-col mt-20">
        <CalendarHeader />
        <div className="flex flex-1" style={{ filter: showEventModal ? 'blur(5px)' : 'none' }}>
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventPlanner;
