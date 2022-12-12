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
import { styled } from '@mui/system'

const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  transform: 'scale(0.8)', 
  color: 'text.secondary', 
  transition: 'color 300ms ease-out', 
  "&:hover": { 
    color: 'text.primary' 
  }
})

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
    display: 'flex', gap: '10px', alignItems: 'center',
    float: 'right',
    "& div": { 
      transition: 'opacity 500ms',
      opacity: 0,
    },
    "& :nth-child(1)": {
      width: 24, height: 24
    },
    "& :nth-child(2)": {
      width: '60px', height: '30px',
      borderRadius: '20px',
      border: '1px solid #dcdcdc',
      padding: '2px 10px',
      transition: 'opacity,color 500ms,500ms',
      transitionDuration: '500ms',
      color: 'black',
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('md')]: {
        "&:nth-child(2)": {
          color: 'white',
          "&::before": {
            opacity: 1
          }
        }
      },
      "& a": {
        position: 'absolute',
      },
      "&:hover": {
        color: 'white',
        "&::before": {
        opacity: 1
        }
      },
      "&::before": {
        content: "''",
        position: 'absolute',
        width: 'inherit', height: 'inherit',
        borderRadius: '20px',
        backgroundImage: 'linear-gradient(30deg, #50d4d9, #b662c4)',
        transition: 'opacity 500ms',
        opacity: 0,
        transform: 'translateX(-10px) translateY(-2px)'
      }
    }
  },
  "& .collapse-bar": {
    width: '100%', height: '100%',
    textAlign: 'center',
    color: '#777777',
    gridColumnStart: 1, gridRowStart: 1, alignSelf: 'flex-end',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity,transform',
    transitionDuration: '100ms,250ms',
    transitionDelay: '125ms',
    transitionTimingFunction: 'ease,cubic-bezier(.01,1.76,.67,.79)',
    "&>div": {
      backgroundColor: 'black',
      padding: '15px 10px 10px 10px',
      boxShadow: 'inset 0 7px 7px #777777',
      height: '100%',
      pointerEvents: 'fill',
      "&>div": {
        height: '100%'
      }
    }
  },
  "&:hover": {
    boxShadow: '0 0 10px black',
    "& .MuiDivider-root": {
      width: '100%',
      backgroundColor: '#a9d8ff'
    },
    "& .link-btn": {
      "& >div": {
        opacity: 1,
      }
    },
    "& .collapse-bar": {
      opacity: 1,
      transform: 'translateY(80%)'
    }
  }
}))

const projectData: Array<projectDataType['projects'][0] & { owner: string }>
  = (require('public/data/projectData.json') as projectDataType[])
    .map(({ owner, projects }) => projects.map(proj => ({ ...proj, owner })))
    .flat();

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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {data.icon && <img src={`/images/icon/${data.icon}.png`} alt="" style={{ height: '1.5rem', width: '1.5rem', marginRight: '5px' }} />}
                  <div style={{ display: 'flex' }}>
                    <Typography variant='h5'>{data.name}</Typography>
                    {data.link &&
                      <a href={data.link}>
                        <Tooltip leaveDelay={300} title={
                          <div style={{ display: 'flex' }}>
                            <InfoIcon fontSize='small' sx={{ margin: '2px' }} />
                            <span>
                              이 프로젝트는 배포가 완료되었어요.<br />
                              <strong>지금 확인해보세요!</strong>
                            </span>
                          </div>
                        }>
                          <StyledOpenInNewIcon />
                        </Tooltip>
                      </a>
                    }
                  </div>
                </div>
                <Divider sx={{ margin: '5px 0' }} />
                <Typography variant='body1'>{data.description}</Typography>
              </div>
              <div className="link-btn">
                <div>
                  {!data.noGithub && 
                    <a href={`https://github.com/${data.owner}/${data.name}`}>
                      <GithubIcon />
                    </a>
                  }
                </div>
                <div>
                  <a href={`/projects/${data.name.toLowerCase()}`}>
                    &gt; go!
                  </a>
                </div>
              </div>
            </div>
            {!data.noGithub && <CollapseBar author={data.owner} name={data.name} />}
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </div>
  </Layout >
)

const CollapseBar: React.FC<{ author: string, name: string }> = ({ author, name }) => {
  const [opened, setOpened] = React.useState(false);

  return (
    <div className="collapse-bar" style={{ transform: `translateY(${opened ? '0%' : '80%'})` }}>
      <IconButton onClick={() => setOpened(prev => !prev)} sx={{ pointerEvents: 'fill', }} >
        <KeyboardDoubleArrowUpIcon sx={{ transition: 'transform 250ms ease 100ms', transform: `rotate(${opened ? '180deg' : 0})` }} />
      </IconButton>
      <Slide direction="up" in={opened} unmountOnExit mountOnEnter>
        <div>
          <GithubRepoCardFetcher username={author} repository={name} dark />
        </div>
      </Slide>
    </div>
  )
}

export default Projects