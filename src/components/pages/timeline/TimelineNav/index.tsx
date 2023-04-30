import React from "react";

import NavigateController from "./NavigateController";
import ScrollController from "./ScrollController";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import S from "./styled";

const TimelineNav: React.FC = () => {
  const [toggled, setToggled] = React.useState(false);
  const [showed, setShowed] = React.useState(false);
  const showHandler = () => setShowed((prev) => !prev);
  const toggleHandler = () => setToggled((prev) => !prev);

  return (
    <S.NavigatorContainer animate={{ x: showed ? 0 : -110 }}>
      <S.NavigatorShowButton
        color={showed ? "#666666" : "lightgray"}
        whileHover={{
          x: showed ? 0 : 15,
          color: "#666666",
        }}
        onClick={showHandler}
      >
        <ArrowForwardIosIcon />
      </S.NavigatorShowButton>
      {toggled ? (
        <NavigateController onBackClick={toggleHandler} />
      ) : (
        <ScrollController onDateClick={toggleHandler} />
      )}
    </S.NavigatorContainer>
  );
};

export default TimelineNav;
