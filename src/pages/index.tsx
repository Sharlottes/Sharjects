import { styled } from '@mui/system';
import dynamic from 'next/dynamic';
import React from 'react';
import { Footer, Layout, TitleSection } from 'src/components';

const TimelineSection = dynamic(() => import('src/components/pages/sections/TimelineSection'), {
  suspense: true
})


const ScrollContainer = styled('div')({
  overflow: 'scroll',
  scrollSnapType: 'y mandatory',
  height: '100vh',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  "&::-webkit-scrollbar": {
    display: 'none'
  },
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
        <React.Suspense fallback={'loading...'}>
          <TimelineSection className='scroll-snap-item' />
        </React.Suspense>
      </ScrollContainer>
    </Layout>
  )
}

export default Home;