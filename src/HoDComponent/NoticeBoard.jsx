import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import design from "./NoticeBoardComponent/NoticeBoard.module.css";
import { db } from "../Firebase";
import { logo, crousel1, crousel2, crousel3 } from "../images";
import Carousel from "react-material-ui-carousel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function NoticeBoard() {
  const [openNewNotice, SetOpenNewNotice] = useState(false);
  const handleCloseAddNewNoice = () => {
    SetOpenNewNotice(false);
  };

  const [openDelete, SetOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    SetOpenDelete(false);
  };

  return (
    <div className={design.main}>
      {/* Add new Notice Dailog */}
      <Dialog onClose={handleCloseAddNewNoice} open={openNewNotice}>
        <DialogTitle>Add a new notice</DialogTitle>
        <DialogContent dividers>
          <input type="file" id="file" class="file" />
          <label for="file">Select file</label>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              SetOpenNewNotice(false);
            }}
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={() => {
              SetOpenNewNotice(false);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete dailog */}
      <Dialog onClose={handleCloseDelete} open={openDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure, you want to delete this notice?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              SetOpenDelete(false);
            }}
          >
            No
          </Button>
          <Button
            color="primary"
            onClick={() => {
              SetOpenDelete(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className={design.heading}>
        <h1>Notice Board Management</h1>
      </div>
      <div className={design.Content}>
        <Carousel>
          <div className={design.CrouselItem}>
            <img src={crousel1} alt="" />
          </div>
          <div className={design.CrouselItem}>
            <img src={crousel2} alt="" />
          </div>
          <div className={design.CrouselItem}>
            <img src={crousel3} alt="" />
          </div>
        </Carousel>
        <div className={design.NoticeListDiv}>
          <div className={design.AddNew}>
            <div className={design.AddNewTxt}>ADD A NOTICE</div>
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  SetOpenDelete(true);
                }}
              >
                <DeleteForeverTwoToneIcon
                  style={{
                    color: "red",
                  }}
                />
              </Button>
            </div>
            <div className={design.NoticeItem}>
              <div className={design.NoticeName}>Notice1.jpg</div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  SetOpenDelete(true);
                }}
              >
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
