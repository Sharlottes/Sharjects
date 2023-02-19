import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import GithubRepoCard, {
  type GithubRepoCardProps,
} from "src/components/GithubRepoCard";
import GithubUserCard, {
  type GithubUserCardProps,
} from "src/components/GithubUserCard";

export const TimelineItemsContainer = styled("div")(({ theme }) => ({
  marginTop: "10px",
  transition: "all 300ms",
  [theme.breakpoints.down("md")]: {
    marginLeft: "5vw",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: "15vw",
  },
  [theme.breakpoints.up("xl")]: {
    marginLeft: "25vw",
  },
}));

export const TimelineContentTitle: React.FC<React.PropsWithChildren> = (
  props
) => <Typography variant="h5" {...props} />;

export const TimelineContent = styled("div")({
  marginLeft: "min(3vw, 20px)",
  maxWidth: "700px",
});

export const StyledRepoCard: React.FC<GithubRepoCardProps> = ({
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

export const LinkText = styled("a")({
  color: "blue",
});
