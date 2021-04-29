import React, { useEffect, useState } from "react";
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
import { db, storage } from "../Firebase";
import Carousel from "react-material-ui-carousel";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import renderHTML from "react-render-html";
import { Box, Input, TextareaAutosize } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="70%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

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
  const [uploadType, setUploadType] = useState("html");
  const [topic, setTopic] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  const [noticies, setNoticies] = useState([]);
  const [selectedForDelete, setSelectedForDelete] = useState("");

  const handleCloseAddNewNoice = () => {
    SetOpenNewNotice(false);
  };

  const [openDelete, SetOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    SetOpenDelete(false);
  };

  const upload = () => {
    if ((file || !(htmlText === "")) && topic !== "") {
      AddToNoticeBoard();
    }
  };

  const DeleteNotice = (id) => {
    db.collection("noticeBoard")
      .doc(id)
      .delete()
      .then(() => {
        SetOpenDelete(false);
      });
  };

  const AddToNoticeBoard = () => {
    if (uploadType === "html") {
      db.collection("noticeBoard").add({
        type: uploadType,
        topic: topic,
        file: htmlText,
      });
      setTopic("");
      setHtmlText("");
      SetOpenNewNotice(false);
    } else {
      const uploadTask = storage.ref(`noticeBoard/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("noticeBoard")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("noticeBoard").add({
                type: uploadType,
                topic: topic,
                file: url,
              });
              setProgress(0);
              setFile(null);
              setTopic("");
              SetOpenNewNotice(false);
            });
        }
      );
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      let reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    var unsubscribe = db
      .collection("noticeBoard")
      .onSnapshot((querySnapshot) => {
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setNoticies(list);
      });
    return unsubscribe;
  }, [db]);

  return (
    <div className={design.main}>
      {/* Add new Notice Dailog */}
      <Dialog onClose={handleCloseAddNewNoice} open={openNewNotice}>
        <DialogTitle>Add a new notice</DialogTitle>
        <DialogContent dividers>
          <div className={design.dialogDiv}>
            <div className={design.selectUploadType}>
              <div
                onClick={() => setUploadType("html")}
                className={uploadType === "html" ? design.active : null}
              >
                HTML
              </div>
              <div
                onClick={() => setUploadType("image")}
                className={uploadType === "image" ? design.active : null}
              >
                IMAGE
              </div>
            </div>
            <div className={design.inputBox}>
              {uploadType === "image" ? (
                <div>
                  <label htmlFor="Topic">
                    Add a topic:
                    <Input
                      type="text"
                      id="Topic"
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                      }}
                    />
                  </label>
                  <label htmlFor="file">
                    Select the Image:
                    <Input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={(e) => onImageChange(e)}
                    />
                  </label>
                  <label>
                    Preview:
                    <div>
                      <img id="target" src={preview} />
                    </div>
                  </label>
                  <LinearProgressWithLabel value={progress} />
                </div>
              ) : (
                <div>
                  <label htmlFor="Topic">
                    Add a topic:
                    <Input
                      type="text"
                      id="Topic"
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                      }}
                    />
                  </label>
                  <label>
                    Paste the HTML file below
                    <TextareaAutosize
                      aria-label="minimum height"
                      placeholder="Enter HTML text"
                      type="text"
                      id="file"
                      value={htmlText}
                      onChange={(e) => {
                        setHtmlText(e.target.value);
                      }}
                    />
                  </label>
                  <label>
                    Preview:
                    <div>{renderHTML(htmlText)}</div>
                  </label>
                </div>
              )}
            </div>
          </div>
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
              upload();
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
              DeleteNotice(selectedForDelete);
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
          {noticies.map((notice) => {
            return notice.type === "image" ? (
              <div key={notice.id} className={design.CrouselItem}>
                <img src={notice.file} alt="" />
                <p>{notice.topic}</p>
              </div>
            ) : (
              <div key={notice.id} className={design.CrouselItem}>
                <div>{renderHTML(notice.file)}</div>
                <p>{notice.topic}</p>
              </div>
            );
          })}
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
            {noticies.map((notice) => {
              return (
                <div className={design.NoticeItem} key={notice.id}>
                  <div className={design.NoticeName}>{notice.topic}</div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setSelectedForDelete(notice.id);
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticeBoard;
