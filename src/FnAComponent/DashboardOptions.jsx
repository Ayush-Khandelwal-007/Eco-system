import React from 'react';
import bell from "../images/Bell.svg";
import deadline from "../images/Deadline.svg";
import list from "../images/DefaulterList.svg";
import fee from "../images/Fee.svg";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function DashboardOptions() {
    return (
        <div>
            <img
                src={bell}
                alt="logo"
            />
            <img
                src={deadline}
                alt="logo"
            />
            <img
                src={list}
                alt="logo"
            />
            <img
                src={fee}
                alt="logo"
            />
        </div>
    )
}
