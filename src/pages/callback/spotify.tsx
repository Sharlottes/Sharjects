import React from "react";
import { useRouter } from "next/router";
import CSR from "src/components/CSR";
import { copy } from "src/utils/copy";

const SpotifyCallbackPage = () => {
  const { query } = useRouter();

  React.useEffect(() => {
    if (!query["code"]) return;
    copy(query["code"].toString()).then(() => window.close());
  }, [query["code"]]);

  return <>{query["code"]}</>;
};
export default () => (
  <CSR>
    <SpotifyCallbackPage />
  </CSR>
);
