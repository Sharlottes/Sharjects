import React from "react";
import Image from "next/image";
import Link from "next/link";

import Drawer, { type DrawerProps } from "@mui/material/Drawer";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HistoryIcon from "@mui/icons-material/History";
import SourceIcon from "@mui/icons-material/Source";
import EmailIcon from "@mui/icons-material/Email";

import KakaoTalkIcon from "src/assets/icons/KakaoTalkIcon";
import DiscordIcon from "src/assets/icons/DiscordIcon";
import GithubIcon from "src/assets/icons/GithubIcon";
import VelogIcon from "src/assets/icons/VelogIcon";

import type { projectDataType } from "src/@type";
import { OwnerRow, ProjectRow, LinksContainer } from "./styled";
import { useThemeController } from "../MainThemeProvider";
import Status from "./Status";

const projectData: Array<projectDataType> = require("public/data/projectData.json");
const links: Array<
  [string, React.FC<SvgIconProps>] | [string, React.FC<SvgIconProps>, string]
> = [
  ["https://github.com/sharlottes", GithubIcon, "themedBlack"],
  ["https://discordapp.com/users/473072758629203980", DiscordIcon],
  ["mailto:aaa9810321@gmail.com", EmailIcon, "#c5221f"],
  ["https://velog.io/@sharlotte_04", VelogIcon],
  ["https://open.kakao.com/o/sJxW8TUb", KakaoTalkIcon, "#black"],
];

const DivTypography: React.FC<{ title?: string }> = ({ title }) => (
  <Divider
    textAlign="left"
    sx={{ margin: "10px 0", "&::before": { top: 0 }, "&::after": { top: 0 } }}
  >
    {title && (
      <Typography fontWeight={500} fontSize={12}>
        {title}
      </Typography>
    )}
  </Divider>
);

const SideMenuDrawer: React.FC<DrawerProps> = (props) => {
  const { currentColors } = useThemeController();

  return (
    <Drawer
      {...({ component: "aside" } as any)}
      disableScrollLock
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden scroll",
          padding: "10px 24px",
          marginTop: "50px",
          paddingTop: "30px",
          boxShadow: "5px 0px 10px black",
          height: "calc(100vh - 50px)",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "& >div": {
            width: "100%",
          },
        },
      }}
      {...props}
    >
      <div>
        <Link href="/">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 20,
              transition: "color 150ms ease-in",
              "&:hover": { color: currentColors[600] },
            }}
          >
            Sharlotte's Portfolio
          </Typography>
        </Link>
        <Typography
          variant="body2"
          sx={{ marginLeft: "5px", position: "relative", left: "100px" }}
        >
          the first portfolio
        </Typography>
      </div>

      <DivTypography />

      <div>
        <Link href="/timeline">
          <Button
            startIcon={<HistoryIcon />}
            variant="contained"
            size="small"
            sx={{ borderRadius: "20px", margin: "10px" }}
          >
            Timeline
          </Button>
        </Link>
        <Link href="/projects">
          <Button
            startIcon={<SourceIcon />}
            variant="contained"
            size="small"
            sx={{ borderRadius: "20px", margin: "10px" }}
          >
            Projects
          </Button>
        </Link>
      </div>

      <DivTypography title="Projects" />

      <div style={{ margin: "15px 0 0 10px", gap: "10px" }}>
        {projectData.map(({ owner, projects }) => (
          <div key={owner}>
            <OwnerRow color={currentColors[600]}>
              <Image
                className="profile-image"
                src={`/images/profile/${owner}.png`}
                alt=""
                width={20}
                height={20}
                style={{
                  borderRadius: "20px",
                  marginRight: "5px",
                }}
              />
              <Link href={`https://github.com/${owner}`}>
                <Typography className="highlight" fontWeight={500}>
                  {owner}
                </Typography>
              </Link>
            </OwnerRow>
            {projects.map((project) => (
              <ProjectRow key={project.name} color={currentColors[300]}>
                <div className="highlight">
                  <div
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "5px",
                    }}
                  >
                    {project.icon && (
                      <Image
                        className="project-icon"
                        src={`/images/icon/${project.icon}.png`}
                        alt=""
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  <Link href={`/projects/${project.name.toLowerCase()}`}>
                    <Typography fontWeight={600}>{project.name}</Typography>
                  </Link>
                </div>
                <div className="links">
                  {!project.noGithub && (
                    <Link href={`https://github.com/${owner}/${project.name}`}>
                      <GithubIcon />
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link}>
                      <OpenInNewIcon />
                    </Link>
                  )}
                </div>
              </ProjectRow>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto" }}>
        <DivTypography title="Visitors" />
        <Status />
        <DivTypography title="Links" />
        <LinksContainer>
          {links.map(([link, Component, color]) => (
            <Link href={link} key={link}>
              <Component sx={{ color }} />
            </Link>
          ))}
        </LinksContainer>
      </div>
    </Drawer>
  );
};

export default SideMenuDrawer;
