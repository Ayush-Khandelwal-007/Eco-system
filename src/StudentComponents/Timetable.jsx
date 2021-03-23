import React, { useEffect, useState } from 'react'
import { storage } from '../Firebase';
import timetable from './TimeTableComponent/TimeTable.module.css'

function Timetable() {
    const [ttpdf, setttpdf] = useState(null);
    useEffect(() => {
        storage
            .ref('pdf')
            .child('TimeTable.pdf')
            .getDownloadURL()
            .then((url) => {
                setttpdf(url)
            })

    }, [])
    return (
        <iframe src={ttpdf}className={timetable.frame} />
    )
}

export default Timetable
