import React from 'react'
import timetable from './TimeTableComponent/TimeTable.module.css'

function Timetable() {
    return (
        <iframe src="https://firebasestorage.googleapis.com/v0/b/amigo-73b2a.appspot.com/o/TimeTable.pdf?alt=media&token=6c0e099e-61f9-4fb4-81e0-f15f814e119a" className={timetable.frame}/>
    )
}

export default Timetable
