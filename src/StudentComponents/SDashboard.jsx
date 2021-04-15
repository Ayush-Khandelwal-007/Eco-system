import React, { useEffect, useState } from 'react'
import sDashboard from './SDashboardComponents/SDashboard.module.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import carimage1 from '../images/clg1.jpg'
import carimage2 from '../images/clg2.jpg'
import carimage3 from '../images/clg4.jpg'
import carimage4 from '../images/clg5.jpg'
import { db } from '../Firebase'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useUser } from '../contexts/User'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SDashboard() {
  const [state, dispatch] = useUser();

  const [events, setevents] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    var email=state.user.email;
    db.collection("Students").doc(email).update({
      alert:false,
    })
    try{

      var docRef = db.collection("Students").doc(email);

      docRef.get().then((doc) => {
        if (doc.exists) {
            dispatch({
              type: "SET_USER",
              user: { ...doc.data() },
              userType: state.userType,
            });
  
            localStorage.setItem("user", JSON.stringify(doc.data()));
        } else {
          console.log(doc.data());
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  } catch(error){
      console.log(error);
  }
  localStorage.setItem('user', JSON.stringify(state.user));
    setOpenAlert(false);
  };

  useEffect(() => {
    if(state.user.alert===true){
      setOpenAlert(true)
    }
  }, [state])

  useEffect(() => {
    db.collection('calendar').onSnapshot(snapshot => {
      setevents(snapshot.docs.map((doc) => doc.data()))
      //{ title: 'event 1', start: '2021-03-17' ,end: '2021-03-19' , display: 'block'} format of event
    })
  }, [db])

  return (
    <div className={sDashboard.sDashboard}>
      <div className={sDashboard.calendarDiv}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            right: 'prev,next today',
            left: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventDisplay='block'
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
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          This Alert is to remind that your fees is not paid yet.
        </Alert>
      </Snackbar>
      {/* <div className={sDashboard.carouselDiv}>
                <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
                    <div>
                        <img src={carimage1} />
                    </div>
                    <div>
                        <img src={carimage2} />
                    </div>
                    <div>
                        <img src={carimage3} />
                    </div>
                    <div>
                        <img src={carimage4} />
                    </div>
                </Carousel>
            </div> */}
    </div>
  )
}

export default SDashboard
