import React from "react";
import Carousel from "react-animated-carousel";
import "../StudentComponents/NoticeBoardComponent/NoticeBoard.css";

let slides = [<h1>asdasd 1</h1>, <h1>qwerty 2</h1>, <h1>zxcv 3</h1>];

function NoticeBoard() {
  return (
    <div className="NoticeCrousel">
      <Carousel
        slides={slides}
        animationType="FADE"
        animationDuration={1000}
        duration={2000}
        animationTimingFunction="linear"
        withNavigation
      />
      <Carousel
        slides={slides}
        animationType="SLIDE"
        duration={2000}
        withNavigation
      />
      <Carousel slides={slides} animationType="ZOOM" duration={3000} />
      <Carousel slides={slides} duration={3500} withNavigation />
    </div>
  );
}

export default NoticeBoard;
