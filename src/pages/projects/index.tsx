import React from "react";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import InfoIcon from "@mui/icons-material/Info";

import Layout from "src/components/Layout";
import type { projectDataType } from "src/@type";
import GithubIcon from "src/assets/icons/GithubIcon";

import { motion, Variants } from "framer-motion";
import {
  StyledOpenInNewIcon,
  ProjectsContainer,
  ProjectCard,
  CollapseBar,
} from "components/pages/projects";

const projectData: Array<projectDataType["projects"][0] & { owner: string }> = (
  require("public/data/projectData.json") as projectDataType[]
)
  .map(({ owner, projects }) => projects.map((proj) => ({ ...proj, owner })))
  .flat();

const projectVariants: Variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
  hidden: { opacity: 0 },
};

const Projects: React.FC = () => (
  <Layout>
    <div
      style={{
        backgroundImage: "linear-gradient(#e66465, #9198e5)",
        zIndex: -1,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          Projects
        </div>
        <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
          여태껏 개발해온 개인 또는 팀 주관의 다양한 언어와 라이브러리,
          프레임워크를 겸비한 토이, 사이드, 메인 프로젝트들의 목록이에요!
        </div>
      </div>
      <div style={{ margin: "50px 0" }}>
        <ProjectsContainer layout>
          {projectData.map((data, i) => (
            <motion.div
              key={data.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={projectVariants}
            >
              <ProjectCard>
                <div
                  style={{
                    padding: "10px 15px",
                    gridColumnStart: 1,
                    gridRowStart: 1,
                  }}
                >
                  <div style={{ height: "calc(100% - 30px)" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {data.icon && (
                        <img
                          src={`/images/icon/${data.icon}.png`}
                          alt=""
                          style={{
                            height: "1.5rem",
                            width: "1.5rem",
                            marginRight: "5px",
                          }}
                        />
                      )}
                      <div style={{ display: "flex" }}>
                        <Typography variant="h5">{data.name}</Typography>
                        {data.link && (
                          <a href={data.link}>
                            <Tooltip
                              leaveDelay={300}
                              title={
                                <div style={{ display: "flex" }}>
                                  <InfoIcon
                                    fontSize="small"
                                    sx={{ margin: "2px" }}
                                  />
                                  <span>
                                    이 프로젝트는 배포가 완료되었어요.
                                    <br />
                                    <strong>지금 확인해보세요!</strong>
                                  </span>
                                </div>
                              }
                            >
                              <StyledOpenInNewIcon />
                            </Tooltip>
                          </a>
                        )}
                      </div>
                    </div>
                    <Divider sx={{ margin: "5px 0" }} />
                    <Typography variant="body1" sx={{ padding: "0 10px" }}>
                      {data.description}
                    </Typography>
                  </div>
                  <div className="link-btn">
                    <div>
                      {!data.noGithub && (
                        <a
                          href={`https://github.com/${data.owner}/${data.name}`}
                        >
                          <GithubIcon />
                        </a>
                      )}
                    </div>
                    <div>
                      <a href={`/projects/${data.name.toLowerCase()}`}>
                        &gt; go!
                      </a>
                    </div>
                  </div>
                </div>
                {!data.noGithub && (
                  <CollapseBar author={data.owner} name={data.name} />
                )}
              </ProjectCard>
            </motion.div>
          ))}
        </ProjectsContainer>
      </div>
    </div>
  </Layout>
);
export default Projects;
