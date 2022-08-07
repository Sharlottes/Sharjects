import type React from 'react'
import Layout from 'components/Layout'
import type { IAccount } from 'models/Account'
import { BaseComponentType } from './_app'
import { useSession } from 'next-auth/react';

const MyPage: BaseComponentType<{ account: IAccount }> = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <h1>Welcome {session?.user?.name}!</h1>
    </Layout>
  )
}
MyPage.auth = true;

export default MyPage