import React, { type PropsWithChildren } from 'react';

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'

import GithubUserCard from 'src/components/GithubUserCard'
import GithubRepoCard, { type GithubRepoCardProps } from 'src/components/GithubRepoCard';
import { styled } from '@mui/material';

interface StyledRepoCardProps extends Omit<GithubRepoCardProps, 'username'> {
  username?: string | undefined
}
const StyledRepoCard: React.FC<StyledRepoCardProps> = ({
  username = 'sharlottes',
  ...props
}) => (
  <div style={{
    margin: 'min(2vw, 10px)',
    width: 'min(100%, 400px)'
  }}>
    <GithubRepoCard username={username} {...props} />
  </div>
)

const StyledUserCard = styled(GithubUserCard)({
  margin: 'min(2vw, 10px)',
  width: 'min(100%, 400px)'
})

const TimelineContentTitle: React.FC<PropsWithChildren> = ({ children }) =>
  <div style={{ marginBottom: 'min(1vw, 5px)' }}>
    <Typography variant='h5'>
      {children}
    </Typography>
    <Divider sx={{ transform: 'translateX(-20px)', width: '50vw', margin: '5px 0px' }} />
  </div>

const TimelineContent: React.FC<PropsWithChildren> = ({ children }) =>
  <div style={{ marginLeft: 'min(3vw, 20px)' }}>
    {children}
  </div>

interface TimelineItemProps {
  title: string,
  children?: JSX.Element | undefined,
  last?: boolean
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  children,
  last = false
}) => {
  return (
    <Step expanded last={last} sx={{ padding: 'auto 1vw' }}>
      <StepLabel>
        {children
          ? <Typography fontFamily='bold' fontSize={35} color='black' className="has-content">{title}</Typography>
          : <Typography fontSize={5}>{title}</Typography>
        }
      </StepLabel>
      <StepContent>
        {children}
      </StepContent>
    </Step>
  )
}

