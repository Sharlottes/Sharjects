import * as React from 'react';
import Layout from './components/Layout';

export default class Home extends React.Component {
  render(): JSX.Element {
    return (
      <Layout>
        <h1>
          안녕, Next.js!
        </h1>
      </Layout>
    )
  }
}