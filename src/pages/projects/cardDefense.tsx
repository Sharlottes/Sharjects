import React from 'react'

import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import Layout from 'src/components/Layout'
import GithubUserCardFetcher from 'src/components/GithubUserCard'
import HorizontalScrollGroup from 'src/components/HorizontalScrollGroup'


const CardDefensePage: React.FC = () =>
  <Layout>
    <Stack direction='column' spacing='50px' sx={{
      "& .MuiPaper-root": {
        boxShadow: '5px 5px 10px'
      },
      "& .react-horizontal-scrolling-menu--scroll-container": {
        alignItems: 'stretch'
      }
    }}>
      <div style={{ padding: '20px' }}>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: 70 }}>
          CardDefense
        </Typography>
        <Typography variant='body1' sx={{ ml: '24px', textAlign: 'center', overflowWrap: 'break-word' }}>
          <span style={{ fontSize: 17, fontWeight: 600 }}>카드&타워 디펜스 모바일 게임</span> <span style={{ fontSize: 13 }}>Powered by Unity</span><br />
          카드를 타일에 사용하여 포탑과 벽을 건설하고, 유닛을 소환하거나 마법을 발동해서 적으로부터 코어를 수비하세요. <br />
          모험을 통해 다양한 카드들을 수집하고, 댁을 구성하여 곧 몰려올 강력한 적들에게서 코어를 지켜나가며 생존하세요. <br />
        </Typography>
      </div>
      <div style={{ backgroundColor: 'themedBlack' }}>
        <Typography fontSize='min(6vw, 70px)' sx={{ fontWeight: 400, fontSize: 40, textAlign: 'center', margin: '10px' }}>
          Developers
        </Typography>
        <HorizontalScrollGroup>
          {['Sharlottes', 'AmateurPotion', 'younggam', 'sk7725', 'Yeonpil2'].map((user, i) =>
            <div style={{ margin: 'auto 10px', height: '100%' }}>
              <GithubUserCardFetcher key={i} username={user} style={{ height: '100%', maxWidth: '400px', minWidth: '300px' }} />
            </div>
          )}
        </HorizontalScrollGroup>
      </div>
    </Stack>
  </Layout>


export default CardDefensePage