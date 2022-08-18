import React from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { withTabLayout } from 'components/TabLayout'
import Contributors from 'components/Contributors'
import type { GithubProfile } from 'next-auth/providers/github'

const contributors = ['Sharlottes', 'AmateurPotion', 'younggam', 'sk7725', 'Yeonpil2'];

const AboutPage: React.FC<{ users: GithubProfile[] }> = ({ users }) => 
<>
  <Paper elevation={5} sx={{ boxShadow: '5px 5px 10px' }}>
    <div style={{ marginLeft: '20px', height: '300px' }}>
      <Typography fontSize='min(12vw, 140px)' sx={{ fontWeight: 'bold' }}>CardDefense</Typography>
      <Typography variant='body1' sx={{ width: '50vw', ml: '24px', overflowWrap: 'break-word' }}>엔트로피아 / 아이푸토로 2개의 작품으로 나누어져 배포될 카드디펜스 게임시리즈로서 모험을 통해 카드를 수집하고 디펜스를 하는 게임</Typography>
    </div>
  </Paper>
  <Paper elevation={5} sx={{ marginTop: '50px', backgroundColor: 'black', color: 'white' }}>
    <div style={{ margin: '10px 10px 30px 20px' }}>
      <Typography fontSize='min(6vw, 70px)' sx={{ fontWeight: 'bold', mt: '5px' }}>Contributors</Typography>
      <Typography variant='subtitle1' sx={{ ml: '20px', mb: '20px' }}>이 프로젝트를 개발중이신 분들</Typography>
      <Contributors users={users} />
    </div>
  </Paper>
</>

const ForumPage: React.FC = () => <></>

const CardDefensePage: React.FC<{ users: GithubProfile[] }> = ({ users }) => 
  withTabLayout(<AboutPage users={users} key='About' />, <ForumPage key='Forum' />)

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