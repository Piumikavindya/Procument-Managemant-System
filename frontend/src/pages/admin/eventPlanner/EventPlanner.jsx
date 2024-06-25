import React, { useState, useContext, useEffect } from "react";
import "../../../Calendar.css";
import { getMonth } from "../../../util";
import CalendarHeader from "../../../components/CalendarHeader";
import Sidebar from "../../../components/Sidebar";
import Month from "../../../components/Month";
import GlobalContext from "../../../context/GlobalContext";
import EventModal from "../../../components/EventModal";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import { useParams } from "react-router-dom";
function EventPlanner() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
 const {id} =useParams();
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div>
      <Breadcrumb
        crumbs={[
          { label: "Home", link: `/adminhome/${id}` },
          { label: "Event Planner", link: `/EventPlanner/${id}`},
        ]}
        selected={(crumb) => console.log(`Selected: ${crumb.label}`)}
      />
      <React.Fragment>
        {showEventModal && <EventModal />}

        <div className="h-screen flex flex-col mt-0">
          <CalendarHeader />
          <div
            className="flex flex-1"
            style={{ filter: showEventModal ? "blur(5px)" : "none" }}
          >
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default EventPlanner;
