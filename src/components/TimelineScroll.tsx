import React from 'react';

import dynamic from 'next/dynamic'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import IconButton from '@mui/material/IconButton'

import { motion, useAnimationControls } from 'framer-motion';

const TimelineItems = dynamic(() => import('src/components/TimelineItems'), {
  suspense: true
});

const margin = 50;
const getDist = (element: HTMLDivElement, targetPos = window.scrollY) => (targetPos ?? 0) - element.offsetTop;
const getTimelineItems = () => {
  return ([
    document.querySelector<HTMLDivElement>('div #top-anchor')!,
    ...document.querySelectorAll("div .has-content"),
    document.querySelector<HTMLDivElement>('div #bottom-anchor')!
  ] as HTMLDivElement[])
}
const getNearestElement = (direction: 'up' | 'down' | 'none' = 'none'): HTMLDivElement | undefined => {
  return getTimelineItems()
    .filter(element => direction === 'down' ? getDist(element) < -(margin + 20) : direction === 'up' ? getDist(element) > (margin + 20) : true)
    .sort(element => direction === 'none' ? Math.abs(getDist(element)) : getDist(element))
    .pop()
}

const TimelineScroll: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', preventScroll);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', preventScroll);
    }
  }, []);

  const preventScroll = (e: any) => e.preventDefault();
  const handleWheel = (ev: WheelEvent) => {
    ev.preventDefault();
    tryScroll(ev.deltaY > 0 ? 'down' : ev.deltaY < 0 ? 'up' : 'none');
  }
  const handleKeydown = (event: KeyboardEvent) => {
    const direction = (event.key === 'w' || event.key === 'ArrowUp') ? 'up'
      : (event.key === 's' || event.key === 'ArrowDown') ? 'down' : 'none';
    tryScroll(direction)
  }

  const tryScroll = (direction: 'up' | 'down' | 'none') => {
    if (!window || direction === 'none') return;

    const item = getNearestElement(direction);
    if (item) ref.current?.setLatestItem(item);
    window.scrollTo({ top: (item?.offsetTop ?? 0) - margin, behavior: 'smooth' })
  }

  const ref = React.useRef<TimelineNavRefType>(null);

  return (
    <Stepper orientation="vertical" sx={{ marginLeft: 'min(1vw, 10px)' }}>
      <TimelineNav ref={ref} scroll={(d) => tryScroll(d)} />
      <React.Suspense fallback={'loading...'}>
        <TimelineItems />
      </React.Suspense>
    </Stepper>
  )
}

type TimelineNavRefType = { setLatestItem: (item: HTMLDivElement) => void }
const TimelineNav = React.forwardRef<TimelineNavRefType, { scroll: (direction: 'up' | 'down') => void }>(({ scroll }, ref) => {
  const [latestItem, setLatestItem] = React.useState<HTMLDivElement>();
  const [showed, setShowed] = React.useState(false);
  const [sizedUp, setSizedUp] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    setLatestItem: item => setLatestItem(item)
  }))
  const variants = {
    show: {
      x: 0
    },
    hide: {
      x: -110
    }
  }

  const controls = useAnimationControls();
  controls.start(showed ? 'show' : 'hide');

  const handleClick = () => {
    setSizedUp(prev => {
      controls.start({ height: prev ? '200px' : '60vh' });
      return !prev;
    });
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      zIndex: 10
    }}>
      <motion.div
        style={{
          width: '100px', height: '200px',
          boxShadow: '0 0 10px black',
          borderRadius: '10px',
        }}
        variants={variants}
        animate={controls}
      >
        <motion.div
          variants={{
            none: {},
            show: { x: 15 }
          }}
          whileTap={showed ? 'none' : 'show'}
          whileHover={showed ? 'none' : 'show'}
          transition={{
            type: 'spring'
          }}
          style={{
            position: 'absolute',
            right: '-30px',
          }}
        >
          <IconButton
            sx={{
              boxShadow: '0 0 10px black'
            }}
            onClick={() => setShowed(prev => !prev)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </motion.div>
        <div style={{
          width: '100%', height: '100%',
          backgroundColor: 'white',
          borderRadius: '10px',
          fontSize: 'max(12, 10%)',
        }}>
          <motion.div style={{
            height: '100%',
            display: sizedUp ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IconButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><KeyboardDoubleArrowUpIcon /></IconButton>
            <IconButton onClick={() => scroll('up')}><KeyboardArrowUpIcon /></IconButton>
            <span style={{ cursor: 'pointer' }} onClick={handleClick}>{latestItem?.innerText}</span>
            <IconButton onClick={() => scroll('down')}><KeyboardArrowDownIcon /></IconButton>
            <IconButton onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}><KeyboardDoubleArrowDownIcon /></IconButton>
          </motion.div>
          <motion.div style={{
            height: '100%',
            display: sizedUp ? 'block' : 'none'
          }}>
            <div onClick={handleClick} style={{ margin: '5px', width: '100%' }}>{'< back'}</div>
            <Divider sx={{ width: '100%', margin: '10px 0' }} />
            <div style={{ height: '100%' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {getTimelineItems()
                  .sort((e1, e2) => Math.abs(getDist(e1, latestItem?.offsetTop)) - Math.abs(getDist(e2, latestItem?.offsetTop)))
                  .slice(0, 10)
                  .sort((e1, e2) => getDist(e1, latestItem?.offsetTop) - getDist(e2, latestItem?.offsetTop))
                  .reverse()
                  .map((elem, i, arr) =>
                    elem.innerText && (<div>
                      <span
                        style={{ margin: '5px 2px', color: elem.innerText === latestItem?.innerText ? 'red' : 'inherit', cursor: 'pointer' }}
                        onClick={() => {
                          window.scrollTo({ top: elem.offsetTop - margin, behavior: 'smooth' });
                          setLatestItem(elem)
                        }}
                      >
                        {elem.innerText}
                      </span>
                      {(i !== arr.length - 1 && elem.innerText) &&
                        <div style={{ margin: '5px 2px', display: 'flex', width: '100%', justifyContent: 'center' }}>
                          <div style={{
                            display: 'block',
                            border: '1px solid #bdbdbd',
                            minHeight: '12px',
                            width: '1px'
                          }} />
                        </div>
                      }
                    </div>
                    ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
})

export default TimelineScroll;