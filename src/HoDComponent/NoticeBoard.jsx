import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import design from "./NoticeBoardComponent/NoticeBoard.module.css";
import { db } from "../Firebase";
import { logo, crousel1, crousel2, crousel3 } from "../images";
import Carousel from "react-material-ui-carousel";

function NoticeBoard() {
  return (
    <div className={design.main}>
      <div className={design.heading}>
        <h1>Notice Board Management</h1>
      </div>
      <div className={design.Content}>
        <Carousel>
          <img src={crousel1} alt="" />
          <img src={crousel2} alt="" />
          <img src={crousel3} alt="" />
        </Carousel>
        <div className={design.NoticeList}></div>
      </div>
    </div>
  );
}

export default NoticeBoard;
