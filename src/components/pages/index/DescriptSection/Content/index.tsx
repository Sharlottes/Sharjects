import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ContentContainer, ContentWrapper } from "./styled";
import type { MotionProps } from "framer-motion";

export interface ContentProps extends MotionProps {
  title: string;
  description: string;
  image: string;
  link: string;
  toright: boolean;
}

const Content: React.FC<ContentProps> = ({
  title,
  description,
  image,
  link,
  toright,
  ...props
}) => (
  <ContentContainer toright={toright} image={image} {...props}>
    <ContentWrapper>
      <Link href={link}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Link>
    </ContentWrapper>
  </ContentContainer>
);

export default Content;
