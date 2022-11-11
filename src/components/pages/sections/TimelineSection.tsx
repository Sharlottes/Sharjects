import React from 'react';

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { useSpring } from "framer-motion"

import ScrollTop from 'src/components/ScrollTop'
import { onSlide, type SlideEventHandler } from 'src/utils/onSlide'
import dynamic from 'next/dynamic';

const TimelineItems = dynamic(() => import('./TimelineItems'), {
  suspense: true
});

const TimelineSection: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ ...props }) => {
  const stepper = React.useRef<HTMLDivElement>(null);
  const spring = useSpring(0, { damping: 300, stiffness: 200 });

  React.useEffect(() => {
    spring.onChange(latest => {
      stepper.current?.scrollTo({ top: latest, behavior: 'smooth' });
    });
  }, [spring]);

  React.useEffect(() => {
    const preventScroll = (e: any) => e.preventDefault();
    window.addEventListener('keydown', handleKeydown);
    stepper.current?.addEventListener('wheel', handleWheel, { passive: false });
    stepper.current?.addEventListener('scroll', preventScroll);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      stepper.current?.removeEventListener('wheel', handleWheel);
      stepper.current?.removeEventListener('scroll', preventScroll);
    }
  }, []);

  const handleWheel = (ev: WheelEvent) => {
    if (!(ev.currentTarget instanceof Element)) return;
    ev.preventDefault();
    tryScroll(ev.deltaY > 0 ? 'down' : ev.deltaY < 0 ? 'up' : 'none');
  }
  const handleSlide: SlideEventHandler = ({ y }) => tryScroll(y)
  const handleKeydown = (event: KeyboardEvent) => {
    const direction = (event.key === 'w' || event.key === 'ArrowUp') ? 'up'
      : (event.key === 's' || event.key === 'ArrowDown') ? 'down' : 'none';
    tryScroll(direction)
  }

  const margin = 50;
  const getDist = (element: HTMLDivElement) => (stepper.current?.scrollTop ?? 0) - element.offsetTop;
  const tryScroll = (direction: 'up' | 'down' | 'none') => {
    if (!stepper.current || direction === 'none') return;

    const item = ([
      stepper.current?.querySelector<HTMLDivElement>('div #top-anchor')!,
      ...stepper.current.querySelectorAll("div .has-content"),
      stepper.current?.querySelector<HTMLDivElement>('div #bottom-anchor')!
    ] as HTMLDivElement[])
      .filter(element => direction === 'down' ? getDist(element) < -(margin + 20) : getDist(element) > (margin + 20))
      .sort(element => getDist(element))
      .pop()

    if (direction === 'up' && !item) document.querySelector("#scroll-snapper")?.scrollTo({ top: 0, behavior: 'smooth' })
    else spring.set((item?.offsetTop ?? 0) - margin, false);
  }

  return (
    <div ref={stepper} style={{ padding: '100px 50px', overflowY: 'scroll', overflowX: 'hidden' }} {...onSlide<HTMLDivElement>(handleSlide)} {...props}>
      <div id='top-anchor' />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant='h3' fontFamily='700'>
          Timeline
        </Typography>
        <div
          onClick={() => stepper.current?.scrollTo({
            top: document.querySelector<HTMLDivElement>("div #bottom-anchor")?.offsetTop ?? 0,
            behavior: 'smooth'
          })}
          style={{ color: 'blue', marginLeft: '20px', cursor: 'pointer' }}
        >
          <Typography sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>아래로 내려가기</Typography>
          <ArrowDropDownIcon sx={{ display: { md: 'none', sm: 'block' } }} />
        </div>
      </div>
      <Divider />
      <ScrollTop target={stepper.current ?? undefined} />
      <React.Suspense fallback={'loading...'}>
        <TimelineItems />
      </React.Suspense>
      <div id='bottom-anchor' />
    </div>
  )
}

export default TimelineSection