import React from "react";

import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";

import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import GithubRepoCardFetcher from "src/components/GithubRepoCard";

const CollapseBar: React.FC<{ author: string; name: string }> = ({
  author,
  name,
}) => {
  const [opened, setOpened] = React.useState(false);

  return (
    <div
      className="collapse-bar"
      style={{ transform: `translateY(${opened ? "0%" : "80%"})` }}
    >
      <IconButton
        onClick={() => setOpened((prev) => !prev)}
        sx={{ pointerEvents: "fill" }}
      >
        <KeyboardDoubleArrowUpIcon
          sx={{
            transition: "transform 250ms ease 100ms",
            transform: `rotate(${opened ? "180deg" : 0})`,
          }}
        />
      </IconButton>
      <Slide direction="up" in={opened} unmountOnExit mountOnEnter>
        <div>
          <GithubRepoCardFetcher username={author} repository={name} dark />
        </div>
      </Slide>
    </div>
  );
};

export default CollapseBar;
