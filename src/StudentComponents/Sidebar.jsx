import { Avatar } from '@material-ui/core'
import React from 'react'
import sidebar from './SidebarComponents/Sidebar.module.css'

function Sidebar() {
    return (
        <div className={sidebar.sidebar}>
            <div className={sidebar.info}>
                <Avatar />
                <div className={sidebar.name}>IIT2019240</div>
                <div>Ayush Khandelwal</div>
                <div> 4th Semester</div>
            </div>
            <div className={sidebar.links}>
                <div>Dashboard</div>
                <div>Fees</div>
                <div>Timetable</div>
                <div>Courses</div>
            </div>
        </div>
    )
}

export default Sidebar