type monthType = `${2020 | 2021 | 2022}.${string}`;
type dateType = `${monthType}.${string}`;
const events: Record<dateType | monthType, JSX.Element> = {
  '2020.02.08': (
    <>
      <TimelineContentTitle>깃허브 계정 생성</TimelineContentTitle>
      <TimelineContent>
        <StyledUserCard username='Sharlottes' />
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
        World War 2는 기획, 일러스트 담당이 있는 팀에서 개발자로 활동하며 만든 Mindustry JSON 모드입니다. <br />
        저는 이전에 제작한 모딩 위키와 실험 단계에 있던 ExampleMod 개발 경험을 토대로 개발하고자 했습니다. <br />
        하지만 기획팀의 내분으로 인해 9일만에 개발이 중단되었습니다.
        <StyledRepoCard repository="WorldWar2" />
      </TimelineContent>
    </>
  ),
  '2020.09.26': (
    <>
      <TimelineContentTitle>한국어 모딩 위키 제작</TimelineContentTitle>
      <TimelineContent>
        한국어 모딩 위키는 JSON 모드를 만들기 전에 각 속성들의 설명과 타입, 기본값을 명시한 일종의 JSONDOC입니다. <br />
        이 위키는 완벽한 것은 아니지만 만드는 과정에서 클래스와 인터페이스에 관한 기본 개념을 이해하고 접근 지정자, final, static같은 여러가지 특별한 키워드를 정리하고 습득하는 일종의 복습 시간을 겪게 해줬습니다.
        <StyledRepoCard repository="Korean-modding-wiki" />
      </TimelineContent>
    </>
  ),
  '2020.09.29': (
    <>
      <TimelineContentTitle>ExampleMod 개발</TimelineContentTitle>
      <TimelineContent>
        ExampleMod는 모딩 위키로 쌓은 지식들을 실험하고 실제로 배포까지 한 첫번째 모드입니다.<br />
        직접 제작을 해봄으로써 부족한 지식들을 매꿀 수 있었으나 JSON에만 국한되어 모드 게임성에 부족함이 많았습니다.
        <StyledRepoCard repository="exampleMod" />
      </TimelineContent>
    </>
  ),
  '2020.10.04': (
    <>
      <TimelineContentTitle>ExampleMod Javascript 개발</TimelineContentTitle>
      <TimelineContent>
        기존 JSON 모딩은 콘텐츠를 추가하여 JSON 속성 대응하는 값만 수정하는 방식으로, 매우 제한적인 개발 환경을 갖추고 있었습니다.<br />
        이 때문에 저는 Javascript를 통해 모드를 개발함으로써 더 넓은 개발 환경을 가지고자 했고, 특이하게 Rhino Javascript로 언어를 시작한 사람이 되었습니다.
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
        Sharustry는 제 첫번째 Mindustry 자바 모드입니다.<br />
        이 모드에선 ExampleMod보다 더 창의적이고 폭넓은 콘텐츠, 예를 들어 다중 포탑, 스킬 포탑, 다중 드릴, 보호막 벽, 프로세서 가속기 등을 만들었습니다. <br />
        이 모드는 git workflow, gradle, Java 등 여러가지 개념의 이해 및 성장을 저와 1년동안 빠지지 않고 동반자로써 같이 해왔습니다.<br />
        레포지토리에 있는 200개의 커밋은 코드 리딩으로만 보던 자바 코드를 직접 구현해온 경험의 증거입니다.
        <StyledRepoCard repository="sharustry" />
      </TimelineContent>
    </>
  ),
  '2021.02.22': (
    <>
      <TimelineContentTitle>ExampleMod 개발 중단</TimelineContentTitle>
      <TimelineContent>
        Sharustry와 ProjectUnity 개발에 집중하다보니 ExampleMod에 소홀해져 1.4.9v를 릴리즈하고 개발을 중단했습니다. <br />
        이후에도 여러번 게임 패치를 겪으며 ExampleMod는 전반적인 재작성에 직면한 상태라 계속 업데이트를 미루고 있는 상태입니다.
        <StyledRepoCard repository="exampleMod" />
      </TimelineContent>
    </>
  ),
  '2021.05.04': (
    <>
      <TimelineContentTitle>두번째 Mindustry JAVA 모드, Informatis 개발 시작</TimelineContentTitle>
      <TimelineContent>
        Informatis는 콘텐츠 모드였던 Sharustry와 달리 유틸리티 모드로써 버전 호환성을 가진 모드입니다.<br />
        기본 바닐라 기능으론 절대 알 수 없는 정보부터, 압도적 편의성 및 유틸리티 기능 제공... 즉 UX 향상을 목적으로 둔 모드였습니다.<br />
        libGDX의 UI 구조는 Unity와 매우 달랐습니다. 런타임에 UI를 생성하고 삭제하는 이 엔진에선 레이아웃 구조가 웹과 같은 박스 모델이였습니다!<br />
        그땐 몰랐지만 align, padding, margin같은 레이아웃 구성요소들을 익힘으로써 웹 개발에 아주 큰 도움이 되었습니다.
        <StyledRepoCard repository="informatis" />
      </TimelineContent>
    </>
  ),
  '2021.08.11': (
    <>
      <TimelineContentTitle>첫 안드로이드 앱, Timer 개발 시작</TimelineContentTitle>
      <TimelineContent>
        Timer는 간단한 알람 & 스톱워치 안드로이드 네이티브 어플리케이션입니다.<br />
        Informatis로 박스 모델링을 경험해본 저는 자신있게 안드로이드 xml 레이아웃에 도전했습니다.<br />
        결과적으로 저는 안드로이드 개발을 하면서 머터리얼 디자인과 GUI 레이아웃 편집을 알게 되었습니다.
      </TimelineContent>
    </>
  ),
  '2021.08.28': (
    <>
      <TimelineContentTitle>Timer 개발 중단</TimelineContentTitle>
      <TimelineContent>
        안드로이드 개발은 더 전문적이고 메이저한 분야로 나아가잔 욕망에서 비롯된 시도 중 하나였습니다. <br />
        자신있게 안드로이드 개발에 도전한 저는 더 심오하고 GUI 편집이 가중된 박스 모델링을 직면한 저는 당황스러움과 난해함을 겪었습니다.<br />
        결국 예상보다 큰 어려움에 직면하여 개발 시작일부터 17일 뒤인 8월 28일에 개발을 중단했습니다.
      </TimelineContent>
    </>
  ),
  [(() => {
    const date = new Date();
    return `${date.getFullYear()}.${date.getMonth().toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  })()]: (
      <>
        <TimelineContentTitle>지금!</TimelineContentTitle>
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

const TimelineItems: React.FC = () => {
  return (
    <Stepper orientation="vertical" sx={{ marginLeft: 'min(1vw, 10px)' }}>
      {dates.map((years, i) =>
        years.map((monthes, ii) => (
          <div key={monthes[0]}>
            <TimelineItem title={monthes[0].slice(0, 7)} last={i === dates.length - 1 && ii === years.length - 1}>
              {events[monthes[0].slice(0, 7) as monthType]}
            </TimelineItem>
            <div style={{ marginLeft: '4%' }}>
              {monthes.map((date, iii) =>
                <TimelineItem key={`${i}${ii}${iii}`} title={date} last={i === dates.length - 1 && ii === years.length - 1 && iii === monthes.length - 1}>
                  {events[date]}
                </TimelineItem>
              )}
            </div>
            <Divider />
          </div>
        ))
      ).flat()}
    </Stepper>
  )
}

export default TimelineItems;