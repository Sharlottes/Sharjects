import Layout from 'components/Layout'
import type { AuthNextPage } from './_app'
import { useSession } from 'next-auth/react';

const MyPage: AuthNextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <h1>Welcome {session?.user?.name}!</h1>
    </Layout>
  )
}
MyPage.auth = true;

export default MyPage