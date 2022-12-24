import React from "react";
import Link from "next/link";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { motion } from "framer-motion";

import Layout from "src/components/Layout";
import GithubIcon from "src/assets/icons/GithubIcon";
import { MainTitle, MainDescription, keywords } from "src/components/pages";

const avatarVariants = {
  show: {
    opacity: 1,
    y: 0,
    width: 40,
    height: 40,
    transition: {
      ease: "circInOut",
      delay: keywords.length * 0.8,
    },
  },
  sizeup: {
    width: "min(20vw, 200px)",
    height: "min(20vw, 200px)",
    transition: {
      ease: "circOut",
      delay: keywords.length * 0.8,
    },
  },
};

const Home: React.FC = () => {
  return (
    <Layout>
      <div style={{ minWidth: "50%", margin: "10vh auto 0" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={avatarVariants}
            animate={["show", "sizeup"]}
            initial={{ opacity: 0, y: -20, width: 40, height: 40 }}
          >
            <Avatar style={{ width: "inherit", height: "inherit" }}>
              <img
                src="images/profile/Sharlottes.png"
                style={{ maxWidth: "min(20vw, 200px)", maxHeight: "auto" }}
              />
            </Avatar>
          </motion.div>
          <MainTitle />
        </div>
        <MainDescription />
        <Box
          component={motion.div}
          animate={{
            y: 0,
            opacity: 1,
          }}
          initial={{
            y: -50,
            opacity: 0,
          }}
          transition={{
            delay: keywords.length * 0.8 + 1,
            duration: 0.3,
          }}
          sx={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            whiteSpace: "nowrap",
          }}
        >
          <Link href="/timeline">
            <Button variant="contained">Timeline</Button>
          </Link>
          <Link href="/projects">
            <Button variant="contained">Projects</Button>
          </Link>
          <Link href="https://github.com/sharlottes">
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
              startIcon={<GithubIcon />}
            >
              Github Profile
            </Button>
          </Link>
        </Box>
      </div>
    </Layout>
  );
};

export default Home;
