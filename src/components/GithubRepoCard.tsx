import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";

import { useGithubData } from "./GithubStaticDataContext";
import FetchSuspenseWrapper from "./FetchSuspenseWrapper";
import { RepoIcon, StargazerIcon, ForkIcon } from "src/assets/icons";

import useSWR from "swr";
import stringToElement from "src/utils/stringToElement";

const getPalette = (dark: boolean) =>
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

const RepoDescription: React.FC<{
  description: string;
  iconColor: string;
}> = ({ description, iconColor }) => {
  const { data: emojis } = useSWR("/api/github/emojis", (url) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <div
      style={{
        fontSize: "12px",
        marginBottom: "16px",
        marginTop: "8px",
        color: iconColor,
      }}
    >
      {stringToElement(
        description,
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
  );
};

const ColoredDoat: React.FC<{
  colors: Record<string, { color: string }>;
  language: string;
}> = ({ colors, language }) => (
  <span
    style={{
      width: "12px",
      height: "12px",
      borderRadius: "100%",
      backgroundColor: colors ? colors[language ?? ""]?.color : "rgba(0,0,0,0)",
      display: "inline-block",
      top: "1px",
      position: "relative",
    }}
  />
);

const LanguageDoat: React.FC<{ language: string }> = ({ language }) => {
  const { getData } = useGithubData();

  return (
    <FetchSuspenseWrapper<
      "colors",
      typeof ColoredDoat,
      Record<string, { color: string }>
    >
      fetcher={() =>
        getData(
          "colors",
          "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
        )
      }
      Component={ColoredDoat}
      fetchedPropName="colors"
      language={language}
    />
  );
};

export interface GithubRepoCardProps {
  username: string;
  repository: string;
  dark?: boolean;
}

const GithubRepoCardFetcher: React.FC<
  GithubRepoCardProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ username, repository, ...props }) => {
  const { getData } = useGithubData();

  return (
    <FetchSuspenseWrapper
      fetcher={() =>
        getData<GithubAPIRepoData>(
          repository,
          `repos/${username}/${repository}`
        )
      }
      Component={GithubRepoCard}
      fetchedPropName="data"
      {...props}
    />
  );
};

const GithubRepoCard: React.FC<
  { data: GithubAPIRepoData; dark?: boolean } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ data, style, dark, ...props }) => {
  const theme = useTheme();
  const palette = getPalette(dark ?? theme.palette.mode === "dark");

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
        <RepoDescription
          description={data.description}
          iconColor={palette.iconColor}
        />
      )}
      <div
        style={{ fontSize: "12px", color: palette.iconColor, display: "flex" }}
      >
        <div style={{ marginRight: "16px" }}>
          <LanguageDoat language={data.language} />
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
export default GithubRepoCardFetcher;
