import GithubRepoCard from "src/components/GithubRepoCard";
import GithubUserCard from "src/components/GithubUserCard";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

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

export const StyledRepoCard = styled(GithubRepoCard)({
  margin: "min(2vw, 10px)",
  width: "min(100%, 400px)",
});

export const StyledUserCard = styled(GithubUserCard)({
  margin: "min(2vw, 10px)",
  width: "min(100%, 400px)",
});

export const LinkText = styled("a")({
  color: "blue",
});
