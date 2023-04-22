import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ContentContainer, ContentWrapper } from "./styled";
import type { MotionProps } from "framer-motion";

export interface ContentProps extends MotionProps {
  title: string;
  description: string;
  image: string;
  link: string;
  toRight: boolean;
}

const Content: React.FC<ContentProps> = ({
  title,
  description,
  image,
  link,
  toRight,
  ...props
}) => (
  <ContentContainer toRight={toRight} image={image} {...props}>
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
