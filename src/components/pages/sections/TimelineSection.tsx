import { Box, Card, Divider, Step, StepContent, StepLabel, Stepper, styled, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { toFit } from 'src/utils/toFit';
import { useSpring } from "framer-motion";
import ScrollTop from 'src/components/ScrollTop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GithubUserCardFetcher from 'src/components/GithubUserCard'
import RepoCard, { RepoCardProps } from "react-repo-card";

interface StyledRepoCard extends Omit<RepoCardProps, 'username'> {
  username?: string | undefined
}
const StyledRepoCard: React.FC<StyledRepoCard> = ({
  username = 'sharlottes',
  ...props
}) =>
  <div style={{
    margin: '10px',
    width: 'min(50vw, 400px)'
  }}>
    <RepoCard username={username} {...props} />
  </div>

const TimelineContentTitle: React.FC<PropsWithChildren> = ({ children }) =>
  <div style={{ marginBottom: '5px' }}>
    <Typography variant='h5'>
      {children}
    </Typography>
    <Divider sx={{ transform: 'translateX(-20px)', width: '50vw', margin: '5px 0px' }} />
  </div>

const TimelineContent: React.FC<PropsWithChildren> = ({ children }) =>
  <div style={{ marginLeft: '10px' }}>
    {children}
  </div>


type monthType = `${2020 | 2021 | 2022}.${string}`;
type dateType = `${monthType}.${string}`;
const events: Record<dateType | monthType, JSX.Element> = {
  '2020.02.08': (
    <>
      <TimelineContentTitle>깃허브 계정 생성</TimelineContentTitle>
      <TimelineContent>
        <div style={{ margin: '10px' }}>
          <GithubUserCardFetcher username='Sharlottes' />
        </div>
      </TimelineContent>
    </>
  ),
  '2020.08.08': (
    <>
      <TimelineContentTitle>깃허브 첫 Repository 생성(SharMapPackage)</TimelineContentTitle>
      <TimelineContent>
        <StyledRepoCard repository="SharMapPackage" />
      </TimelineContent>
    </>
  ),
  '2020.08.25': (
    <>
      <TimelineContentTitle>World War 2 모드 개발 시작</TimelineContentTitle>
      <TimelineContent>
        제작한 모딩 위키와 실험 단계에 있던 ExampleMod 개발 경험을 토대로 JSON으로 팀 모드를 개발하고자 했습니다. <br />
        하지만 팀 내분으로 인해 9일만에 개발이 중단되었습니다.
        <StyledRepoCard repository="WorldWar2" />
      </TimelineContent>
    </>
  ),
  '2020.09.26': (
    <>
      <TimelineContentTitle>한국어 모딩 위키 제작</TimelineContentTitle>
      <TimelineContent>
        완벽한 것은 아니나 클래스와 인터페이스에 관한 기본 개념을 이해하고 접근 지정자, final, static같은 여러가지 특별한 키워드를 정리하고 습득하는 일종의 복습 시간이 돼주었습니다.
        <StyledRepoCard repository="Korean-modding-wiki" />
      </TimelineContent>
    </>
  ),
  '2020.09.29': (
    <>
      <TimelineContentTitle>ExampleMod 개발</TimelineContentTitle>
      <TimelineContent>
        ExampleMod는 모딩 위키로 쌓은 지식들을 실험하고 실제로 배포까지 한 제 첫번째 모드입니다.<br />
        직접 제작을 해봄으로써 부족한 지식들을 매꿀 수 있었으나 JSON에만 국한되어 부족함이 많았습니다.
        <StyledRepoCard repository="exampleMod" />
      </TimelineContent>
    </>
  ),
  '2020.10.04': (
    <>
      <TimelineContentTitle>ExampleMod Javascript 개발</TimelineContentTitle>
      <TimelineContent>
        기존 JSON 모딩은 콘텐츠를 추가하여 JSON 속성 대응하는 값만 수정하는 방식으로, 매우 제한적인 개발 환경을 갖추고 있었습니다.<br />
        이때문에 저는 Javascript를 통해 모드를 개발함으로써 더 넓은 개발 환경을 가지고자 했고, 특이하게 Rhino Javascript로 언어를 시작한 사람이 되었습니다.
        <StyledRepoCard repository="exampleMod" />
      </TimelineContent>
    </>
  ),
  '2020.10.24': (
    <>
      <TimelineContentTitle>Team Unity 가입</TimelineContentTitle>
      <TimelineContent>
        Team Unity (팀 유니티)는 Mindustry의 유명 모드 제작자들이 모여 지금까지 개발중인 대형 모드 프로젝트입니다. <br />
        완벽한 "팁 협업"이라 부를 순 없었지만 팁 협업에서 브렌치와 컨플릭트의 중요성과 코드 규칙 등 기본적인 것들을 익혔습니다. <br />
        특히, 방대한 Mindustry 소스코드와 커뮤니티에선 접하기 어려웠던 질 높은 커뮤니케이팅은 좋은 경험이였습니다.
        <StyledRepoCard username='avantteam' repository="projectunitypublic" />
      </TimelineContent>
    </>
  ),
  '2021.02.07': (
    <>
      <TimelineContentTitle>첫 Mindustry JAVA 모드, Sharustry 개발 시작</TimelineContentTitle>
      <TimelineContent>
        <span style={{ fontFamily: 'bold' }}>Sharustry</span>는 제 첫번째 Mindustry 자바 모드입니다.<br />
        Sharustry는 다중 포탑에 초점을 둔 모드였습니다. 지금은 Progress material이 다중 포탑 기술의 종주 위치를 되찾았지만 이 모드도 약 50개의 stars가 보여주듯이 어느정도 괜찮은 콘텐츠 모드입니다.<br />
        git workflow, gradle, Java 등 여러가지 개념의 이해 및 성장을 1년동안 빠지지 않고 동반자로써 같이 해왔습니다.<br />
        이 레포지토리에 있는 200개의 커밋은 코드 리딩으로만 보던 자바 코드를 직접 구현해온 경험의 증거입니다.
        <StyledRepoCard repository="sharustry" />
      </TimelineContent>
    </>
  ),
  '2021.02.22': (
    <>
      <TimelineContentTitle>ExampleMod 개발 중단</TimelineContentTitle>
      <TimelineContent>
        Sharustry와 ProjectUnity 개발에 집중하다보니 ExampleMod에 소홀해져 1.4.9v를 릴리즈하고 개발을 중단했습니다.
        <StyledRepoCard repository="exampleMod" />
      </TimelineContent>
    </>
  ),
  '2021.05.04': (
    <>
      <TimelineContentTitle>두번째 Mindustry JAVA 모드, Informatis 개발 시작</TimelineContentTitle>
      <TimelineContent>
        Informatis는 콘텐츠 모드였던 Sharustry와 달리 유틸리티 모드로써 모드가 없는 유저나 서버에 접속할 수 있는 호환성을 가진 모드였습니다.<br />
        기본 바닐라 기능으론 절대 알 수 없는 정보부터, 압도적 편의성 및 유틸리티 기능 제공... 즉 UX 향상을 목적으로 둔 모드였습니다.<br />
        libGDX의 UI 구조는 Unity와 매우 달랐습니다. 런타임에 UI를 생성하고 삭제하는 이 엔진에선 레이아웃 구조가 웹과 같은 박스 모델이였습니다! 그땐 몰랐지만 align, padding, margin같은 레이아웃 구성요소들을 익힘으로써 웹 개발에 아주 큰 도움이 되었습니다.
        <StyledRepoCard repository="informatis" />
      </TimelineContent>
    </>
  )
}

const dates = Array.from(
  [2020, 2021, 2022],
  (year) => Array.from(
    { length: 12 },
    (_, month) => Array.from(
      { length: 31 },
      (__, day) => `${year}.${(month + 1).toString().padStart(2, '0')}.${(day + 1).toString().padStart(2, '0')}` as dateType
    )
  )
)

interface TimelineItemProps {
  title: string,
  children?: JSX.Element | undefined
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  children
}) => {
  return (
    <Step expanded>
      <StepLabel>
        {children
          ? <Typography fontFamily='bold' fontSize={35} color='black' className="has-content">{title}</Typography>
          : <Typography fontSize={5}>{title}</Typography>
        }
      </StepLabel>
      <StepContent TransitionProps={{ unmountOnExit: false }}>
        {children}
      </StepContent>
    </Step>
  )
}

