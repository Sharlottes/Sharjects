import type { NextApiRequest, NextApiResponse } from "next";

interface CredentialData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: "Bearer";
  expires_in: number;
  requested_at: number;
}
let latestRefreshToken =
  "AQCul6ucxlcXDADWNfjXmZRytS_HF0Q6RATHohOQn5fib8HnGpmO9FYRjdmpVbWS0pmxOcW1aVvVj6oCjlyB9urPduKCuCVjE-qDYhYM0fo5e33GNOgooFVmTGI8lrBOaoU";

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
  console.log("Alert: Spotify refresh token got refreshed!\n", data);
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
