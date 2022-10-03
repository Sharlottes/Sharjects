import { Divider, Grid, GridProps, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Layout from "components/Layout";
import { } from "src/@type";
import Link from "next/link";
import { PropsWithChildren } from 'react';

interface ProjectProps extends PropsWithChildren {
  name: string, 
  description: string|JSX.Element, 
  image?: string
}

const Project: React.FC<ProjectProps> = ({ name, description, image, children }) => {
  return <Link href={`/projects/${name}`}>
    <Paper sx={{ padding: '10px', width: '300px' }}>
      <Typography sx={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{name}</Typography>
      {image&&<img src={image} width='250px' />}
      <Divider sx={{ marginTop: '5px', marginBottom: '5px' }} />
      <Typography>{description}</Typography>
      {children}
    </Paper>
  </Link>
}
const Projects: React.FC<{ children: JSX.Element[] } & GridProps> = ({ children, ...props }) => {
  return (
    <Grid container spacing={3} {...props}>
      {children.map((child, i) => <Grid item key={i}>{child}</Grid>)}
    </Grid>
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
    <Projects sx={{ padding: '10px' }}>
      <Project 
        name='Informatis' 
        description="여러가지 유용한 정보와 기능들을 추가 UI로 제공해주는 Mindustry의 Java모드"
      />
      <Project 
        name='Sharustry' 
        description="Informatis와 달리, 다른 여러 모드들처럼 기존 게임에서 더 나아가 새로운 포탑, 새로운 유닛, 새로운 블록을 추가하여 게임을 더 풍요롭게 즐길 수 있도록 제작된 Mindustry의 Java모드"
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
      />
      <Project
        name='ProjectUnity'
        description="팀 Avant에서 개발중인 최대 규모의 Mindustry Java모드"
      />
    </Projects>
  </Layout>

export default Home;