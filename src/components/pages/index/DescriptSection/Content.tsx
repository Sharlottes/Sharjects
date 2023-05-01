import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import type { MotionProps, Variant } from "framer-motion";
import S from "./Content.styled";

export interface ContentProps extends MotionProps {
  title: string;
  description: string;
  image: string;
  link: string;
  toright: boolean;
}

const variant: Variant = (i) => ({
  x: i % 2 == 0 ? "-1%" : "1%",
  opacity: 1,
  transition: {
    delay: 2.25 + i * 0.25,
    duration: i % 2 != 0 ? 1 : 1.25,
    ease: [0.79, -0.06, 0.19, 1.16],
  },
});

const Content: React.FC<ContentProps> = ({
  title,
  description,
  image,
  link,
  toright,
  ...props
}) => (
  <S.ContentContainer
    {...props}
    initial={{
      x: "150%",
      opacity: 0,
    }}
    toright={toright}
    image={image}
    variants={{ show: variant }}
    animate="show"
  >
    <Image src={image} fill alt="preview" />
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
