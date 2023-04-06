import styled from "@emotion/styled";
import { motion, useScroll } from "framer-motion";

const PageContaier = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
const _3DPage: React.FC = () => {
  const scroll = useScroll();

  return (
    <PageContaier>
      <motion.p
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
        animate={{
          rotateY: 60,
          x: 10,
        }}
      >
        Hello World!
      </motion.p>
    </PageContaier>
  );
};

export default _3DPage;
