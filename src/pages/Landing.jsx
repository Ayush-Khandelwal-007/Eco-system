import React from "react";
import LandingCss from "../StudentComponents/LandingComponent/Landing.module.css";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { landing } from "../images";
import { motion } from "framer-motion";

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

export default function Landing() {
  const history = useHistory();
  const goLogin = () => history.push("login");
  const goToNoticeBoard = () => history.push("NoticeBoard");

  return (
    <div className={LandingCss.main}>
      <motion.div className={LandingCss.C1}>
        <motion.img
          src={landing}
          alt="logo"
          className={LandingCss.logo}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: "0", type: "spring", stiffness: 50 }}
        />
        <motion.div className={LandingCss.C2}>
          <motion.div
            className={LandingCss.HelloTxt}
            initial={{ y: "100", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: "0", type: "spring", stiffness: 50 }}
          >
            Hello Amigos!
          </motion.div>
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: "0", type: "spring", stiffness: 50 }}
          >
            <div className={LandingCss.btns}>
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
              <LoginBtn
                variant="contained"
                color="primary"
                onClick={goToNoticeBoard}
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ delay: "0.2", type: "spring", stiffness: 50 }}
              >
                Notice board
              </LoginBtn>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
