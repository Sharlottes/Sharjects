import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";
import { RepoIcon, StargazerIcon, ForkIcon } from "src/assets/icons";

import useSWR from "swr";
import stringToElement from "src/utils/stringToElement";
import * as S from "./GithubRepoCard.styled";

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

export interface GithubRepoCardProps {
  username: string;
  repository: string;
  dark?: boolean;
}

const GithubRepoCard: React.FC<
  GithubRepoCardProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ username, repository, style, dark, ...props }) => {
  const theme = useTheme();
  const palette = getGithubPalette(dark ?? theme.palette.mode === "dark");

  const { data } = useSWR(`/api/github/repos/${username}/${repository}`);
  const { data: emojis } = useSWR("/api/github/emojis");
  const { data: colors } = useSWR("/api/github/colors");

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
        color: "#24292e",
        ...style,
      }}
      {...props}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <RepoIcon
          sx={{ fill: palette.iconColor, marginRight: "8px" }}
          fontSize="small"
        />
        <span style={{ fontWeight: 600, color: palette.textColor }}>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
          >
            {data.name}
          </Link>
        </span>
      </div>
      <div
        style={{
          display: data.fork ? "block" : "none",
          fontSize: "12px",
          color: palette.iconColor,
        }}
      >
        Forked from{" "}
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          href={data.fork ? data.source?.html_url : ""}
          target="_blank"
          rel="noreferrer"
        >
          {data.fork ? data.source?.full_name : ""}
        </Link>
      </div>
      {data.description && (
        <div
          style={{
            fontSize: "12px",
            marginBottom: "16px",
            marginTop: "8px",
            color: palette.iconColor,
          }}
        >
          {stringToElement(
            data.description,
            /:(\w+):/g,
            (name, offset) => (
              <span key={offset}>
                <Image
                  alt={name}
                  src={emojis ? emojis[name] : ""}
                  width={16}
                  height={16}
                  style={{ verticalAlign: "-0.2rem" }}
                />
              </span>
            ),
            (str, idx) => (
              <span key={idx}>{str}</span>
            )
          )}
        </div>
      )}
      <div
        style={{ fontSize: "12px", color: palette.iconColor, display: "flex" }}
      >
        <div style={{ marginRight: "16px" }}>
          <S.ColoredDoat
            color={colors[data.language ?? ""]?.color ?? "rgba(0,0,0,0)"}
          />
          &nbsp;
          <span>{data.language}</span>
        </div>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          href={data.html_url + "/stargazers"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              display: data.stargazers_count === 0 ? "none" : "flex",
              alignItems: "center",
              marginRight: "16px",
            }}
          >
            <StargazerIcon sx={{ fill: palette.iconColor }} fontSize="small" />
            &nbsp; <span>{data.stargazers_count}</span>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          href={data.html_url + "/network/members"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              display: data.forks_count === 0 ? "none" : "flex",
              alignItems: "center",
            }}
          >
            <ForkIcon sx={{ fill: palette.iconColor }} fontSize="small" />
            &nbsp; <span>{data.forks_count}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default GithubRepoCard;
