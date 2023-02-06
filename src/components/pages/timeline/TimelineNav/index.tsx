import React from "react";

import NavigateController from "./NavigateController";
import ScrollController from "./ScrollController";
import { NavigatorShowButton, NavigatorContainer } from "./styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TimelineNav: React.FC = () => {
  const [toggled, setToggled] = React.useState(false);
  const [showed, setShowed] = React.useState(false);
  const showHandler = () => setShowed((prev) => !prev);
  const toggleHandler = () => setToggled((prev) => !prev);

  return (
    <NavigatorContainer animate={{ x: showed ? 0 : -110 }}>
      <NavigatorShowButton
        showed={showed}
        whileHover={{
          x: showed ? 0 : 15,
          color: "#666666",
        }}
        onClick={showHandler}
      >
        <ArrowForwardIosIcon />
      </NavigatorShowButton>
      {toggled ? (
        <NavigateController onBackClick={toggleHandler} />
      ) : (
        <ScrollController onDateClick={toggleHandler} />
      )}
    </NavigatorContainer>
  );
};

export default TimelineNav;
