import React from "react";
import {
  CalendarBody,
  CalendarHead,
  HeadDay,
  PortalWrapper,
  SavenColGrid,
  StyleDay,
  StyledEvent,
  Wrapper,
} from "./CalendarStyled";
import { DAYS, MONTHS } from "./CalendarConst";
import {
  areDateTheSame,
  getDateObj,
  getDaysInMonth,
  getRandomDarkColor,
  getSortDays,
  range,
  
} from "./CalendarUtils";
import { useState } from "react";
// import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useRef } from "react";

const Calendar = ({ startingDate, eventsArr, addEvent, onDragEvents, setEvents }) => {
  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
  const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear);

  const draggedElDateRef = useRef();
  const draggedElIRef = useRef();
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({})

  const onDragStart = (id) => {
    draggedElIRef.current = id;
  };

  const onDragEnter = (e, date) =>{
    e.preventDefault();
    draggedElDateRef.current = date;
  };

  const onDragEnd = (e) =>{
    e.preventDefault();

    const updateEvents = eventsArr.map((event) => {
      if(event.id === draggedElIRef.current){
        event.date = draggedElDateRef.current
      }
      return event
    })

    onDragEvents(updateEvents)
  };

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const onAddEvent = (date, e) => {
    if(e.currentTarget === e.target){
      addEvent(date, getRandomDarkColor());
    }
    
  };

  const handleOnClickEvent = (event) =>{
    setShowPortal(true);
    setPortalData(event);
  };

  const handlePortalClose = () => setShowPortal(false);

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => ev.id !== portalData.id)
    );
    handlePortalClose();
  };

  return (
    <Wrapper>
    
      <CalendarHead>
      
        <ion-icon
          onClick={prevMonth}
          name="arrow-back-circle-outline"
        ></ion-icon>
        <p style={{color:"white"}}>
          {MONTHS[currentMonth]} {currentYear}
        </p>
        <ion-icon
          onClick={nextMonth}
          name="arrow-forward-circle-outline"
        ></ion-icon>
      </CalendarHead>
      <SavenColGrid>
        {getSortDays(currentMonth, currentYear).map((day) => (
          <HeadDay key={day} >{day}</HeadDay>
        ))}
      </SavenColGrid>
      <CalendarBody fourCol={DAYSINMONTH === 28}>
        {range(DAYSINMONTH).map((day) => (
          <StyleDay
            key={day} // Add a unique key prop

            onDragEnter={(e) =>
              onDragEnter(e, getDateObj(day, currentMonth, currentYear))
            }

            onDragEnd={onDragEnd}

            onClick={(e) =>
              onAddEvent(getDateObj(day, currentMonth, currentYear),e)
            }
            onDragOver={(e) => e.preventDefault()}
            active={areDateTheSame(
              new Date(),
              getDateObj(day, currentMonth, currentYear)
            )}
          >
            <p style={{color:"black"}}>{day}</p>

            {eventsArr.map(
              (ev) =>
                areDateTheSame(
                  getDateObj(day, currentMonth, currentYear),
                  ev.date
                ) && (
                  <StyledEvent
                    key={ev.id}
                    onDragStart={() => onDragStart(ev.id)}
                    onClick={ () => handleOnClickEvent(ev)}
                    draggable
                    bgColor={ev?.color}
                  >
                    {ev.title}
                  </StyledEvent>
                )
            )}
          </StyleDay>
        ))}
        
      </CalendarBody>
      {showPortal && <Portal {...portalData} handleDelete={handleDelete} handlePortalClose={handlePortalClose}/> }
    </Wrapper>
    
  );
};

const Portal =({title,date, handleDelete,handlePortalClose}) =>{
  return(
    <PortalWrapper>
      <h2>{title}</h2>
      <p>{date.toDateString()}</p>
      <ion-icon
      onClick={handleDelete }
          name="trash-outline"
        ></ion-icon>
        <ion-icon
      onClick={handlePortalClose }
          name="close-circle-outline"
        ></ion-icon>
    </PortalWrapper>
  );
};

export default Calendar;
