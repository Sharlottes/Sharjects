import React from 'react'
import Layout from 'src/frontend/client/components/Layout'
import Router from 'next/router'
import UserContext from 'src/frontend/client/contexts/UserContext'
import { IAccount } from 'models/Account'

const MyPage: React.FC<{ account: IAccount }> = () => {
  const { loggedAccount, loggedIn } = React.useContext(UserContext)
  const [, rerender] = React.useState<void>()

  React.useEffect(() => {
    if (!loggedIn) Router.push('/login')
    else rerender()
    console.log(loggedIn)
    console.log(loggedAccount)
  }, [loggedIn, rerender, loggedAccount])

  return (
    <>
      {loggedIn && loggedAccount &&
        <Layout>
          <h1>Welcome {loggedAccount.userId}!</h1>
        </Layout>
      }
    </>
  )
}

export default MyPage