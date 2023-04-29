import React from "react";
import Link from "next/link";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import type { SvgIconProps } from "@mui/material";

import FollowerIcon from "src/assets/icons/github/FollowerIcon";
import RepoIcon from "src/assets/icons/github/RepoIcon";
import GistIcon from "src/assets/icons/github/GistIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import * as U from "./GithubUserCard.util";
import S from "./GithubUserCard.styled";

function getIcons(
  user: GithubAPIUser
): [number, string, React.FC<SvgIconProps>][] {
  const arr: [number, string, React.FC<SvgIconProps>][] = [];

  if (user.public_repos !== 0)
    arr.push([
      user.public_repos,
      `https://github.com/${user.login}/?tab=repositories`,
      RepoIcon,
    ]);
  if (user.public_gists !== 0)
    arr.push([
      user.public_gists,
      `https://gist.github.com/${user.login}`,
      GistIcon,
    ]);
  if (user.followers !== 0)
    arr.push([
      user.followers,
      `https://github.com/${user.login}/?tab=followers`,
      FollowerIcon,
    ]);
  return arr;
}

export interface GithubUserCardProps {
  username: string;
}

const GithubUserCard: React.FC<GithubUserCardProps> = ({ username }) => {
  const { data: session } = useSession();
  const { data: user } = useSWR<GithubAPIUser>(`/api/github/users/${username}`);
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

  if (!user) return <CircularProgress />;

  return (
    <S.GithubCardContainer>
      <S.GithubCardHeader>
        <Avatar src={user.avatar_url} />
        <div>
          <Typography variant="subtitle1">
            <Link href={user.html_url}>{user.login}</Link>
          </Typography>
          <Typography variant="caption">{user.name ?? "<Empty>"}</Typography>
        </div>
        <Button
          size="small"
          variant="outlined"
          onClick={fetchFollowing}
          disabled={user.name === session?.user?.name}
        >
          {isFollowing ? "UnFollow" : "Follow"}
        </Button>
      </S.GithubCardHeader>
      <S.GithubCardBody>
        <Typography variant="body1">{user.bio}</Typography>
        <div className="icons">
          {getIcons(user).map(([value, url, Icon], i) => (
            <Link key={i} href={url.toString()}>
              <Icon fontSize="small" />
              {value}
            </Link>
          ))}
        </div>
      </S.GithubCardBody>
    </S.GithubCardContainer>
  );
};

export default GithubUserCard;
