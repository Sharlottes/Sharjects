import { Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";

interface GithubStatData {
  commitCount: number;
  prCount: number;
}

const GithubStatus: React.FC = () => {
  const { data, isLoading } = useSWR<GithubStatData>(
    "/api/github/users/sharlottes/events/public",
    fetchGithubStatData
  );

  return (
    <Typography>
      최근에 깃허브에서{" "}
      <Typography fontWeight="bold" component="span">
        {data?.commitCount || 0}
      </Typography>
      번 커밋하고{" "}
      <Typography fontWeight="bold" component="span">
        {data?.prCount || 0}
      </Typography>
      번 풀 리퀘스트를 했어요.
    </Typography>
  );
};

async function fetchGithubStatData(url: string): Promise<GithubStatData> {
  const events = await fetch(url).then<GithubAPIUserEventData[]>((res) =>
    res.json()
  );
  let prCount = 0,
    commitCount = 0;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (!event.type) continue;

    switch (event.type) {
      case "PushEvent":
        commitCount++;
        break;
      case "PullRequestEvent":
        prCount++;
        break;
    }
  }

  return { prCount, commitCount };
}

export default GithubStatus;