const TimelineRoadMap: React.FC = () => {
  return (
    <Card sx={{
      position: 'absolute',
      width: '100px', height: '70vh',
      left: '10vw'
    }}>
      힣
    </Card>
  )
}

let y = 0;
const TimelineSection: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ ...props }) => {
  const stepper = React.useRef<HTMLDivElement>(null);
  const spring = useSpring(0, { damping: 300, stiffness: 200 });

  React.useLayoutEffect(() => {
    spring.onChange(latest => {
      stepper.current?.scrollTo({ top: latest, behavior: 'smooth' });
    });
  }, [spring]);

  const handleScroll = React.useCallback<React.UIEventHandler<HTMLDivElement>>(
    (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = ev.currentTarget;
      const getDist = (element: HTMLDivElement) => element.offsetTop - target.scrollTop;
      toFit(() => {
        const diff = y - target.scrollTop;
        const isScrollDown = diff < 0;
        y = target.scrollTop;

        if (diff == 0 || !stepper.current) return;
        const contents = Array.from<HTMLDivElement>(stepper.current.querySelectorAll("div .has-content"));
        const exist = contents.find(element => element.offsetTop == target.scrollTop);
        if (exist) {
          spring.set(exist.offsetTop, false);
          return;
        }

        const list = contents
          .filter(element => isScrollDown ? getDist(element) > 0 : getDist(element) < 0)
          .sort(element => getDist(element));

        spring.set(list.shift()?.offsetTop ?? (isScrollDown ? list.pop()?.offsetTop : 0), false);
      })()
    }, [y, stepper]
  );

  return (
    <div ref={stepper} onScroll={handleScroll} style={{ padding: '100px 50px', overflowY: 'scroll' }} {...props}>
      <div id='back-to-top-anchor' />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant='h3' fontFamily='700'>
          Timeline
        </Typography>
        <div
          onClick={() => stepper.current?.scrollTo({
            top: document.querySelector<HTMLDivElement>("div #stepper-scroll-bottom-anchor")?.offsetTop ?? 0
          })}
          style={{ color: 'blue', marginLeft: '20px', cursor: 'pointer' }}
        >
          <Box sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>아래로 내려가기</Box>
          <ArrowDropDownIcon sx={{ display: { md: 'none', sm: 'block' } }} />
        </div>
      </div>
      <Divider />
      <Stepper orientation="vertical" sx={{ marginLeft: '3%' }}>
        <ScrollTop target={stepper.current ?? undefined} />
        {dates.map((years, i) =>
          years.map((monthes, ii) => (
            <div key={monthes[0]}>
              <TimelineItem title={monthes[0].slice(0, 7)}>
                {events[monthes[0].slice(0, 7) as monthType]}
              </TimelineItem>
              <div style={{ marginLeft: '4%' }}>
                {monthes.map((date, iii) =>
                  <TimelineItem key={`${i}${ii}${iii}`} title={date}>
                    {events[date]}
                  </TimelineItem>
                )}
              </div>
              <Divider />
            </div>
          ))
        ).flat()}
        <div id='stepper-scroll-bottom-anchor' />
      </Stepper>
    </div>
  )
}

export default TimelineSection