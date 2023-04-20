import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SpotifyIcon from "src/assets/icons/SpotifyIcon";
import Spotify from "react-spotify-embed";
import useSWR from "swr";

import { StatusCardContainer } from "./styled";

const SpotifyStatus: React.FC = () => {
  const { data } = useSWR<SpotifyApi.CurrentPlaybackResponse>(
    "/api/spotify/playback",
    fetchSpotifyPlaybackData
  );

  if (!data) return <></>;

  return (
    <StatusCardContainer>
      <div>
        <SpotifyIcon
          sx={{ fill: "#1db954", transform: "scale(1.5)", marginRight: "10px" }}
        />
        <Typography component="span" variant="h4">
          Spotify
        </Typography>
      </div>
      <Divider sx={{ margin: "10px 0" }} />
      {data && data.item && (
        <Spotify wide link={data.item.external_urls.spotify} />
      )}
    </StatusCardContainer>
  );
};

async function fetchSpotifyPlaybackData(url: string) {
  const data = await fetch(url).then<SpotifyApi.CurrentPlaybackResponse>(
    (data) => data.json()
  );
  return data;
}

export default SpotifyStatus;
