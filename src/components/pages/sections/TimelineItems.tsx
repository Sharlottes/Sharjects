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
      <div>
        {children
          ? <span style={{ color: 'themedBlack', fontFamily: 'bold', fontSize: 35 }} className="has-content">{title}</span>
          : <span style={{ fontSize: 5, color: '#9e9e9e' }}>{title}</span>
        }
      </div>
      <StepContent>
        {children}
      </StepContent>
    </Step>
  )
}

type monthType = `${2020 | 2021 | 2022}.${string}`;
type dateType = `${monthType}.${string}`;
const events: Record<dateType | monthType, JSX.Element> = {
  '2020.01': (
    <>
      <TimelineContentTitle>개발 제 1분기, 프로그래밍의 입문</TimelineContentTitle>
      <TimelineContent>
        2020년은 Mindustry를 통해 Mindustry 모드를 개발하는걸 보조로 삼고 게임에 관련된 다른 요소들에 집중하느라 그 포텐션이 크게 발휘되지 못한 해입니다. <br />
        하지만 Mindustry 모딩은 많이 흥미로웠고, 부진한 성장 속도에도 불구하고 그것은 프로그래밍 입문을 하기에 충분했습니다.
      </TimelineContent>
    </>
  ),
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
  '2021.01': (
    <>
      <TimelineContentTitle>개발 제 2분기, Mindustry 모딩의 부흥과 쇠락, 타 분야 진출</TimelineContentTitle>
      <TimelineContent>
        2021년은 Mindustry 모드를 3개나 제작함으로써 모딩 텐션이 최고조에 달한 해인 동시에, 너무 달아올아 너무 빨리 식어버린 해입니다. <br />
        모딩에 대한 흥미가 식으면서 게임, 앱, 웹, 챗봇 등 다른 여러가지 분야를 살펴보고 진출해본 해이기도 합니다.
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
        기본 바닐라 기능으론 절대 알 수 없는 정보부터, 압도적 편의성 및 유틸리티 기능 제공을 통해 UX 향상을 목적으로 뒀습니다.<br />
        libGDX의 UI 구조는 Unity와 달리 런타임에 UI를 생성하고 삭제하고, 레이아웃 구조가 박스 모델입니다.<br />
        이러한 박스 모델의 align, padding, margin 구성요소들을 익힘으로써 미래에 시작한 웹개발에 아주 큰 도움이 되었습니다.
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
        <StyledRepoCard repository="timer" />
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
        <StyledRepoCard repository="timer" />
      </TimelineContent>
    </>
  ),
  '2021.08.29': (
    <>
      <TimelineContentTitle>디스코드 봇 개발</TimelineContentTitle>
      <TimelineContent>
        (구)SharBot, (현)RealtimeRPG는 디스코드 봇 개발에 대해 알아보고 공부하면서 여러가지 테스트 코드들을 올린 프로젝트입니다.<br />
        Mindustry 서버 핑 현황, Mindustry 콘텐츠를 JSON화하여 명령어로 속성 조회하기 등 주로 Mindustry에 관련된 기능들로 구성돼있습니다.
      </TimelineContent>
    </>
  ),
  '2021.09.08': (
    <>
      <TimelineContent>웹사이트 개발</TimelineContent>
      <TimelineContent>
        더 메이저한 분야로 나아가잔 의지의 일환으로 안드로이드 앱이 처참하게 실패하면서 저는 웹 개발에 눈독을 돌렸습니다, <br />
        웹 개발을 하기 전 html에 대한 기초적인 이해 및 정리를 하면서 github page 배포법도 습득했습니다.
        <StyledRepoCard repository='html-guide' />
      </TimelineContent>
    </>
  ),
  '2021.10.21': (
    <>
      <TimelineContentTitle>리액트 개발</TimelineContentTitle>
      <TimelineContent>
        html은 매우 지루했고 흥미롭지 못했습니다. <br />
        하지만 리액트는 동적이고, 인터렉티브하여 html보다 더 흥미로워서 저는 금방 html-guide 작성을 그만두고 react-app에서 counter 웹을 만들기 시작했습니다.<br />
        문제는, 함수형 컴포넌트가 <strong>함수형 페러다임</strong>을 따른다는 이상한 오해때문에 상태를 배제하려 했고, 그때문에 이해가 굉장히 꼬이면서 흥미를 금세 잃었다는 것입니다.
        <StyledRepoCard repository='react-app' />
      </TimelineContent>
    </>
  ),
  '2022.01': (
    <>
      <TimelineContentTitle>개발 제 3분기, 매우 폭발적인 성장 펌핑 기간</TimelineContentTitle>
      <TimelineContent>
        2022년은 매우 특별하면서도 믿을 수 없을 정도의 높은 성장폭을 보여준 해입니다.<br />
        저는 2022년에서 MongoDB, Dart, Flutter, C#, Unity, React, Next.js 등 현재 선보이고 있는 스팩의 대부분을 갖추고 개발해왔습니다. <br />
        상반기엔 타입스크립트로 RealtimeRPG를, 라이노 자바스크립트로 KakaoBot과 KakaoBridge를, 플러터로 Timer를 개발해왔으며, <br />
        하반기엔 유니티로 CardDefense를, 리액트와 넥스트로 KakaoNacksee와 Sharjects를 개발해왔습니다.
      </TimelineContent>
    </>
  ),
  '2022.01.27': (
    <>
      <TimelineContentTitle>RealtimeRPG 디스코드 봇 개발 시작</TimelineContentTitle>
      <TimelineContent>
        RealtimeRPG는 쳇봇 기반의 텍스트 턴제 RPG 게임입니다. <br />
        정확한 시점은 모르지만, RealtimeRPG는 이 시점 이전부터 카카오톡 봇으로써 개발돼왔습니다.<br />
        하지만 규모가 커지면서 카카오톡 봇으로는 한계에 금세 도달했고, 좀 더 인터렉티브하고 확장성을 지닌 디스코드 봇으로 마이그레이션하기를 선택했습니다<br />
        RealtimeRPG는 올해 첫 발돋음이기도 하며 기존 Mindustry 모딩계에만 머무던 제 스팩이 본격적으로, 폭발적으로 성장하게 도와준 첫 프로젝트입니다.<br />
        discord.js에 대한 전반적인 이해, Typescript에 대한 심도 깊은 이해, 자바스크립트의 클래스와 자바의 클래스에 대한 차이 등 리액트 개발 이전까지 타입스크립트 개발의 전체를 같이해왔습니다.
        <StyledRepoCard repository='RealtimeRPG' />
      </TimelineContent>
    </>
  ),
  '2022.04.30': (
    <>
      <TimelineContentTitle>KakaoBot 레포지토리 생성</TimelineContentTitle>
      <TimelineContent>
        KakaoBot는 비공식 채팅자동응답 봇과 Rhino 자바스크립트를 통해 카카오톡 문자 알람에 자동 응답을 하는 챗봇 프로젝트입니다. <br />
        자바스크립트의 괴랄한 문법과 숏코딩을 익히는 등 자바스크립트 내공 다지기에 도움을 받았습니다. <br />
        + 폰에서 개발해왔기에 따로 깃허브에 저장할 필요가 없어 레포지토리 생성 일이 많이 늦었습니다.
        <StyledRepoCard repository='KakaoBot' />
      </TimelineContent>
    </>
  ),
  '2022.05.28': (
    <>
      <TimelineContentTitle>SharBot, KakaoBridge 봇 분리 개발</TimelineContentTitle>
      <TimelineContent>
        RealtimeRPG는 원래 SharBot를 개발하면서 만든 기반 시스템 위에서 점진적으로 개발해온 봇이여서 SharBot 기능과 뒤섞여진 상태였습니다. <br />
        보다 더 깔끔한 유지보수 및 개발을 위해 SharBot를 분리했고, KakaoBridge라는 카카오톡-디스코드 쌍방향 문자 통신 봇 개발을 시작했습니다. <br />
        KakaoBridge는 socket 통신과 카카오톡 봇/디스코드 봇 통신이란 드문 경험을 제공해줬습니다.
        <StyledRepoCard repository='SharBot' />
        <StyledRepoCard repository='KakaoBridge' />
      </TimelineContent>
    </>
  ),
  '2022.06.25': (
    <>
      <TimelineContentTitle>백준코딩 시작</TimelineContentTitle>
      <TimelineContent>
        백준코딩은 알고리즘 코딩 문제집 웹사이트입니다. <br />
        알고리즘 사고를 더 배우기 위해 백준코딩에서 문제 푸는걸 시도해보았고, 주로 브론즈-실버권 문제들을 다수 풀어본 경험을 얻었습니다.
        <StyledRepoCard repository='Baekjoon.js' />
      </TimelineContent>
    </>
  ),
  '2022.07.06': (
    <>
      <TimelineContentTitle>DiscordbotList 웹사이트 개발 시작</TimelineContentTitle>
      <TimelineContent>
        DiscordbotList는 한국 디스코드 봇 리스트 api를 통해 디스코드 봇 리스트를 얻어 나만의 디스코드 봇 리스트 웹사이트를 만들어보잔 의도로 개발을 시작했습니다. <br />
        하지만 해당 api는 ToS 위반 사항, 즉 사외 사용이 금지된 api였고 양심적 책임을 느껴 1달 뒤 개발을 중단했습니다. <br />
      </TimelineContent>
    </>
  ),
  '2022.07.25': (
    <>
      <TimelineContentTitle>CardDefense 개발 참여</TimelineContentTitle>
      <TimelineContent>
        CardDefense는 팀 Gamer Studio에서 개발중인 유니티 카드 디펜스 모바일 게임입니다. <br />
        저는 이 프로젝트에서 UI를 담당하며 유니티 기초 개발을 경험하는 동시에 기존 Mindustry 모딩과 웹개발와는 색다른 Unity의 GameObject를 통한 UI 개발를 경험했습니다.
        <StyledUserCard username='Gamer-Studio' />
      </TimelineContent>
    </>
  ),
  '2022.08.13': (
    <>
      <TimelineContentTitle>첫 포트폴리오 웹사이트, Sharjects 개발 시작</TimelineContentTitle>
      <TimelineContent>
        Sharjects는 DiscordbotList 개발을 중단하고 나서 무얼 할지 고심하다가 고른 선택지입니다. <br />
        어느정도 스팩을 쌓았고, 웹사이트도 개발해야 하니 이참에 자신을 알리는 웹사이트, 즉 포트폴리오를 개발하잔 생각으로 Sharjects 개발을 시작했습니다.<br />
        이전의 react-app이나 html-guide와 달리 분명한 목적의식을 갖고 있어서 추진력있게 라이브러리를 사용해 웹사이트를 구현하고 있습니다.<br />
        웹 개발의 전반적인 이해, 2022년 하반기 타입스크립트 개발의 핵심을 Sharjects에서 꾸려왔습니다.
        <StyledRepoCard repository='Sharjects' />
      </TimelineContent>
    </>
  ),
  '2022.09.23': (
    <>
      <TimelineContentTitle>KakaoNacksee 개발</TimelineContentTitle>
      <TimelineContent>
        KakaoNacksee는 Shajects를 개발하고 지침을 느끼던 와중에 갑작스런 사소한 동기 하나로 시작한 미니 프로젝트입니다. <br />
        매우 가벼운 번들 크기 및 기능을 가지고 있어 제품성이 괜찮았고, 제 실력을 점검하기에 좋은 프로젝트였습니다. <br />
        그리고 Kakao SDK를 익히며 웹 SDK는 window에 담긴다는 사실, 그리고 타입스크립트에선 이를 위해 declare global를 개별로 해야 하는 점 등 여러기지를 익혔습니다.
        <StyledRepoCard repository='KakaoNacksee' />
      </TimelineContent>
    </>
  ),
  [(() => {
    const date = new Date();
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  })()]: (
      <>
        <TimelineContentTitle>지금!</TimelineContentTitle>
        <TimelineContent>
          고난과 성취, 도전... 수많은 이야기가 지금 이어집니다!
          <StyledRepoCard repository="sharlottes" />
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

const TimelineItems: React.FC = () => (
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

export default TimelineItems;