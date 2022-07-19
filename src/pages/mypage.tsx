import React from 'react';
import Layout from 'src/components/Layout';
import Router from 'next/router';
import UserContext from 'src/contexts/UserContext';
import { IAccount } from '../../models/Account';

const MyPage: React.FC<{ account: IAccount }> = () => {
  const { loggedUser, loggedIn } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!loggedIn) Router.push('/login');
  }, [loggedIn]);

  return (
    <>
      {loggedIn &&
        <Layout>
          <h1>Welcome {loggedUser.userId}!</h1>
        </Layout>
      }
    </>
  )
};

export default MyPage;