import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import TabLayout from 'components/TabLayout'
import Contributors from 'components/Contributors'
import type { GithubProfile } from 'next-auth/providers/github'

const contributors = ['Sharlottes', 'AmateurPotion', 'younggam', 'sk7725', 'Yeonpil2'];

const AboutPage: React.FC<{ users: GithubProfile[] }> = ({ users }) => 
<Stack direction='column' sx={{ display: 'flex', width: '100%' }}>
  <Paper elevation={5} sx={{ boxShadow: '5px 5px 10px' }}>
    <div style={{ marginLeft: '20px', height: '300px' }}>
      <Typography fontSize='min(12vw, 140px)' sx={{ fontWeight: 'bold' }}>CardDefense</Typography>
      <Typography variant='body1' sx={{ width: '50vw', ml: '24px', overflowWrap: 'break-word' }}>엔트로피아 / 아이푸토로 2개의 작품으로 나누어져 배포될 카드디펜스 게임시리즈로서 모험을 통해 카드를 수집하고 디펜스를 하는 게임</Typography>
    </div>
  </Paper>
  <Paper elevation={5} style={{ marginTop: '50px', width: '100%', backgroundColor: 'black', color: 'white' }}>
    <div style={{ margin: '10px 10px 30px 20px' }}>
      <Typography fontSize='min(6vw, 70px)' sx={{ fontWeight: 'bold', mt: '5px' }}>Contributors</Typography>
      <Typography variant='subtitle1' sx={{ ml: '20px', mb: '20px' }}>이 프로젝트를 개발중이신 분들</Typography>
      <Contributors users={users} />
    </div>
  </Paper>
</Stack>

const ForumPage: React.FC = () => 
<Stack direction='column' sx={{ display: 'flex', width: '100%' }}>
  
</Stack>

const CardDefensePage: React.FC<{ users: GithubProfile[] }> = ({ users }) => {
  const pages = [<AboutPage users={users} />, <ForumPage />]
  const [page, setPage] = React.useState<JSX.Element>(pages[0])

  return(<TabLayout onIndexChanged={index=>setPage(pages[index])}>
    {page}
  </TabLayout>)
}

export async function getServerSideProps() {
  const users: GithubProfile[] = [];
  for await (const username of contributors) {
    users.push(await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_REST_PAT}`
      }
    }).then(
      data => data.json(),
      err => console.log('failed to get user data: ', err)
    ))
  }
  return {
    props: { users },
  }
}

export default CardDefensePage