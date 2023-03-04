import { Box, Typography, Card } from "@mui/material";
import Link from "next/link";
import Layout from "src/components/Layout";

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
          padding: "20px",
        }}
      >
        <Typography
          textAlign="center"
          lineHeight="80px"
          variant="h3"
          fontWeight="bold"
        >
          존 레몬의 공포 체험
        </Typography>
        <Typography textAlign="center" variant="body1" p="0 10%">
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
      </Box>
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
    </Box>
  </Layout>
);

const ContentCard: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <Card
    sx={{
      padding: "5px",
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
