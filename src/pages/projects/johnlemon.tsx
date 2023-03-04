import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import { GithubIcon } from "src/assets/icons";
import Layout from "src/components/Layout";
import DownloadIcon from "@mui/icons-material/Download";

const JohnLemonPage: React.FC = () => (
  <Layout>
    <Box
      sx={{
        marginTop: "30px",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography lineHeight="80px" variant="h3" fontWeight="bold">
          존 레몬의 공포 체험
        </Typography>
        <Typography variant="body1" p="0 10%">
          존 레몬의 공포 체험은&nbsp;
          <Link href="https://2021sprinter.notion.site/XREAL-4-Dev-aeaa97f877a44f58b16db6b5f8ae7b40">
            XREAL 4기 데브 포트폴리오
          </Link>
          에 따라 유니티 레슨의&nbsp;
          <Link href="https://learn.unity.com/tutorial/jon-remonyi-gongpo-ceheom-sijaghagi">
            존 레몬의 공포 체험 튜토리얼
          </Link>
          을 이수하고 몇가지 아키텍쳐와 기능들을 추가하여 개조한 프로젝트입니다.
        </Typography>
        <Box
          sx={{
            marginTop: "30px",
            display: "inline-flex",
            gap: "50px",
          }}
        >
          <Button variant="contained" startIcon={<GithubIcon />}>
            깃허브로 가기
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            다운로드
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography
          textAlign="center"
          lineHeight="60px"
          variant="h4"
          fontWeight="bold"
        >
          추가 게임성
        </Typography>
        <Box
          sx={{
            marginTop: "30px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          <ContentCard
            title="유령 어그로"
            description="유령에 가까이 접근하면 유령은 두 단계에 거쳐 어그로 딜레이가 진행되고 어그로가 걸리면 플레이어를 끝까지 따라갑니다."
          />
          <ContentCard
            title="스테미나"
            description="체력 좋은 우리의 존 레몬은 shift로 달리고 ctrl로 천천히 걸어서 스테미나를 조절할 수 있습니다! 너무 힘들면 천천히 걸어 더 빠르게 스테미나를 회복해보세요."
          />
          <ContentCard
            title="별과 스톱워치"
            description="유령 어그로가 걸릴 때마다 별이 하나씩 늘어납니다. 5개의 모든 별을 모두 가진 채 탙출해보세요."
          />
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography
          textAlign="center"
          lineHeight="60px"
          variant="h4"
          fontWeight="bold"
        >
          개발 아키텍쳐
        </Typography>
        <Box
          sx={{
            marginTop: "30px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          <ContentCard
            title="키 바인드 매니저"
            description="Builder 패턴의 Lazy-DDOL Singleton 아키텍쳐입니다. old style의 key input system에 적합하며 상태 머신 모델과 이벤트 주도 개발을 같이 할 수 있도록 개발되었습니다."
          />
          <ContentCard
            title="확장된 Singleton Monobehaviour들"
            description="Lazy / DDOL / non-LAZY / non-DDOL MB싱글톤 패턴 중 하나를 적용할 때 기존 MB의 부모만 알맞는 싱글톤으로 바꿔도 작동되도록 설계된 4가지 아키텍쳐들입니다. 싱글톤 구현을 통째로 하지 않게 되어 개발 중 싱글톤 생산성을 극대화시켜줬습니다."
          />
          <ContentCard
            title="화면 Transition"
            description={
              <>
                {
                  "*어떻게* 화면을 변화시킬지 구현할 ~Transition 스크립트/프리팹들과 *언제* 화면을 변화시킬지 제어될 ScreenTransitionController를 통해 아주 간단한 화면 변화와 아주 높은 변화 모션 확장성을 지녔습니다."
                }
                <br />
                {
                  "화면 변화 트렌지션을 종료하기 전에 어떤 행동을 할지 콜백으로 DI할 수 있으며 이를 통해 사전에 구현된 씬 전환 트렌지션을 사용할 수 있습니다."
                }
                <br />
                {"덕분에 PlayButton.cs의 씬 전환 코드는 단 한줄에 불과합니다."}
              </>
            }
          />
        </Box>
      </Box>
    </Box>
  </Layout>
);

const ContentCard: React.FC<{
  title: string;
  description: string | React.ReactNode;
}> = ({ title, description }) => (
  <Card
    sx={{
      padding: "5px 10px",
      paddingBottom: "50px",
      minWidth: "400px",
      maxWidth: "400px",
      alignSelf: "stretch",
    }}
  >
    <Typography fontWeight="bold" lineHeight="32px">
      {title}
    </Typography>
    <Typography>{description}</Typography>
  </Card>
);

export default JohnLemonPage;
