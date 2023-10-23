# Sharjects

**Shar**lotte's Pro**jects**는 넥스트 기반의 포트폴리오 웹사이트입니다.

> [!NOTE]  
> Work In Progress, 현재 개발중인 프로젝트입니다.  
> 모든 콘텐츠들은 미완성이며 불안정합니다.

## Tech Stack

### Frontend

- Typescript
- Next.js
- Next-Auth
- SWR (제거 예정)
- MUI & Emotion (먼 미래에 제거 예정)
- Vanilla-Extract
- Framer motion
- MDX

### Backend

- MongoDB & mongoose
- Node.js (Next.js)

## more info

### 폴더 구조

```
Sharjects/
├─ .vscode/          -- visual studio code config dir
├─ public/           -- static content dir
├─ scripts/          -- 개발용 스크립트들
├─ src/
│  ├─ @types/        -- Typescript 타입 정의 파일. 유틸/전역/선언 보강 등...
│  ├─ assets/        -- SVG 아이콘 컴포넌트들. 추후 제거 예정
│  ├─ components/    -- 프로젝트 내 모든 컴포넌트 모듈들. 매우 큼
│  ├─ core/          -- 리액트 맥락과 분리되었지만 프로젝트 맥락과 관련된 모듈들
│  ├─ hooks/         -- 프로젝트 내 모든 리액트 훅 모듈들
│  ├─ lib/           -- 오직 3rd party 라이브러리와 관련된 모듈들
│  ├─ pages/         -- Next.js pages dir
│  ├─ models/        -- mongoDB 모델들. 추후 제거 예정
│  ├─ utils/         -- 프로젝트 내 모든 맥락과 무관한 범용 유틸리티 함수 모듈들
├─ doc/              -- 문서. 타임라인 문단들이 있음

```

### 콘텐츠

타임라인과 프로젝트를 주로 개발 중이며 블로그까지 만드는 것을 목표로 두고 있습니다.

#### 타임라인

3년 전부터 지금까지 개발자로써, 자잘구레한 것부터 큼지막한 것까지 모든 프로젝트와 개발 근황을 나열한 연대표입니다.
현재는 연속된 문서에 불과하지만 더 많은 컴포넌트와 애니메이션을 통해 시각성을 풍부하게 만들어줄 계획입니다.

#### 프로젝트

개인 및 팀 프로젝트를 소개하는 페이지입니다.  
각 프로젝트마다 제공되는 페이지봄로 프로젝트를 더 쉽게 이해할 수 있을 것입니다.
프로젝트 페이지는 후순위 개발 목표이기 때문에 현재 완성된 페이지는 없습니다.

#### 블로그

제 블로그 및 문서들은 티스토리, 벨로그, 네이버 카페, 노션 등 여러군데에 분포되어 있습니다. 어느정도 벨로그와 티스토리로 정리했지만, 하나로 통일된 곳에서 여러 블로그들을 보여준다면 **플렛폼 종속성에서 해방**되기 때문에 이 콘텐츠를 계획하게 되었습니다.
