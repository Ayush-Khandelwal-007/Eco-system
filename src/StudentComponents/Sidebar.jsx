import React from 'react'
import sidebar from './SidebarComponents/Sidebar.module.css'
import garbage from '../images/garbage.svg'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'

function Sidebar() {
    const location = useLocation();
    return (
        <div className={sidebar.sidebar}>
            <div className={sidebar.info}>
                <img src={garbage} alt="Profile gic" className={sidebar.profilepic}/>
                <div className={sidebar.enroll}>IIT2019240</div>
                <div className={sidebar.name}>Ayush Khandelwal</div>
                <div className={sidebar.sem}> 4th Semester</div>
            </div>
            <div className={sidebar.links}>
                <Link to='/studentDashboard'><Button className={location.pathname==='/studentDashboard' ? (sidebar.active):null}>Dashboard</Button></Link>
                <Link to='/studentDashboard/fees'><Button className={location.pathname==='/studentDashboard/fees' ? (sidebar.active):null}>Fees</Button></Link>
                <Link to='/studentDashboard/timetable'><Button className={location.pathname==='/studentDashboard/timetable' ? (sidebar.active):null}>Timetable</Button></Link>
                <Link to='/studentDashboard/courses'><Button className={location.pathname==='/studentDashboard/courses' ? (sidebar.active):null}>Courses</Button></Link>
            </div>
        </div>
    )
}

export default Sidebar
