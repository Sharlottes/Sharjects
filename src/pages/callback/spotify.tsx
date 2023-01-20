import React from "react";
import { useRouter } from "next/router";

const SpotifyCallbackPage: React.FC = () => {
  const { query } = useRouter();

  React.useEffect(() => {
    if (query["code"]) navigator.clipboard.writeText(query["code"]?.toString());
    window.close();
  }, []);

  return <>{query["code"]}</>;
};

export default SpotifyCallbackPage;
