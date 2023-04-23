import { signIn } from "next-auth/react";
import type { Session } from "next-auth";

export const fetchFollowingToGet = async ([session, user, url]: [
  Session,
  any,
  string
]) => {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${session.accessToken}`,
    },
  });
  return res.status === 204;
};

export const fetchFollowingToPost = (
  session: Session | null,
  user: any,
  method: string
) => {
  if (user.name === session?.user?.name) return;
  if (!(session && session.accessToken)) {
    signIn("github");
    return;
  }

  return fetch(`https://api.github.com/user/following/${user.login}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `token ${session.accessToken}`,
    },
  });
};
