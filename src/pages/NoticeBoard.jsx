import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
import {
  withStyles,
} from "@material-ui/core/styles";
import { db } from "../Firebase";
import renderHTML from 'react-render-html';
import design from "../HoDComponent/NoticeBoardComponent/NoticeBoard.module.css";

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
  const [noticies, setNoticies] = useState([])

  useEffect(() => {
    var unsubscribe =db.collection("noticeBoard")
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
    <div className={design.main2}>
      <Carousel>
          {
            noticies.map((notice) => {
              return notice.type === 'image' ? (
                <div key={notice.id}>
                  <div className={design.CrouselItem}>
                    <img src={notice.file} alt="" />
                  </div>
                  <p>{notice.topic}</p>
                </div>
              ) : (
                <div key={notice.id}>
                  <div>
                    {renderHTML(notice.file)}
                  </div>
                  <p>{notice.topic}</p>
                </div>
              )
            })
          }

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
