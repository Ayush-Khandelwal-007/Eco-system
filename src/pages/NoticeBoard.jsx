import React from "react";
import design from "../StudentComponents/NoticeBoardComponent/NoticeBoard.module.css";
import { logo } from "../images";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

var items = [
  {
    name: "Notice #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    name: "Notice #2",
    description: "Hello World!",
  },
];

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
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
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

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  );
}

export default NoticeBoard;
