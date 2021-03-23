import React, { useEffect, useState } from 'react'
import { db, storage } from '../Firebase';
import timetable from './hod.module.css'

function TimeTable() {
    const [inputPDF, setInputPDF] = useState(null);
    const [progress, setProgress] = useState(0);

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


    const Upload = () => {
        if (inputPDF) {
            UploadPost();
        }
    }

    const UploadPost = () => {
        const uploadTask = storage.ref(`pdf/TimeTable.pdf`).put(inputPDF)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref('pdf')
                    .child('TimeTable.pdf')
                    .getDownloadURL()
                    .then((url) => {
                        db.collection("TimeTable").add({
                            url:url
                        });
                        setProgress(0);
                        setInputPDF(null);
                    })
            }
        )
    }

    return (
        <div className={timetable.timetableMainDiv}  >
            <iframe src={ttpdf}className={timetable.frame} />
            <div className={timetable.inputDiv}>
            <progress value={progress} className="Progress_bar" max="100%" />
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files[0]) setInputPDF(e.target.files[0])
                }}
            />
            <div className={timetable.uploadButton} onClick={Upload}>Upload</div>
            </div>
        </div>
    )
}

export default TimeTable
