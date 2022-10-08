import { Divider, Paper, IconButton, Typography, Button, Box, Tooltip, Avatar, AvatarGroup, type PaperProps, Stack, BoxProps, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';
import Layout from "components/Layout";
import { motion, MotionProps, useAnimationControls } from 'framer-motion';
import Link from "next/link";
import React from 'react';
import { GithubIcon } from 'src/assets/icons';
import HorizontalScrollGroup from 'src/components/HorizontalScrollGroup';
import ProgressiveTypography from 'src/components/ProgressiveTypography';


const FadeUpTypography: React.FC<{ 
  delay?: number | undefined,
  label?: string | undefined
} & TypographyProps & {motion?: MotionProps}> = ({ 
  delay = 1.5, 
  label,
  children, 
  motion: motionProps,
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1, marginBottom: '20px' }}
    transition={{ delay }}
    {...motionProps}
  >
    <Typography {...props}>{label}{children}</Typography>
  </motion.div>
)

const Home: React.FC = () => {
  return (
  <Layout>
    <TitleSection />
    <ListSection />
    <ProjectSection />
  </Layout>
  )
}

// ---------------------- Title Section ---------------------- //

const TitleSection: React.FC = () => {
  return (
    <Box sx={{ marginTop: '60px', width: '100%' }}>
      <ProgressiveTypography 
        variant='h1'  
        sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}
        label="Sharlotte"  
        motion={{ animate: 'show' }}
      />
      <FadeUpTypography 
        variant='body1' 
        sx={{width: '100%', textAlign: 'center' }} 
      >
        2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 중인 고등학생입니다!
      </FadeUpTypography>
    </Box>
  )
}

// ---------------------- List Section ---------------------- //

const ListItem: React.FC<{
  title: JSX.Element | string,
  description: JSX.Element | string,
  image: JSX.Element | string,
  direction: 'left' | 'right',
  children?: JSX.Element,
  animateRef?: React.MutableRefObject<{ start: (delay: number)=>void } | undefined> | undefined
} & BoxProps & { motion?: MotionProps | undefined }> = ({
  title,
  description,
  image,
  direction,
  children,
  animateRef,
  motion: motionProps,
  ...props
}) => {
  return (
    <Box {...props}>
      <div style={{ 
        display: 'flex', 
        textAlign: direction, 
        justifyContent: 'flex-start', 
        flexDirection: direction === 'left' ? 'row' : 'row-reverse'
      }}>
        {typeof image === 'string' ? <img src={image} height='100px' /> : image}
        <div style={{ marginLeft: '20px' }}>
          {typeof title === 'string' 
            ? <ProgressiveTypography 
                animateRef={animateRef}
                variant='h3' 
                sx={{ fontWeight: 'bold' }} 
                label={title} 
                motion={motionProps} 
              /> 
            : title
          }
          {typeof description === 'string' 
            ? <FadeUpTypography variant='body2' delay={1} label={description}/> 
            : description
          }
        </div>
      </div>
      {children}
    </Box>
  )
}

const ListSection: React.FC = () => {
  const listAnimateControl = useAnimationControls();
  const data = [
    { title: 'React', description: '리액트!', image: 'images/langs/react.png', ref: React.useRef<{ start: (delay: number)=>void }>() },
    { title: 'React', description: '리액트!', image: 'images/langs/react.png', ref: React.useRef<{ start: (delay: number)=>void }>()},
    { title: 'React', description: '리액트!', image: 'images/langs/react.png', ref: React.useRef<{ start: (delay: number)=>void }>()},
    { title: 'React', description: '리액트!', image: 'images/langs/react.png', ref: React.useRef<{ start: (delay: number)=>void }>()},
    { title: 'React', description: '리액트!', image: 'images/langs/react.png', ref: React.useRef<{ start: (delay: number)=>void }>()}
  ]

  React.useEffect(() => {
    listAnimateControl.start(({i, ref}) => {
      ref.current?.start(2 + i * 0.5);
      
      return {
        opacity: 1, 
        marginBottom: '20px',
        transition: { delay: 2 + i * 0.5 }
      }
    });
  }, []);

  return (
    <Stack direction='column' spacing={2} sx={{ height: '500px', width: '100%', padding: '100px' }}>
      {data.map(({ title, description, image, ref}, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={listAnimateControl}
          custom={{i, ref}}
        >
          <ListItem 
            {...{title, description, image}}
            direction={i % 2 == 0 ? 'left' : 'right'} 
            animateRef={ref}
          />
        </motion.div>
      ))}
    </Stack>
  )
}

// ---------------------- Project Section ---------------------- //

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

const ProjectSection: React.FC = () => {
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
  const allTags: tagType[] = ['javascript', 'typescript', 'java', 'cs', 'dart', 'html', 'css', 'react', 'next', 'flutter', 'unity', 'libgdx'];
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
    <TagContext.Provider value={{ tags, setTags, addTag, removeTag }}>
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

export default Home;