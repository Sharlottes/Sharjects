import GithubRepoCard, {
  type GithubRepoCardProps,
} from "src/components/GithubRepoCard";
import GithubUserCard, {
  type GithubUserCardProps,
} from "src/components/GithubUserCard";

export interface StyledRepoCardProps
  extends Omit<GithubRepoCardProps, "username"> {
  username?: string | undefined;
}
export const StyledRepoCard: React.FC<StyledRepoCardProps> = ({
  username = "sharlottes",
  ...props
}) => (
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
