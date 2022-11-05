import { Box, Divider, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Layout, TitleSection } from 'src/components';
import { toFit } from '../utils/toFit';
import { useSpring } from "framer-motion";
import ScrollTop from 'src/components/ScrollTop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GithubUserCardFetcher from 'src/components/GithubUserCard'

const ScrollContainer = styled('div')({
  overflow: 'scroll',
  scrollSnapType: 'y mandatory',
  height: '100vh',
  "& .scroll-snap-item": {
    scrollSnapAlign: 'start',
    position: 'relative',
    height: '100vh',
  }
})

type monthType = `${2020 | 2021 | 2022}.${string}`;
type dateType = `${monthType}.${string}`;
const monthes: Record<monthType, JSX.Element> = {
  '2020.08': (
    <>
      Mindustry의 소스코드를 읽어가며 모딩 위키를 만들었고, JSON으로 ExampleMod를 만들어가며 모딩을 직접 해보기 시작했습니다.
    </>
  ),
  '2020.10': (
    <>
      Mindustry 시스템의 전반적인 이해보다는 각각의 요소와 코드의 작동 원리에 집중하고 Javascript로 모딩하고 있었습니다.<br />
      종종 풀 리퀘스트 기여를 하기도 했습니다. ExampleMod는 총 커밋 수가 약 700개에 도달했습니다.
    </>
  ),
  '2020.12': (
    <>
      모딩을 시작하기 전엔 유명한 맵 제작자로 활동했었고, 잠시 Mindustry 모딩에 지쳐 맵 제작에 열중하느라 활동이 뜸했었습니다.<br />
      이쯤부터 번역도 겸하기 시작했습니다.
    </>
  )
}
const events: Record<dateType, JSX.Element> = {
  '2020.02.08': (
    <>
      깃허브 계정 생성
      <div style={{ margin: '10px' }}>
        <GithubUserCardFetcher username='Sharlottes' />
      </div>
    </>
  ),
  '2020.08.08': (
    <>
      <Typography>깃허브 첫 Repository 생성</Typography>

    </>
  ),
  '2020.09.26': (
    <>
      한국어 모딩 위키 제작, World War 2 모드 개발 시작
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

const TimelineDateItem: React.FC<TimelineItemProps> = ({
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

let y = 0;
const TimelineSection: React.FC = () => {
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
    <div ref={stepper} className='scroll-snap-item' onScroll={handleScroll} style={{ padding: '100px 50px', overflowY: 'scroll' }}>
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
          <Box sx={{ display: { md: 'block', sm: 'none' } }}>아래로 내려가기</Box>
          <ArrowDropDownIcon sx={{ display: { md: 'none', sm: 'block' } }} />
        </div>
      </div>
      <Divider />
      <Stepper orientation="vertical" sx={{ marginLeft: '30px' }}>
        <ScrollTop target={stepper.current ?? undefined} />
        {dates.map((years, i) =>
          years.map((months, ii) => (
            <div key={months[0]}>
              <TimelineDateItem title={months[0].slice(0, 7)}>
                {monthes[months[0].slice(0, 7) as monthType]}
              </TimelineDateItem>
              <div style={{ marginLeft: '30px' }}>
                {months.map((date, iii) =>
                  <TimelineDateItem key={`${i}${ii}${iii}`} title={date}>
                    {events[date]}
                  </TimelineDateItem>
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

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="support-scrollsnap"></div>
      <ScrollContainer>
        <TitleSection className='scroll-snap-item' />
        <TimelineSection />
      </ScrollContainer>
    </Layout >
  )
}

export default Home;