import styled from "@mui/system/styled";
import GithubRepoCard, {
  type GithubRepoCardProps,
} from "src/components/GithubRepoCard";
import GithubUserCard, {
  type GithubUserCardProps,
} from "src/components/GithubUserCard";

export const StyledRepoCard: React.FC<
  Omit<GithubRepoCardProps, "username"> & { username?: string | undefined }
> = ({ username = "sharlottes", ...props }) => (
  <div
    style={{
      margin: "min(2vw, 10px)",
      width: "min(100%, 400px)",
    }}
  >
    <GithubRepoCard username={username} {...props} />
  </div>
);

export const StyledUserCard: React.FC<GithubUserCardProps> = (props) => (
  <div
    style={{
      margin: "min(2vw, 10px)",
      width: "min(100%, 400px)",
    }}
  >
    <GithubUserCard {...props} />
  </div>
);

export const TimelineContent = styled("div")({ marginLeft: "min(3vw, 20px)" });
