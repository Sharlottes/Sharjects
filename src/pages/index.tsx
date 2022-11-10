import { styled } from '@mui/system';
import React from 'react';
import { Layout, TitleSection } from 'src/components';
import TimelineSection from 'src/components/pages/sections/TimelineSection';

const ScrollContainer = styled('div')({
  overflow: 'scroll',
  scrollSnapType: 'y mandatory',
  height: '100vh',
  "& .scroll-snap-item": {
    scrollSnapAlign: 'start',
    position: 'relative',
    height: '100vh',
  }
})

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="support-scrollsnap"></div>
      <ScrollContainer id='scroll-snapper'>
        <TitleSection className='scroll-snap-item' id='title-section' />
        <TimelineSection className='scroll-snap-item' />
      </ScrollContainer>
    </Layout >
  )
}

export default Home;