import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { MotionProps } from "framer-motion";
import S from "./styled";

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
  <S.ContentContainer toright={toright} image={image} {...props}>
    <S.ContentWrapper>
      <Link href={link}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Link>
    </S.ContentWrapper>
  </S.ContentContainer>
);

export default Content;
