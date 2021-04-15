import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { db } from "../Firebase";

function Calendar() {
  const [events, setevents] = useState([]);

  useEffect(() => {
    db.collection("calendar").onSnapshot((snapshot) => {
      setevents(snapshot.docs.map((doc) => doc.data()));
      //{ title: 'event 1', start: '2021-03-17' ,end: '2021-03-19' , display: 'block'} format of event
    });
  }, [db]);

  return (
    <div
      style={{
        width: "100%",
        background: "#835712",
        color: "white",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "prev,next today",
          left: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventDisplay="block"
        height={500}
        selectable={true}
        dateClick={(info) => {
          console.log(info);
        }}
        // weekends={this.state.weekendsVisible}
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // select={this.handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        // eventClick={function(info) {
        //   info.jsEvent.preventDefault(); // don't let the browser navigate
        //   console.log(info.event)
        // }}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
    </div>
  );
}

export default Calendar;
