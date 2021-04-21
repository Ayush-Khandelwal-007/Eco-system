import React from "react";
import design from "../StudentComponents/NoticeBoardComponent/NoticeBoard.module.css";
import { logo, crousel1, crousel2, crousel3 } from "../images";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const LoginBtn = withStyles(() => ({
  root: {
    width: "20vw",
    minWidth: "200px",
    maxWidth: "250px",
    height: "50px",
    color: "#fff",
    borderRadius: "10px",
    backgroundColor: "rgba(7, 13, 89, 0.9)",
    letterSpacing: "1.25px",
    "&:hover": {
      backgroundColor: "#070D59",
    },
  },
}))(Button);

function NoticeBoard() {
  const history = useHistory();
  const goLogin = () => history.push("login");

  return (
    <div className={design.main}>
      <img src={logo} alt="" />
      <Carousel>
        <img src={crousel1} alt="" />
        <img src={crousel2} alt="" />
        <img src={crousel3} alt="" />
      </Carousel>
      <LoginBtn
        style={{ background: "#27AE60" }}
        variant="contained"
        color="primary"
        onClick={goLogin}
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ delay: "0.2", type: "spring", stiffness: 50 }}
      >
        Login
      </LoginBtn>
    </div>
  );
}

export default NoticeBoard;
