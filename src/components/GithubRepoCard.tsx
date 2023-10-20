import React from "react";
import Image from "next/image";
import Link from "next/link";

import useSWR from "swr";

import StargazerIcon from "src/assets/icons/github/StargazerIcon";
import RepoIcon from "src/assets/icons/github/RepoIcon";
import ForkIcon from "src/assets/icons/github/ForkIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import S from "./GithubRepoCard.styled";
import stringToElement from "src/utils/stringToElement";

export interface GithubRepoCardProps {
  username: string;
  repository: string;
}

const GithubRepoCard: React.FC<GithubRepoCardProps> = ({
  username,
  repository,
}) => {
  const { data } = useSWR<GithubAPIRepoData>(
    `/api/github/repos/${username}/${repository}`
  );
  const { data: emojis } = useSWR("/api/github/emojis");
  const { data: colors } = useSWR(
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
  );

  if (!data) return <CircularProgress />;

  return (
    <S.GithubCardContainer>
      <S.GithubCardHeader>
        <RepoIcon fontSize="small" />
        <div>
          <Typography variant="subtitle1">
            <Link href={data.html_url}>{data.name}</Link>
          </Typography>
          {data.fork && data.source && (
            <Typography variant="caption">
              Forked from&nbsp;
              <Link href={data.source.html_url}>{data.source.full_name}</Link>
            </Typography>
          )}
        </div>
      </S.GithubCardHeader>
      <S.GithubCardDescription>
        {data.description &&
          stringToElement(
            data.description,
            /:(\w+):/g,
            (name, offset) => (
              <span key={offset}>
                <Image
                  alt={name}
                  src={emojis ? emojis[name] : ""}
                  width={16}
                  height={16}
                />
              </span>
            ),
            (str, idx) => <span key={idx}>{str}</span>
          )}
      </S.GithubCardDescription>
      <S.GithubCardFooter>
        {data.language && (
          <div>
            <S.ColoredDoat color={colors[data.language].color} />
            &nbsp;
            <span>{data.language}</span>
          </div>
        )}
        {data.stargazers_count !== 0 && (
          <Link href={data.html_url + "/stargazers"}>
            <StargazerIcon fontSize="small" />
            &nbsp; <span>{data.stargazers_count}</span>
          </Link>
        )}
        {data.forks_count !== 0 && (
          <Link href={data.html_url + "/network/members"}>
            <ForkIcon fontSize="small" />
            &nbsp; <span>{data.forks_count}</span>
          </Link>
        )}
      </S.GithubCardFooter>
    </S.GithubCardContainer>
  );
};

export default GithubRepoCard;
