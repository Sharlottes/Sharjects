import React from "react";
import Image from "next/image";
import Link from "next/link";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import InfoIcon from "@mui/icons-material/Info";

import GithubIcon from "src/assets/icons/GithubIcon";
import CollapseBar from "src/components/pages/projects/CollapseBar";

import S from "./ProjectCard.styled";

const ProjectCard: React.FC<
  projectDataType["projects"][0] & { owner: string }
> = (data) => {
  return (
    <S.ProjectCardWrapper>
      <S.ProjectCardContainer>
        <div style={{ height: "calc(100% - 30px)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {data.icon && (
              <Image
                src={`/images/icon/${data.icon}.png`}
                alt=""
                width={24}
                height={24}
                style={{
                  marginRight: "5px",
                }}
              />
            )}
            <div style={{ display: "flex" }}>
              <Typography variant="h5">{data.name}</Typography>
              {data.link && (
                <Link href={data.link}>
                  <Tooltip
                    leaveDelay={300}
                    title={
                      <div style={{ display: "flex" }}>
                        <InfoIcon fontSize="small" sx={{ margin: "2px" }} />
                        <span>
                          이 프로젝트는 배포가 완료되었어요.
                          <br />
                          <strong>지금 확인해보세요!</strong>
                        </span>
                      </div>
                    }
                  >
                    <S.StyledOpenInNewIcon />
                  </Tooltip>
                </Link>
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
              <Link href={`https://github.com/${data.owner}/${data.name}`}>
                <GithubIcon />
              </Link>
            )}
          </div>
          <div>
            <Link href={`/projects/${data.name.toLowerCase()}`}>&gt; go!</Link>
          </div>
        </div>
      </S.ProjectCardContainer>
      {!data.noGithub && <CollapseBar author={data.owner} name={data.name} />}
    </S.ProjectCardWrapper>
  );
};

export default ProjectCard;
