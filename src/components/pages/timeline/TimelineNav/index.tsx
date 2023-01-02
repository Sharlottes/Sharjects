import React from "react";

import NavigatorContainer from "./NavigatorContainer";
import NavigateController from "./NavigateController";
import ScrollController from "./ScrollController";

const TimelineNav: React.FC = () => {
  const [toggled, setToggled] = React.useState(false);
  const toggleController = () => setToggled((prev) => !prev);

  return (
    <NavigatorContainer>
      {toggled ? (
        <NavigateController onBackClick={toggleController} />
      ) : (
        <ScrollController onDateClick={toggleController} />
      )}
    </NavigatorContainer>
  );
};

export default TimelineNav;
