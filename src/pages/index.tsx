import { Divider, Stack, Paper, IconButton, Typography, Button, type StackProps } from '@mui/material';
import { Container } from '@mui/system';
import Layout from "components/Layout";
import Link from "next/link";
import { PropsWithChildren } from 'react';
import { GithubIcon } from 'src/assets/icons';

interface ProjectProps extends PropsWithChildren {
  name: string, 
  description: string|JSX.Element, 
  image?: string,
  github_url?: string
}

const Project: React.FC<ProjectProps> = ({ name, description, image, children, github_url = `https://github.com/sharlottes/${name}`}) => {
  return (
    <Paper sx={{ 
      margin: '10px', 
      padding: '10px', 
      width: '350px', height: '100%', 
      display: 'flex', flexDirection: 'column', 
      alignContent: 'space-between' 
    }}>
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
        </div>
      </div>
      <Link href={`/projects/${name}`}>
        <Button variant='contained' sx={{ margin: '5px' }}>More</Button>
      </Link>
    </Paper>
  )
}
const Projects: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (
    <div
    style={{ 
      display: 'flex', 
      justifyContent: 'flex-start', 
      alignItems: 'stretch',
      justifyItems: 'stretch',
      flexFlow: 'row wrap',
      width: '100%',
      padding: '10px'
    }}>
      {children}
    </div>
  )
}

const Home: React.FC = () =>
  <Layout>
    <Container>
      <Typography variant='h1' sx={{ fontWeight: 'bold', marginTop: '60px', width: '100%', textAlign: 'center' }}>
        Sharlotte
      </Typography>
      <Typography variant='body1' sx={{width: '100%', textAlign: 'center' }}>
        2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 중인 고등학생입니다!<br/>
      </Typography>
    </Container>
    <Divider textAlign='left' sx={{ marginTop: '10px', marginBottom: '10px' }}>
      <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
        Projects
      </Typography>
    </Divider>
    <Projects>
      <Project 
        name='Informatis' 
        description="여러가지 유용한 정보와 기능들을 추가 UI로 제공해주는 Mindustry의 Java모드"
      />
      <Project 
        name='Sharustry' 
        description="새로운 포탑, 새로운 유닛, 새로운 블록을 추가하여 게임을 더 풍요롭게 즐길 수 있도록 제작된 Mindustry의 Java모드"
      />
      <Project
        name='KakaoBot'
        description="안드로이드 카카오톡 알람과 라이노 자바스크립트를 통해 카카오톡 메시지에 자동응답을 하는 봇 스크립트"
      />
      <Project 
        name='SharBot'
        description="discord.js와 typescript로 구성된 다기능 디스코드 봇"
      />
      <Project
        name='RealTimeRPG'
        description="SharBot의 시스템을 기반으로 제작된 간단한 RPG 장르의 디스코드 봇 게임"
      />
      <Project
        name='KakaoBridge'
        description="remote-kakao로 카카오톡 봇과 디스코드 봇 서버간 TCP 통신을 하여 문자 메시지 쌍방향 송수신이 가능하도록 개발된 이중 봇 프로젝트"
      />
      <Project
        name='KakaoNacksee'
        description="뿌링클 선착순 선물을 1초 차이로 놓쳐버린 분노로 만든 낚시 웹사이트"
      />
      <Project
        name='Timer'
        description="Flutter 공부용으로 개발중인 타이머/스케쥴링 어플리케이션"
      />
      <Project
        name='CardDefense'
        description="팀 GameStudio에서 유니티로 개발중인 디펜스 장르의 모바일 카드게임"
        github_url='https://github.com/Gamer-Studio'
      />
      <Project
        name='ProjectUnity'
        description="팀 Avant에서 개발중인 최대 규모의 Mindustry Java모드"
        github_url='https://github.com/AvantTeam/ProjectUnityPublic'
      />
    </Projects>
  </Layout>

export default Home;