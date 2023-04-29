import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@mui/system";

import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HistoryIcon from "@mui/icons-material/History";
import SourceIcon from "@mui/icons-material/Source";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";

import type { SxProps, Theme, SvgIconProps } from "@mui/material";

import S from "./SideMenu.styled";
import VisitorStatus from "./VisitorStatus";
import DivTypography from "./DivTypography";
import Layouts from "src/core/Layouts";
import { useThemeController } from "src/components/providers/MainThemeProvider";
import { RightSlide } from "src/components/transitions/Slides";
import Fade from "src/components/transitions/Fade";
import DiscordIcon from "src/assets/icons/DiscordIcon";
import GithubIcon from "src/assets/icons/GithubIcon";
import KakaoTalkIcon from "src/assets/icons/KakaoTalkIcon";
import VelogIcon from "src/assets/icons/VelogIcon";

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

const SideMenuSxProps: SxProps<Theme> = {
  height: "calc(100vh - 50px)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden scroll",
  padding: "10px 24px",
  margin: 0,
  marginTop: "50px",
  paddingTop: "30px",
  boxShadow: "5px 0px 10px black",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "& :not(.sidemenu-header) >div": {
    width: "100%",
  },
};

export interface SideMenuProps {
  open: boolean;
  onClose?: () => void;
}

const SideMenuDrawer: React.FC<SideMenuProps> = ({
  onClose = () => {},
  open,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentColors } = useThemeController();

  return (
    <Dialog
      open={open}
      sx={{
        zIndex: Layouts.SIDE_MENU,
        "& .MuiDialog-container": {
          justifyContent: "start",
          height: "auto",
          width: isMobile ? "auto" : "300px",
        },
      }}
      slotProps={{
        backdrop: {
          style: {
            opacity: 0,
          },
          onClick: onClose,
        },
      }}
      disableScrollLock={!isMobile}
      PaperProps={{ sx: SideMenuSxProps }}
      fullScreen={isMobile}
      TransitionComponent={isMobile ? Fade : RightSlide}
    >
      <div className="sidemenu-header" style={{ margin: "0 auto" }}>
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
        <Typography variant="body2" sx={{ position: "relative", left: 100 }}>
          the first portfolio
        </Typography>
      </div>

      <DivTypography />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          "& button": {
            borderRadius: "20px",
          },
        }}
      >
        <Link href="/timeline">
          <Button startIcon={<HistoryIcon />} variant="contained" size="small">
            Timeline
          </Button>
        </Link>
        <Link href="/projects">
          <Button startIcon={<SourceIcon />} variant="contained" size="small">
            Projects
          </Button>
        </Link>
      </Box>

      <DivTypography title="Projects" />

      <div style={{ margin: "15px 0 0 10px", gap: "10px" }}>
        {projectData.map(({ owner, projects }) => (
          <div key={owner}>
            <S.OwnerRow color={currentColors[600]}>
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
            </S.OwnerRow>
            {projects.map((project) => (
              <S.ProjectRow key={project.name} color={currentColors[300]}>
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
              </S.ProjectRow>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto" }}>
        <DivTypography title="Visitors" />
        <VisitorStatus />
        <DivTypography title="Links" />
        <S.LinksContainer>
          {links.map(([link, Component, color]) => (
            <Link href={link} key={link}>
              <Component sx={{ color }} />
            </Link>
          ))}
        </S.LinksContainer>
      </div>
    </Dialog>
  );
};

const SideMenuWrapper: React.FC<{
  onOpenChanged?: (isOpened: boolean) => void;
}> = ({ onOpenChanged }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (onOpenChanged) onOpenChanged(open);
  }, [open]);

  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={() => setOpen((opened) => !opened)}
      >
        <MenuIcon />
      </IconButton>

      <SideMenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SideMenuWrapper;
