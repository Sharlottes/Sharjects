import React from 'react';
import { Layout, TitleSection, ListSection, ProjectSection } from 'src/components';

const Home: React.FC = () => {
  return (
    <Layout>
      <TitleSection />
      <ListSection />
      <ProjectSection />
    </Layout>
  )
}

export default Home;