import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { SvgIconProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HistoryIcon from "@mui/icons-material/History";
import SourceIcon from "@mui/icons-material/Source";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";

import KakaoTalkIcon from "src/assets/icons/KakaoTalkIcon";
import DiscordIcon from "src/assets/icons/DiscordIcon";
import GithubIcon from "src/assets/icons/GithubIcon";
import VelogIcon from "src/assets/icons/VelogIcon";

import useSWR from "swr";

import * as styles from "./SideMenu.css";

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

export interface SideMenuProps {
  open: boolean;
  onClose?: () => void;
}

function SideMenuDrawer({ onClose = () => {}, open }: SideMenuProps) {
  const { data: visitors, isLoading } =
    useSWR<Record<string, number>>("/api/visit");

  return (
    <Drawer
      open={open}
      anchor="left"
      slotProps={{
        backdrop: {
          onClick: onClose,
        },
      }}
      className={styles.sideMenu}
      PaperProps={{ className: styles.sideMenuContainer }}
    >
      <div className={styles.sideMenuHeader}>
        <Link href="/" className={styles.sideMenuTitle}>
          Sharlotte's Portfolio
        </Link>
        <Typography variant="body2" className={styles.sideMenuSubtitle}>
          the first portfolio
        </Typography>
      </div>

      <Divider className={styles.divTypography} />

      <Box className={styles.navButtons}>
        <Button
          LinkComponent={Link}
          href="/timeline"
          className={styles.navButton}
          startIcon={<HistoryIcon />}
          variant="contained"
          size="small"
        >
          Timeline
        </Button>
        <Button
          LinkComponent={Link}
          href="/projects"
          className={styles.navButton}
          startIcon={<SourceIcon />}
          variant="contained"
          size="small"
        >
          Projects
        </Button>
      </Box>

      <Divider className={styles.divTypography}>Projects</Divider>

      <div className={styles.bodyContainer}>
        {projectData.map(({ owner, projects }) => (
          <React.Fragment key={owner}>
            <div className={styles.ownerRow}>
              <Image
                className={styles.ownerProfileImage}
                src={`/images/profile/${owner}.png`}
                alt=""
                width={16}
                height={16}
              />
              <Link href={`https://github.com/${owner}`}>{owner}</Link>
            </div>
            {projects.map((project) => (
              <div key={project.name} className={styles.projectRow}>
                <div className={styles.projectLabel}>
                  <div className={styles.projectIconContainer}>
                    {project.icon && (
                      <Image
                        src={`/images/icon/${project.icon}.png`}
                        alt=""
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  <Link href={`/projects/${project.name.toLowerCase()}`}>
                    {project.name}
                  </Link>
                </div>
                <div className={styles.projectLinks}>
                  {!project.noGithub && (
                    <Link href={`https://github.com/${owner}/${project.name}`}>
                      <GithubIcon className={styles.projectLinkIcon} />
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link}>
                      <OpenInNewIcon className={styles.projectLinkIcon} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <Divider className={styles.divTypography}>Visitors</Divider>

      <div className={styles.visitorContainer}>
        {!visitors || isLoading ? (
          <>방문자 불러오는 중...</>
        ) : (
          <>
            이 사이트는 오늘 {visitors[dateCode] || 0}번 조회되었고, 총{" "}
            {Object.values(visitors).reduce((a, e) => a + e, 0)}번 조회되었어요.
          </>
        )}
      </div>

      <Divider className={styles.divTypography}>Links</Divider>

      <div className={styles.linksContainer}>
        {links.map(([link, Component, color]) => (
          <Link href={link} key={link} className={styles.link}>
            <Component sx={{ color }} />
          </Link>
        ))}
      </div>
    </Drawer>
  );
}

const dateCode = (() => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
})();

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
        aria-label="sidebar menu"
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
