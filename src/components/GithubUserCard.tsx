import React from "react";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useSession } from "next-auth/react";

import { RepoIcon, GistIcon, FollowerIcon } from "src/assets/icons";
import useSWR from "swr";
import * as U from "./GithubUserCard.util";

const getGithubPalette = (dark: boolean) =>
  dark
    ? {
        background: "#0d1117",
        textColor: "#58a6ff",
        borderColor: "#30363d",
        iconColor: "#8b949e",
      }
    : {
        background: "white",
        textColor: "#0969da",
        borderColor: "#d0d7de",
        iconColor: "#57606a",
      };

export interface GithubUserCardProps {
  username: string;
}
const GithubUserCard: React.FC<
  GithubUserCardProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ username, style, ...props }) => {
  const { data: session } = useSession();
  const { data: user } = useSWR(`/api/github/users/${username}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  const { data: isFollowing, mutate } = useSWR(
    () =>
      session && user
        ? [session, user, `https://api.github.com/user/following/${user.login}`]
        : null,
    U.fetchFollowingToGet
  );
  const fetchFollowing = () => {
    U.fetchFollowingToPost(session, user, isFollowing ? "DELETE" : "PUT")?.then(
      (res) => res.ok && mutate((prev) => !prev)
    );
  };

  const theme = useTheme();
  const palette = getGithubPalette(theme.palette.mode === "dark");
  return (
    <div
      style={{
        fontFamily:
          "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        border: "1px solid",
        borderColor: palette.borderColor,
        borderRadius: "6px",
        background: palette.background,
        padding: "16px",
        fontSize: "14px",
        lineHeight: "1.5",
        color: "themedBlack",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Avatar src={user.avatar_url} />
        <div
          style={{
            display: "flex",
            marginLeft: "5px",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "40%",
          }}
        >
          <div aria-label="profile name">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              <Link
                style={{ textDecoration: "none", color: palette.textColor }}
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {user.login}
              </Link>
            </Typography>
            <Typography
              variant="caption"
              sx={{ position: "relative", top: "-10px" }}
            >
              {user.name ?? <span style={{ color: "gray" }}>{"<Empty>"}</span>}
            </Typography>
          </div>
          <Button
            id="followbtn"
            size="small"
            variant="outlined"
            onClick={fetchFollowing}
            sx={{ height: "35px", marginLeft: "20px" }}
            disabled={user.name === session?.user?.name}
          >
            {isFollowing ? "UnFollow" : "Follow"}
          </Button>
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <Typography variant="body1" sx={{ ml: "5px" }}>
          {user.bio}
        </Typography>
        <div style={{ display: "flex", margin: "10px auto" }}>
          {[
            [
              user.public_repos,
              `https://github.com/${user.login}/?tab=repositories`,
              <RepoIcon
                sx={{ fill: palette.iconColor, marginRight: "8px" }}
                fontSize="small"
              />,
            ],
            [
              user.public_gists,
              `https://gist.github.com/${user.login}`,
              <GistIcon
                sx={{ fill: palette.iconColor, marginRight: "8px" }}
                fontSize="small"
              />,
            ],
            [
              user.followers,
              `https://github.com/${user.login}/?tab=followers`,
              <FollowerIcon
                sx={{ fill: palette.iconColor, marginRight: "8px" }}
                fontSize="small"
              />,
            ],
          ].map(([value, url, icon], i) => (
            <Link
              key={i}
              href={url.toString()}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  margin: "auto 5px",
                  display: value === 0 ? "none" : "flex",
                  alignItems: "center",
                }}
              >
                {icon}
                {value}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GithubUserCard;
