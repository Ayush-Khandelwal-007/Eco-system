import React from 'react'
import sidebar from './SidebarComponents/Sidebar.module.css'
import garbage from '../images/garbage.svg'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className={sidebar.sidebar}>
            <div className={sidebar.info}>
                <img src={garbage} alt="Profile gic" className={sidebar.profilepic}/>
                <div className={sidebar.enroll}>IIT2019240</div>
                <div className={sidebar.name}>Ayush Khandelwal</div>
                <div className={sidebar.sem}> 4th Semester</div>
            </div>
            <div className={sidebar.links}>
                <Link to='/studentDashboard'><div>Dashboard</div></Link>
                <Link to='/studentDashboard/fees'><div>Fees</div></Link>
                <Link to='/studentDashboard/timetable'><div>Timetable</div></Link>
                <Link to='/studentDashboard/courses'><div>Courses</div></Link>
            </div>
        </div>
    )
}

export default Sidebar
