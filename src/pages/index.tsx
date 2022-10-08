import { Divider, Paper, IconButton, Typography, Button, Box, Tooltip, Avatar, AvatarGroup, type PaperProps, Stack, BoxProps, TypographyProps } from '@mui/material';
import { styled } from '@mui/system';
import Layout from "components/Layout";
import { motion, MotionProps, useAnimationControls } from 'framer-motion';
import Link from "next/link";
import React from 'react';
import { listAnimatonRefType } from 'src/@type';
import { GithubIcon } from 'src/assets/icons';
import HorizontalScrollGroup from 'src/components/HorizontalScrollGroup';
import ProgressiveTypography from 'src/components/ProgressiveTypography';
import FadeUpTypography from 'src/components/FadeUpTypography';

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
        motion={{
          whileInView: { opacity: 1, marginBottom: '20px' },
          transition: { delay: 1.5 }
        }}
      >
        2019년부터 지금 {new Date().getFullYear()}년 까지, 웹, 앱, 게임, 봇 등 여러 분야를 개발하고 탐구하는 중인 고등학생입니다!
      </FadeUpTypography>
    </Box>
  )
}

// ---------------------- List Section ---------------------- //

const ListItem: React.FC<{
  title: string,
  description: JSX.Element | string,
  image: JSX.Element | string,
  direction: 'left' | 'right',
  children?: JSX.Element,
  titleRef?: listAnimatonRefType | undefined,
  descriptionRef?: listAnimatonRefType | undefined,
} & BoxProps & { motion?: MotionProps | undefined }> = ({
  title,
  description,
  image,
  direction,
  children,
  titleRef,
  descriptionRef,
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
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
          <ProgressiveTypography variant='h3' animateRef={titleRef} label={title} align={direction} sx={{ fontWeight: 'bold', textAlign: direction }} motion={motionProps}/>
          <FadeUpTypography variant='body2' animateRef={descriptionRef}>{description}</FadeUpTypography>
        </div>
      </div>
      {children}
    </Box>
  )
}

