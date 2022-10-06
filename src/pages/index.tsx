import { Divider, Paper, IconButton, Typography, Button, Box, Tooltip, Avatar, AvatarProps, AvatarGroup, PaperProps } from '@mui/material';
import { Container, styled } from '@mui/system';
import Layout from "components/Layout";
import Link from "next/link";
import React from 'react';
import { GithubIcon } from 'src/assets/icons';
import HorizontalScrollGroup from 'src/components/HorizontalScrollGroup';

type tagType = 'javascript' | 'typescript' | 'java' | 'cs' | 'dart' | 'html' | 'css' | 'react' | 'next' | 'flutter' | 'unity' | 'libgdx'

const TagContext = React.createContext<{ 
  tags: tagType[], 
  setTags: (tags: tagType[]) => void,
  addTag: (tag: tagType) => void,
  removeTag: (tag: tagType) => void 
}>({ 
  tags: [],
  setTags: ()=>{},
  addTag: ()=>{},
  removeTag: ()=>{} 
});

const StyledAvatar = styled(Avatar)<{ highlighted: string }>(({ highlighted })=>({
  width: '30px', height: '30px', 
  marginLeft: '5px', 
  backgroundColor: 'white', 
  transition: 'box-shadow 300ms ease-out',
  zIndex: 999,
  ...(Boolean(highlighted) && {
    boxShadow: '1px 1px 1px 1px'
  }),
}));

const Project: React.FC<{
  name: string, 
  description: string|JSX.Element, 
  tags: tagType[], 
  image?: string,
  github_url?: string,
  children?: JSX.Element
} & PaperProps> = ({ 
  name, 
  description, 
  tags,
  image, 
  children, 
  github_url = `https://github.com/sharlottes/${name}`,
  ...props
}) => {
  const { tags: currentTags, removeTag, addTag } = React.useContext(TagContext);
  return (
    <Paper sx={{ 
      margin: '10px', 
      padding: '10px', 
      width: '350px', height: '100%', 
      display: 'flex', flexDirection: 'column', 
      alignContent: 'space-between' 
    }} {...props}>
      <div>
        <div>
          <Link href={github_url}>
            <IconButton style={{ display: 'flex', float: 'right' }}> 
              <GithubIcon sx={{ transition: 'color 300ms', "&:hover": { color: 'black' }}} />
            </IconButton>
          </Link>
          <Typography sx={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{name}</Typography>
          {image&&<img src={image} width='calc(100% - 50px)' />}
        </div>
        <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
        <div>
          <Typography>{description}</Typography>
          {children}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <AvatarGroup total={tags.length}>
              {tags.map((tag, i) => 
                <Tooltip key={i} title={tag} onClick={() => currentTags.includes(tag) ? removeTag(tag) : addTag(tag)}>
                  <StyledAvatar key={i} src={`images/langs/${tag}.png`} alt='' highlighted={currentTags.includes(tag) ? 'asdf' : ''} />
                </Tooltip>
              )}
            </AvatarGroup>
          </div>
        </div>
      </div>
      <Link href={`/projects/${name}`}>
        <Button variant='contained' sx={{ margin: '5px' }}>More</Button>
      </Link>
    </Paper>
  )
}

const GridProjects: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (
    <Box
    sx={{ 
      display: { xs: 'none', md: 'flex' }, 
      justifyContent: 'flex-start', 
      alignItems: 'stretch',
      justifyItems: 'stretch',
      flexFlow: 'row wrap',
      width: '100%',
      padding: '10px'
    }}>
      {children}
    </Box>
  )
}

const ScrollProjects: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (    
    <Box
      sx={{ 
        display: { xs: 'block', md: 'none' }, 
        overflow: 'hidden',
        width: '100%',
        padding: '10px'
      }}
    >
      <HorizontalScrollGroup>
        {children}
      </HorizontalScrollGroup>
    </Box>
  )
}

const ParaDivider: React.FC<{ label?: string, children?: JSX.Element }> = ({ label, children }) => 
  <Divider textAlign='left' sx={{ marginTop: '10px', marginBottom: '10px' }}>
  <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
    {label}
    {children}
  </Typography>
