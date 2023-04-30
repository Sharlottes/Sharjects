import GithubRepoCard from "src/components/GithubRepoCard";
import GithubUserCard from "src/components/GithubUserCard";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

export default {
  TimelineItemsContainer: styled("div")(({ theme }) => ({
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
  })),

  TimelineContentTitle: (props: React.PropsWithChildren) => (
    <Typography variant="h5" {...props} />
  ),

  TimelineContent: styled("div")({
    marginLeft: "min(3vw, 20px)",
    maxWidth: "700px",
  }),

  StyledRepoCard: styled(GithubRepoCard)({
    margin: "min(2vw, 10px)",
    width: "min(100%, 400px)",
  }),

  StyledUserCard: styled(GithubUserCard)({
    margin: "min(2vw, 10px)",
    width: "min(100%, 400px)",
  }),

  LinkText: styled("a")({
    color: "blue",
  }),
};
