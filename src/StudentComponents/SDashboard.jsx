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

function SDashboard() {

    const [events, setevents] = useState(null)

  useEffect(() => {
    db.collection('calendar').onSnapshot(snapshot => {
      setevents(snapshot.docs.map((doc) => doc.data()))
    //{ title: 'event 1', start: '2021-03-17' ,end: '2021-03-19' , display: 'background'} format of event
    })
  }, [db])

    return (
        <div className={sDashboard.sDashboard}>
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
            <div className={sDashboard.calendarDiv}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                events={events}
                height={780}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                dateClick={(info)=>{
                    console.log(info);
                }}
                customButtons={{
                    addEventButton: {
                        text: 'add event...',
                        click: function() {
                          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                          var date = new Date(dateStr + 'T00:00:00'); // will be in local time
                
                          if (!isNaN(date.valueOf())) { // valid?
                            // calendar.addEvent({
                            //   title: 'dynamic event',
                            //   start: date,
                            //   allDay: true
                            // });
                            alert('Great. Now, update your database...');
                          } else {
                            alert('Invalid date.');
                          }
                        }
                      }
                }}
                // weekends={this.state.weekendsVisible}
                // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                // select={this.handleDateSelect}
                // eventContent={renderEventContent} // custom render function
                // eventClick={this.handleEventClick}
                // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
            </div>
        </div>
    )
}

export default SDashboard
