import Link from "next/link";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import type { MotionProps, Variant } from "framer-motion";
import * as styles from "./Content.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export interface ContentProps extends MotionProps {
  title: string;
  description: string;
  link: string;
  toright: boolean;
}

const variant: Variant = (i) => ({
  x: i % 2 == 0 ? "-1%" : "1%",
  opacity: 1,
  transition: {
    delay: i * 0.25,
    duration: i % 2 != 0 ? 1 : 1.25,
    ease: [0.79, -0.06, 0.19, 1.16],
  },
});

function Content({
  title,
  description,
  link,
  toright,
  ...props
}: ContentProps) {
  return (
    <motion.div
      {...props}
      className={styles.contentContainer}
      data-toright={toright}
      initial={{
        x: "150%",
        opacity: 0,
      }}
      variants={{ show: variant }}
      animate="show"
    >
      <div
        className={styles.shower}
        style={assignInlineVars({ [styles.i]: "0" })}
      />
      <div
        className={styles.shower}
        style={assignInlineVars({ [styles.i]: "1" })}
      />
      <div
        className={styles.shower}
        style={assignInlineVars({ [styles.i]: "2" })}
      />

      <div className={styles.contentWrapper}>
        <Link href={link}>
          <Typography fontSize="1.5rem" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Link>
      </div>
    </motion.div>
  );
}

export default Content;
