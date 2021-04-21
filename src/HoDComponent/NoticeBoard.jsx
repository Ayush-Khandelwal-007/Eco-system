import React, { useEffect, useState } from "react";
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
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import design from "./NoticeBoardComponent/NoticeBoard.module.css";
import { db } from "../Firebase";
import { logo, crousel1, crousel2, crousel3 } from "../images";
import Carousel from "react-material-ui-carousel";

function NoticeBoard() {
  const [openNewNotice, SetOpenNewNotice] = useState(false);
  const handleCloseAddNewNoice = () => {
    SetOpenNewNotice(false);
  };

  return (
    <div className={design.main}>
      <Dialog onClose={handleCloseAddNewNoice} open={openNewNotice}>
        <DialogTitle>Add a new notice</DialogTitle>
        <DialogContent dividers>
          <input type="file" id="file" class="file" />
          <label for="file">Select file</label>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Close</Button>
          <Button color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <div className={design.heading}>
        <h1>Notice Board Management</h1>
      </div>
      <div className={design.Content}>
        <Carousel>
          <img src={crousel1} alt="" />
          <img src={crousel2} alt="" />
          <img src={crousel3} alt="" />
        </Carousel>
        <div className={design.NoticeListDiv}>
          <div className={design.AddNew}>
            <div className={design.AddNewTxt}>Add a new notice</div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => SetOpenNewNotice(true)}
            >
              <AddRoundedIcon
                style={{
                  color: "green",
                }}
              />
            </Button>
          </div>
          <Divider />
          <div className={design.NoticesList}>
            <div className={design.NoticeItem}>
              <div className={design.NoticeName}>Notice1.jpg</div>
              <Button variant="outlined" color="secondary">
                <DeleteForeverTwoToneIcon
                  style={{
                    color: "red",
                  }}
                />
              </Button>
            </div>
            <div className={design.NoticeItem}>
              <div className={design.NoticeName}>Notice1.jpg</div>
              <Button variant="outlined" color="secondary">
                <DeleteForeverTwoToneIcon
                  style={{
                    color: "red",
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoard;
