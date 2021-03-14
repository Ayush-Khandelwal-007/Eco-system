import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from '../StudentComponents/Header'
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
                            alignItems:'center',
                            justifyContent:'flex-start'
                    }}>
                        <Switch>
                        <Route exact path="/studentDashboard">
                            {/* <Calendar/> */}
                        </Route>
                        <Route exact path="/studentDashboard/fees">
                            {/* <FeeScreem/> */}
                        </Route>
                        <Route exact path="/studentDashboard/timetable">
                            {/* <Timetable/> */}
                        </Route>
                        <Route exact path="/studentDashboard/courses">
                            {/* <Courses/> */}
                        </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default StudentDashboard