</Divider>

const allTags: tagType[] = ['javascript', 'typescript', 'java', 'cs', 'dart', 'html', 'css', 'react', 'next', 'flutter', 'unity', 'libgdx'];
const Home: React.FC = () => {
  const [tags, setTags] = React.useState<tagType[]>([])
  //TODO: how about jsonlizing?
  const projects = [
    <Project 
      name='Informatis' 
      description="여러가지 유용한 정보와 기능들을 추가 UI로 제공해주는 Mindustry의 Java모드"
      tags={['java', 'libgdx']}
    />,
    <Project 
      name='Sharustry' 
      description="새로운 포탑, 새로운 유닛, 새로운 블록을 추가하여 게임을 더 풍요롭게 즐길 수 있도록 제작된 Mindustry의 Java모드"
      tags={['java', 'libgdx']}
    />,
    <Project
      name='KakaoBot'
      description="안드로이드 카카오톡 알람과 라이노 자바스크립트를 통해 카카오톡 메시지에 자동응답을 하는 봇 스크립트"
      tags={['java', 'javascript']}
    />,
    <Project 
      name='SharBot'
      description="discord.js와 typescript로 구성된 다기능 디스코드 봇"
      tags={['typescript']}
    />,
    <Project
      name='RealTimeRPG'
      description="SharBot의 시스템을 기반으로 제작된 간단한 RPG 장르의 디스코드 봇 게임"
      tags={['typescript']}
    />,
    <Project
      name='KakaoBridge'
      description="remote-kakao로 카카오톡 봇과 디스코드 봇 서버간 TCP 통신을 하여 문자 메시지 쌍방향 송수신이 가능하도록 개발된 이중 봇 프로젝트"
      tags={['java', 'javascript', 'typescript']}
    />,
    <Project
      name='KakaoNacksee'
      description="뿌링클 선착순 선물을 1초 차이로 놓쳐버린 분노로 만든 낚시 웹사이트"
      tags={['typescript', 'react', 'next', 'html', 'css']}
    />,
    <Project
      name='Timer'
      description="Flutter 공부용으로 개발중인 타이머/스케쥴링 어플리케이션"
      tags={['dart', 'flutter']}
    />,
    <Project
      name='CardDefense'
      description="팀 GameStudio에서 유니티로 개발중인 디펜스 장르의 모바일 카드게임"
      github_url='https://github.com/Gamer-Studio'
      tags={['cs', 'unity']}
    />,
    <Project
      name='ProjectUnity'
      description="팀 Avant에서 개발중인 최대 규모의 Mindustry Java모드"
      github_url='https://github.com/AvantTeam/ProjectUnityPublic'
      tags={['java', 'libgdx']}
    />
  ]
  const filteredProjects = projects.filter(project => tags.some(tag => project.props.tags.includes(tag)));
  const addTag = (tag: tagType) => {
    setTags(prev => [...prev, tag]);
  }
  const removeTag = (tag: tagType) => {
    setTags(prev => {
      const copied = [...prev];
      copied.splice(copied.indexOf(tag), 1);
      return copied;
    });
  }

  return (
  <Layout>
    <Container>
      <Typography variant='h1' sx={{ fontWeight: 'bold', marginTop: '60px', width: '100%', textAlign: 'center' }}>
        Sharlotte
      </Typography>
      <Typography variant='body1' sx={{width: '100%', textAlign: 'center' }}>
        2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 중인 고등학생입니다!
      </Typography>
    </Container>
    <TagContext.Provider value={{ tags, setTags, addTag, removeTag }}>
      <ParaDivider label="Projects" />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {allTags.map((tag, i) => 
          <Tooltip key={i} title={tag} onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}>
            <StyledAvatar key={i} src={`images/langs/${tag}.png`} alt='' highlighted={tags.includes(tag) ? 'asdf' : ''} />
          </Tooltip>
        )}
      </div>
      <ScrollProjects>{filteredProjects}</ScrollProjects>
      <GridProjects>{filteredProjects}</GridProjects>
    </TagContext.Provider>
  </Layout>
  )
}


export default Home;