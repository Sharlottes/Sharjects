import { Typography } from "@mui/material";

import { ContentContainer, ContentBox, EnterButton } from "./styled";
import type { MotionProps } from "framer-motion";

export interface ContentProps extends MotionProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Content: React.FC<ContentProps> = ({
  title,
  description,
  image,
  link,
  ...props
}) => (
  <ContentContainer image={image} {...props}>
    <ContentBox>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </ContentBox>
    <EnterButton href={link} variant="contained">
      {"> 들어가기"}
    </EnterButton>
  </ContentContainer>
);

export default Content;
