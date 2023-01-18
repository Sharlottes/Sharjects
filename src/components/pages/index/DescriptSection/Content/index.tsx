import { Typography, useMediaQuery } from "@mui/material";

import {
  ContentContainerTop,
  ContentContainer,
  ContentBoxWrapper,
  ContentBox,
} from "./styled";
import type { MotionProps } from "framer-motion";
import { useTheme } from "@mui/system";
import ContentStats, { type ContentStatsProps } from "./ContentStats";

export interface ContentProps extends MotionProps, ContentStatsProps {
  title: string;
  description: string;
  image: string;
}

const Content: React.FC<ContentProps> = ({
  title,
  description,
  image,
  link,
  progress,
  canEnter = false,
  developing = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ContentContainer {...props}>
      <ContentContainerTop image={image} isMobile={isMobile}>
        <ContentBoxWrapper isMobile={isMobile}>
          <ContentBox isMobile={isMobile}>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
            {!isMobile && (
              <ContentStats
                canEnter={canEnter}
                developing={developing}
                link={link}
                progress={progress}
              />
            )}
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainerTop>{" "}
      {isMobile && (
        <ContentStats
          canEnter={canEnter}
          developing={developing}
          link={link}
          progress={progress}
        />
      )}
    </ContentContainer>
  );
};

export default Content;
