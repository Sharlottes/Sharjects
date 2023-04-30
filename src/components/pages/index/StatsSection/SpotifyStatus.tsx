import Spotify from "react-spotify-embed";
import useSWR from "swr";

const SpotifyStatus: React.FC = () => {
  const { data } = useSWR<SpotifyApi.CurrentPlaybackResponse>(
    "/api/spotify/playback"
  );

  if (!data?.item) return <></>;
  return <Spotify wide link={data.item.external_urls.spotify} />;
};

export default SpotifyStatus;
