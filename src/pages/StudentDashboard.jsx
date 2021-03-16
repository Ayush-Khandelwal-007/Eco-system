import React from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from '../StudentComponents/Header'
import SDashboard from '../StudentComponents/SDashboard';
import Sidebar from '../StudentComponents/Sidebar'

function StudentDashboard() {
    return (
        <div>
            <Header />
            <div style={{
                height:'92vh',
                display:'flex',
                alignItems:'center',
                position:'sticky',

            }}>
                <Sidebar/>
                <Router>
                    <div style={{
                            height:'92vh',
                            overflow:'hidden',
                            display:"flex",
                            flexDirection:'column',
                            alignItems:'center',
                    }}>
                        <Switch>
                        <Route exact path="/studentDashboard">
                            {/* <Calendar/> */}<SDashboard/>
                        </Route>
                        <Route exact path="/studentDashboard/fees">
                            {/* <FeeScreem/> */}<p>"Fees"</p>
                        </Route>
                        <Route exact path="/studentDashboard/timetable">
                            {/* <Timetable/> */}<p>"Timetable"</p>
                        </Route>
                        <Route exact path="/studentDashboard/courses">
                            {/* <Courses/> */}<p>"Courses"</p>
                        </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default StudentDashboard