const ListSection: React.FC = () => {
  const listAnimateControl = useAnimationControls();
  const data = [
    { 
      title: 'Java/libGDX',
      description: <>
        Java는 직접 작성하지 않고 코드 리딩을 한 시간까지 생각한다면 Javascript보다 더 앞서서 가장 처음 접한 프로그래밍 언어입니다.<br/>
        Mindustry는 제 코딩 스타일에 거대한 영향과 높은 이해, 사고방식을 선물해주었으며 Java 코딩에 매우 큰 교본이 돼주었습니다.<br/>
        Java는 Javascript와 달리 극단적으로 엄격하고, 정형적이며, 어찌보면 비생산적입니다. 하지만 오히려 그렇기에 자바스크립트로 부족했던 OOP 이해의 완성과 SOLID의 이해를 도와줬습니다.
      </>,
      image: 
      <div style={{ display: 'flex' }}>
        <img src='images/langs/java.png' height='50px' />
        <img src='images/langs/libgdx.png' height='50px' />
      </div>
    },
    { 
      title: 'Javascript', 
      description: <>
        자바스크립트는 JSON에 이어 제가 처음으로 접하게 된 프로그래밍 언어였습니다.<br/>
        완전한 ECMA Javascript가 아닌 Rhino Javascript로써 Mindustry의 Java 소스코드를 이해하며 스크립팅과 모딩을 해왔기에 Java 지식 또한 상승하게 되는 경험이 되었습니다.<br/>
        또한 저는 Rhino Javascript를 넘어, KakaoBot과 DiscordBot을 위한 ECMA Javascript 프로그래밍을 하면서 ECMA의 새로운 문법을 이해했습니다.<br/>
        자바스크립트는 약타입 언어, 비-클래스 기반 언어라는 점에서 명백한 단점과 차이점이 존재하지만 오히려 그럼으로써 저에게 프로그래밍 로직 이해를 쉽도록 만들어줬습니다.
      </>, 
      image: 'images/langs/javascript.png'
    },
    { 
      title: 'Typescript', 
      description: <>
        ECMA Javascript에 관한 개발 도중 Typescript로 전향함으로써 더 강력한 타입과 함께 더 안정적인 프로젝트를 구성하는 방법을 알게 되었습니다.<br/>
        또한 React 웹사이트를 개발하면서 매우 자유롭고 유동적인 유틸리티 타입 활용과 타입 분배에 대해 이해하면서 타입스크립트 타입 활용에 능숙해졌습니다.<br/>
        Typescript는 저에게 Java 외에 SOLID 원칙을 부분적으로 수행할 수 있는 언어이자 Javascript의 완전한 상위호환으로 받아들여집니다.<br/>
        타입스크립트는 다른 OOP 언어에서 절대 볼 수 없는 특별한 타입 연산을 가지고 있습니다. 이것은 저에게 타입에 대한 견해를 더 확장시켜주는 계기가 되었으며, 개인적으로 이것이 타입스크립트의 강점이라 봅니다.
      </>, 
      image: 'images/langs/typescript.png'
    },
    { 
      title: 'React/Next', 
      description: <>
        리액트는 웹사이트에 관해 알아보며 html, css, js를 간단히 접한 후 발견한 첫 프론트엔드 프레임워크였습니다.<br/>
        카운트 앱을 만들다 난해한 css 속성과 받아들이기 힘들었던 props 계층, 상태 관리가 맞물러 흥미를 잃다가 이후 발전된 프로그래밍 기술과 Next.js, MUI 프레임워크와 함께 디스코드 봇 리스트 웹사이트를 만들다가 포트폴리오로 주제를 전환했습니다.<br/>
        개발을 거듭할수록 HOC와 hooks, FC, CC, 그리고 이것을 작성중인 지금 ref까지 리액트에 관한 여러가지 특징들을 이해하고 활용해오고 있습니다.<br/>
        이것은 몇가지 사이드 프로젝트로 증명됩니다: KakaoNacksee와 PrincessSavior download 웹페이지. 이것들은 이 웹사이트를 개발하며 축적된 지식을 기반으로 간단히 시도한 프로젝트였고, 결과적으로 빠른 프로젝트 설정과 framer-motion의 이해에 기여했습니다.
      </>, 
      image: 
      <div style={{ display: 'flex' }}>
        <img src='images/langs/react.png' height='50px' />
        <img src='images/langs/next.png' height='50px' />
      </div>
    },
    { 
      title: 'Unity/C#', 
      description: <>
        C#은 Java 다음으로 Kotlin과 함께 다음 OOP 언어 정복 대상이였습니다.<br/>
        하지만 C# 자체의 사용은 .NET를 이용한 디스코드 봇이나 데스크톱 어플리케이션, 웹 어셈블리와 같이 생소하거나 포럼이 좁은 영역이라 진입하기 어려웠습니다.<br/>
        그러나 Unity는 이들과 달리 적절한 조건과 "게임 제작" 이라는 명분을 주었기에 적절했습니다.<br/>
        유니티 게임 개발의 기록은 매우 최근이며 학회 XREAL의 입회를 통해 유니티 게임 개발의 폭넓은 성장을 생각하고 있습니다.
      </>, 
      image: 
        <div style={{ display: 'flex' }}>
          <img src='images/langs/cs.png' height='50px' />
          <img src='images/langs/unity.png' height='50px' />
        </div>
    },
    {
      title: 'Flutter/Dart',
      description: <>
        Flutter, Dart는 Java 안드로이드 네이티브 어플리케이션의 개발 시도가 난해하고 어려웠던 gui 편집으로 관심 밖이였던 어플리케이션 개발의 선두주자가 되었습니다.<br/>
        이들은 React의 상태 관리를 Functional Component가 아닌 Class Component에 둠과 동시에 많았던 생명주기 메서드들을 정리했습니다.<br/>
        또한 대부분의 스타일링이 개별 enum 또는 정적 클래스로 구성된 래퍼 클래스로 구성되어 원하는 컴포넌트에 스타일링 컴포넌트를 감싸기만 해도 스타일링이 가능할 정도로 쉬웠습니다.<br/>
        이와 같은 Flutter 자체의 특징 뿐만이 아니라 Javascript의 문법적 상위호환을 추구하려 했던 Dart의 화살표 함수 간략화, 일부 예약어 추가 지원, 더 많은 타입, private 자체 지원 등은 언어를 특별하게 만들어주면서도 익숙한 언어와 유사하여 받아들이기 쉬웠습니다.
      </>,
      image: 
      <div style={{ display: 'flex' }}>
        <img src='images/langs/flutter.png' height='50px' />
        <img src='images/langs/dart.png' height='50px' />
      </div>
    }
  ]

  const titleRef: listAnimatonRefType = { list: [] };
  const descriptionRef: listAnimatonRefType = { list: [] };
  React.useEffect(() => {
    setTimeout(()=>{
      listAnimateControl.start((i: number) => {
        titleRef.list[i](1 + i * 0.5);
        descriptionRef.list[i](1.2 + i * 0.5);
        
        return {
          opacity: 1, 
          marginBottom: '20px',
          transition: { delay: 1 + i * 0.5 }
        }
      });
    }, 1000);
  }, []);

  return (
    <Box sx={{ height: '500px', width: '100%', padding: '100px' }}>
      {data.map(({ title, description, image}, i) => (
        <motion.div
          key={i}
          custom={i}
          initial={{ opacity: 0 }}
          animate={listAnimateControl}
          style={{ marginTop: 2 }}
        >
          <ListItem 
            {...{title, description, image, titleRef, descriptionRef }}
            direction={i % 2 == 0 ? 'left' : 'right'} 
          />
        </motion.div>
      ))}
    </Box>
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