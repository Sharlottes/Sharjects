import { motion, type MotionProps } from "framer-motion";

export type NavigatorShowButtonProps = MotionProps &
  React.HTMLAttributes<HTMLButtonElement> & {
    showed: boolean;
  };

const NavigatorShowButton: React.FC<NavigatorShowButtonProps> = ({
  showed,
  ...props
}) => (
  <motion.button
    {...props}
    style={{
      position: "absolute",
      right: "-30px",
      border: "none",
      color: showed ? "#666666" : "lightgray",
      boxShadow: "0 0 10px black",
      width: "36px",
      height: "36px",
      borderRadius: "18px",
      transition: "color 250ms",
    }}
    whileHover={{
      x: showed ? 0 : 15,
      color: "#666666",
    }}
  />
);

export default NavigatorShowButton;
