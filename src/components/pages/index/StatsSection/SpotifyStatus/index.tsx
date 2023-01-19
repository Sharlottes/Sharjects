import React from "react";

import Typography from "@mui/material/Typography";
import SpotifyIcon from "src/assets/icons/SpotifyIcon";
import { StatusCardContainer } from "./styled";
import Divider from "@mui/material/Divider";
import Spotify from "react-spotify-embed";

const SpotifyStatus: React.FC = () => {
  const [data, setData] = React.useState<SpotifyApi.CurrentPlaybackResponse>();
  React.useEffect(() => {
    (async () => {
      const res = await fetch(
        "/api/spotify/playback"
      ).then<SpotifyApi.CurrentPlaybackResponse>((data) => data.json());
      setData(res);
    })();
  }, []);

  return (
    <StatusCardContainer>
      <div>
        <SpotifyIcon sx={{ fill: "#1db954", transform: "scale(1.5)" }} />
        {"  "}
        <Typography component="span" variant="h4">
          Spotify
        </Typography>
      </div>
      <Divider sx={{ margin: "10px 0" }} />
      {data && data.item && <Spotify link={data.item.external_urls.spotify} />}
    </StatusCardContainer>
  );
};

export default SpotifyStatus;
