import React from 'react'
import sDashboard from './SDashboardComponents/SDashboard.module.css'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import carimage1 from '../images/clg1.jpg'
import carimage2 from '../images/clg2.jpg'
import carimage3 from '../images/clg4.jpg'
import carimage4 from '../images/clg5.jpg'

function SDashboard() {
    const localizer = momentLocalizer(moment)
    // Event {
    //     title: string,
    //     start: Date,
    //     end: Date,
    //     allDay?: boolean
    //     resource?: any,
    //   }
    return (
        <div className={sDashboard.sDashboard}>
            <div className={sDashboard.carouselDiv}>
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
            </div>
            <div className={sDashboard.calendarDiv}>
            {/* <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                /> */}
            </div>
        </div>
    )
}

export default SDashboard
