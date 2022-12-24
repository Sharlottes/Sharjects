import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";

import TabLayout from "src/components/TabLayout";

const AboutPage: React.FC = () => {
  return (
    <>
      <Stack
        direction="column"
        sx={{ justfiyContent: "center", display: "flex" }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}
        >
          Informatis
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Mindustry 플레이에서 더 다양한 정보와 보조 기능을 제공받아보세요!
          원하는 유닛이나 건물의 상세정보 실시간 조회, 웨이브에 나올 적을 미리
          알 수 있는 등 다양한 정보들이 준비되어있습니다!
        </Typography>
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Typography variant="h4">유닛 디스플레이</Typography>
        <Typography variant="body2" sx={{ marginLeft: 1, width: "550px" }}>
          커서 위치에 있는 대상의 상세 정보를 실시간으로 알 수 있는 창UI.
          일반적으로 알기 힘들거나 알 수 없는 자신 또는 상대의 유닛과 건물
          정보를 알기에 적합합니다.
          <span style={{ fontWeight: "bold", display: "block" }}>
            PvP, 공격맵에서 적의 HP와 재장전을 미리 알고 전략을 짜보세요!
          </span>
        </Typography>
      </Box>
      <Divider textAlign="left">
        <Typography variant="h5">기능 상세정보</Typography>
      </Divider>

      <FeaturePaper
        title="기본 대상 정보"
        desc="이름에 커서를 대면 플레이어 이름, 대상 타일 좌표, 방어력 계수를 알 수 있습니다. 이름 옆 아이콘을 누르거나 Shift+R 키를 누르면 Lock 상태가 되어 커서를 때도 대상이 고정됩니다."
        src="/images/informatis/tooltip.gif"
      />
      <FeaturePaper
        title="유닛 무기 재장전"
        desc="유닛의 무기 재장전을 알 수 있습니다. 특히 재장전 시간이 오래걸리는 유닛이 언제 다시 발사하는지 알고 싶을 때 유용합니다."
        src={[
          "/images/informatis/weapon1.gif",
          "/images/informatis/weapon2.gif",
        ]}
      />
      <FeaturePaper
        title="화물 및 상태이상"
        desc="유닛이 보유중인 화물과 상태이상을 확인할 수 있습니다. 상태이상에 커서를 대면 지속시간도 알 수 있습니다. 클릭하면 코어 데이터베이스의 정보를 열람합니다."
        src="/images/informatis/payloadstatus.png"
      />
      <FeaturePaper
        title="다양한 데이터 바"
        desc="대상이 무엇인지에 따라 다양한 데이터를 제공합니다. 공장 제작 진행률, 유닛 방어막 및 체력, 화물 및 자원 보유량, 포탑 재장전, 전력 생산, 소모, 보유량, 드릴 속도 등의 데이터가 바를 통해 표시됩니다."
        src="/images/informatis/bar.gif"
      />
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Typography variant="h4">단계 디스플레이</Typography>
        <Typography variant="body2" sx={{ marginLeft: 1, width: "550px" }}>
          현재 맵에 설정된 단계 정보를 순서대로 알 수 있는 창UI. 일반적으로 절대
          알 수 없는 다음 단계 정보를 확인하고 대비하기에 적합합니다.
          <span style={{ fontWeight: "bold", display: "block" }}>
            다음 단계에 어떤 유닛이 등장하는지 미리 확인하고 대비하세요!
          </span>
        </Typography>
      </Box>
      <Divider textAlign="left">
        <Typography variant="h5">기능 상세정보</Typography>
      </Divider>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{ width: "100%", margin: 2 }}
      >
        <Grid item>
          <FeaturePaper
            title="전체 단계 정보"
            desc="왼쪽 단계 번호를 보고 스크롤하여 몇 단계에 어떤 유닛이 오는지 확인할 수 있습니다. 정확한 방어막, 개수, 상태이상, 보스 여부 정보도 제공합니다."
            src="/images/informatis/wave.png"
          />
        </Grid>
        <Grid item>
          <FeaturePaper
            title="현재 남은 적 정보"
            desc="현재 어떤 적이 얼마나 남았는지 하단에 표시합니다. 바닐라의 보스 등장 바에서 미쳐 표시되지 못한 나머지 보스들의 수도 알 수 있습니다."
            src="/images/informatis/currentwave.png"
          />
          <FeaturePaper
            title="세부 설정"
            desc="표시할 다음 단계 수, 이전 단계/빈 단계 표시를 설정할 수 있습니다."
            src="/images/informatis/wavesetting.gif"
          />
        </Grid>
      </Grid>
    </>
  );
};

interface FeaturePaperProps {
  title: string;
  desc: string;
  src: string | string[];
}

const FeaturePaper: React.FC<FeaturePaperProps> = ({ title, desc, src }) => (
  <div style={{ display: "flex" }}>
    <div>
      {(Array.isArray(src) ? src : [src]).map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          width="100%"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        />
      ))}
    </div>
    <div>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          marginTop: "5px",
          marginBottom: "5px",
          width: "100%",
          textAlign: "left",
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ margin: 1, textAlign: "left" }}>{desc}</Typography>
    </div>
  </div>
);

const InformatisPage: React.FC = () => {
  const pages = [<AboutPage key="About" />];
  const [page, setPage] = React.useState<JSX.Element>(pages[0]);
  return (
    <TabLayout
      onIndexChanged={(index) => setPage(pages[index])}
      tabs={pages.map((page, i) => page.key?.toString() ?? `${i}tab`)}
    >
      {page}
    </TabLayout>
  );
};

export default InformatisPage;
