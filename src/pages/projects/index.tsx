import React from 'react';

import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import InfoIcon from '@mui/icons-material/Info';

import Layout from 'src/components/Layout';
import { projectDataType } from 'src/@type'
import GithubIcon from 'src/assets/icons/GithubIcon';
import GithubRepoCardFetcher from 'src/components/GithubRepoCard';

import { motion } from 'framer-motion'
import { styled } from '@mui/system';

const ProjectsContainer = styled(motion.div)(({ theme }) => ({
  display: 'grid',
  [theme.breakpoints.between('xs', 'sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)'
  },
  [theme.breakpoints.between('sm', 'md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.between('lg', 1400)]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  [theme.breakpoints.between(1400, 'xl')]: {
    gridTemplateColumns: 'repeat(5, 1fr)'
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(6, 1fr)'
  },
}))

const ProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  border: '1px solid #dcdcdc',
  minWidth: '250px',
  margin: '10px',
  transition: 'all 250ms ease-in',
  display: 'grid', flexDirection: 'column', justifyContent: 'space-between', gridTemplateColumns: '1fr',
  "& .MuiDivider-root": {
    transition: 'width,background-color',
    transitionDuration: '250ms',
    transitionDelay: '0ms,250ms',
    width: 0,
    backgroundColor: 'gray'
  },
  "& .link-btn": {
    opacity: 0,
    transition: 'opacity,color',
    transitionDuration: '500ms',
    "&:hover": {
      color: 'white',
    },
    [theme.breakpoints.down('md')]: {
      color: 'white',
      "&::before": {
        opacity: 1
      }
    },
  },
  "& .collapse-bar": {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'opacity,transform',
    transitionDuration: '100ms,500ms',
    transitionDelay: '125ms',
    transitionTimingFunction: 'ease,cubic-bezier(.01,1.76,.67,.79)',
  },
  "&:hover": {
    boxShadow: '0 0 10px black',
    "& .MuiDivider-root": {
      width: '100%',
      backgroundColor: '#a9d8ff'
    },
    "& .link-btn": {
      opacity: 1,
    },
    "& .collapse-bar": {
      opacity: 1,
      transform: 'translateY(0%)'
    }
  }
}))

const projectData: projectDataType['projects'] = (require('components/pages/projectData.json') as projectDataType[]).map(data => data.projects).flat();

const Projects: React.FC = () => (
  <Layout>
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', fontSize: 50, fontWeight: 'bold' }}>
        Projects
      </div>
      <div style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
        여태껏 개발해온 개인 또는 팀 주관의 다양한 언어와 라이브러리, 프레임워크를 겸비한 토이, 사이드, 메인 프로젝트들의 목록이에요!
      </div>
    </div>
    <div style={{ margin: '50px 0' }}>
      <ProjectsContainer layout>
        {projectData.map(data => (
          <ProjectCard key={data.name}>
            <div style={{
              padding: '10px',
              gridColumnStart: 1, gridRowStart: 1
            }}>
              <div style={{ height: 'calc(100% - 30px)' }}>
                <div style={{ display: 'flex' }}>
                  <Typography variant='h5'>{data.name}</Typography>
                  {data.link &&
                    <a href={data.link}>
                      <Tooltip title={
                        <div style={{ display: 'flex' }}>
                          <InfoIcon fontSize='small' sx={{ margin: '2px' }} />
                          <span>
                            이 프로젝트는 배포가 완료되었어요.<br />
                            <strong>지금 확인해보세요!</strong>
                          </span>
                        </div>
                      } leaveDelay={300}>
                        <OpenInNewIcon sx={{ transform: 'scale(0.8)', color: 'text.secondary', transition: 'color 300ms ease-out', "&:hover": { color: 'text.primary' } }} />
                      </Tooltip>
                    </a>
                  }
                </div>
                <Divider sx={{ margin: '5px 0' }} />
                <Typography variant='body1'>{data.description}</Typography>
              </div>
              <div>
                <Typography className="link-btn" sx={{
                  display: 'block',
                  width: '60px', height: '30px',
                  borderRadius: '20px',
                  border: '1px solid #dcdcdc',
                  padding: '2px 10px',
                  float: 'right',
                  color: 'black',
                  "& a": {
                    position: 'absolute',
                  },
                  "&::before": {
                    content: "''",
                    position: 'absolute',
                    width: '60px', height: '30px',
                    backgroundImage: 'linear-gradient(30deg, #50d4d9, #b662c4)',
                    borderRadius: '20px',
                    transition: 'opacity 500ms',
                    opacity: 0,
                    transform: 'translateX(-10px) translateY(-2px)'
                  },
                  "&:hover::before": {
                    opacity: 1
                  }
                }}>
                  <a href={`/projects/${data.name.toLowerCase()}`}>&gt; go!</a>
                </Typography>
              </div>
            </div>
            {!data.noGithub && <CollapseBar projectName={data.name} />}
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </div>
  </Layout >
)

const CollapseBar: React.FC<{ projectName: string }> = ({ projectName }) => {
  const [opened, setOpened] = React.useState(false);

  const handleClick = () => {
    setOpened(prev => !prev);
  }

  return (
    <div className="collapse-bar" style={{
      width: '100%',
      textAlign: 'center',
      color: '#777777',
      gridColumnStart: 1, gridRowStart: 1, alignSelf: 'flex-end',
      pointerEvents: 'none'
    }}>
      <IconButton onClick={handleClick} sx={{ pointerEvents: 'fill', transition: 'all 250ms ease', transform: `translateY(${opened ? '-15%' : 'auto'})` }} >
        <KeyboardDoubleArrowUpIcon sx={{ transition: 'all 250ms ease 100ms', transform: `rotate(${opened ? '180deg' : 0})` }} />
      </IconButton>
      <Slide direction="up" in={opened} unmountOnExit mountOnEnter>
        <div className='collapse-body' style={{ backgroundColor: 'black', padding: '15px 10px 10px 10px', boxShadow: 'inset 0 7px 7px #777777' }}>
          <div style={{ display: 'flex' }}>
            <GithubIcon sx={{ margin: '10px' }} />
            <span style={{ textAlign: 'left' }}>
              이 프로젝트는 깃허브 레포지토리가 있습니다!<br />
              <strong>한번 둘러보시고 좋으면 Star를 눌러주세요!</strong>
            </span>
          </div>
          <div style={{ marginTop: '20px', display: opened ? 'block' : 'none' }}>
            <GithubRepoCardFetcher username='sharlottes' repository={projectName} dark />
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default Projects