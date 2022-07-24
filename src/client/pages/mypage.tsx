import type React from 'react'
import Layout from 'components/Layout'
import { useAccount } from 'src/client/contexts/UserContext'
import type { IAccount } from 'models/Account'

const MyPage: React.FC<{ account: IAccount }> = () => {
  const { loggedAccount, loggedIn } = useAccount({});

  if (!loggedIn || !loggedAccount) {
    return (
      <Layout>Loading...</Layout>
    )
  }

  return (
    <Layout>
      <h1>Welcome {loggedAccount.userId}!</h1>
    </Layout>
  )
}

export default MyPage