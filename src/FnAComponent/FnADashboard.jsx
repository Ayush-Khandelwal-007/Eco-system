import React from 'react';
import FnADesign from './FnADashboard.module.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DashboardOptions from './DashboardOptions';


const LogoutBtn = withStyles(() => ({
    root: {
      width: "180px",
      height: "45px",
      color: "#000000",
      background: "#F2994A",
      borderRadius: "10px",
      letterSpacing: "1.25px",
      '&:hover': {
        backgroundColor: "#FCA353",
      },
    },
  }))(Button);

export default function FnADashboard() {
    const history = useHistory();
    const goLogout = () => history.push('login');

    return (
        <div className={FnADesign.main}>
            <div className={FnADesign.Nav}>
                <div className={FnADesign.HeadingTxt}>
                    WELCOME TO FEE AND ADMINISTRATION
                </div>
                <LogoutBtn variant="contained" color="primary" onClick={goLogout} >
                    Logout
                </LogoutBtn>
            </div>
            <div className={FnADesign.DasboardOptions}>
                <DashboardOptions />
            </div>
        </div>
    )
}
