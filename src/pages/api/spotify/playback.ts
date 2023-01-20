import type { NextApiRequest, NextApiResponse } from "next";

interface CredentialData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
  expires_in: number;
  requested_at: number;
}

//if expired for some reason, run ./scripts/refresh_token.bash
let latestRefreshToken =
  "AQBbXo2gR_qCHepnrr6vh7J3_5AefJIR089S_6ul7Fmbjnh3Z6Viva2cid82sK9N9C_fjK1jvSpJKc9j4QFPolOOUCG208cqaW-TAY5x2AFWbQlHrbYMpHdcpRg7bc0GVuQ";

const toQueryString = (data: Record<string, any>) =>
  Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

const encodedAuthorization = `Basic ${Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64")}`;

async function refreshSpotifyToken(): Promise<CredentialData> {
  const data = await fetch(
    "https://accounts.spotify.com/api/token?" +
      toQueryString({
        grant_type: "refresh_token",
        refresh_token: latestRefreshToken,
      }),
    {
      headers: {
        Authorization: encodedAuthorization,
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    }
  ).then<CredentialData>((res) => res.json());
  data.requested_at = Date.now();
  return data;
}

let cachedToken: CredentialData;
async function getToken() {
  if (Date.now() - cachedToken.requested_at > cachedToken.expires_in * 1000)
    cachedToken = await refreshSpotifyToken();
  return cachedToken;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  cachedToken ??= await refreshSpotifyToken();
  const token = await getToken();
  const data = await fetch("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => res.json());
  res.json(data);
};
