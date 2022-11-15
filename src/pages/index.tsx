import React from 'react';
import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { motion, useAnimationControls, MotionProps } from 'framer-motion';

import { delay } from 'src/utils/delay';
import Layout from 'src/components/Layout'
import ProgressiveTypography from 'src/components/ProgressiveTypography';
import GithubIcon from 'src/assets/icons/GithubIcon';

const keywords = ['19세 고등학생', '잡다한 개발자', '최적화와 성능의 낭만을 쫒는', 'Sharlottes']
const avatarVariants = {
  show: {
    opacity: 1,
    y: 0,
    width: 40, height: 40,
    transition: {
      ease: 'circInOut',
      delay: (keywords.length + 2) * 1.15
    }
  },
  sizeup: {
    width: 'min(20vw, 200px)', height: 'min(20vw, 200px)',
    transition: {
      ease: 'circOut',
      delay: (keywords.length + 2) * 1.15 + 1
    }
  }
}

const Description: React.FC = () => {
  const controller = useAnimationControls();

  return (
    <motion.div
      onClick={(ev: React.MouseEvent<HTMLDivElement>) => {
        if (ev.detail >= 2) controller.start({ x: 0, y: 0 })
      }}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      transition={{ delay: 1 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 'max(17px, 4vw)', width: '100vw' }}
    >
      <span>안녕하세요! 저는</span>
      <KeywordShower animate={controller} drag style={{ height: '1em', display: 'inline', width: '5em', textAlign: 'center' }} />
      <span>입니다.</span>
    </motion.div>
  )
}

const KeywordShower: React.FC<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & MotionProps> = (props) => {
  const controller = useAnimationControls();

  const startAnimation = React.useCallback(async () => {
    await delay(2000);

    for (let i = 0; i < keywords.length; i++) {
      await controller.start((id) => {
        if (id === i - 1) {
          return { y: 20, opacity: 0 }
        } else if (id === i) {
          return { y: -5, opacity: 1 }
        } else {
          return {}
        }
      });
      await delay(1000);
    }
  }, [controller]);

  React.useEffect(() => {
    startAnimation().then(() => {

    });
  }, []);

  return (
    <motion.div {...props}>
      {keywords.map((keyword, i) => (
        <motion.div key={i} custom={i} animate={controller} initial={{ y: -50, opacity: 0 }}>
          <Typography color='primary' sx={{ fontFamily: 'Nanum Pen Script', fontSize: '1.1em', width: '100%', position: 'fixed' }} >
            {keyword}
          </Typography>
        </motion.div>
      ))
      }
    </motion.div>
  )
}

const MainTitle: React.FC = () => {
  const motionPropsGenerator = React.useCallback((char: string, ref: React.RefObject<HTMLDivElement>, start: (x: string | number, y: string | number) => Promise<unknown>) => {
    const check = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!ref.current || !rect) return;
      const isInOfViewPoint =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      if (isInOfViewPoint) return;
      const reverse = (str: string) => str.includes('-') ? str.replace('-', '') : '-' + str;
      const [x, y] = ref.current.style.transform.replace(/translate[X|Y]\((-?\d*.\d*)px\)/g, '$1').split(/\s/).slice(0, 2).map((str) => parseFloat(reverse(str)));

      start(x, y).then(() => {
        if (char == 'o') window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      });
    }
    return {
      animate: 'show',
      drag: true,
      dragTransition: { power: 0.4, timeConstant: 200 },
      onDragEnd: check,
      onDragTransitionEnd: check
    }
  }, []);

  return (
    <ProgressiveTypography
      variant='h1'
      sx={{ width: '100%' }}
      fontWeight='bold'
      fontSize='min(200px, 15vw)'
      label="Sharlotte"
      delay={(keywords.length + 2) * 1.15 + 1.5}
      motion={motionPropsGenerator}
      box={{ sx: { display: 'flex', justifyContent: 'center', padding: '20px' } }}
    />
  )
}

const Home: React.FC = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ minWidth: '50%', margin: '10vh 5px 0' }}>
          <div style={{ display: 'flex', marginBottom: '50px', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div variants={avatarVariants} animate={['show', 'sizeup']} initial={{ opacity: 0, y: -20, width: 40, height: 40 }}>
              <Avatar style={{ width: 'inherit', height: 'inherit' }}>
                <img src='images/profile/Sharlottes.png' style={{ maxWidth: 'min(20vw, 200px)', maxHeight: 'auto' }} />
              </Avatar>
            </motion.div>
            <MainTitle />
          </div>
          <Description />
          <motion.div
            animate={{
              y: 0, opacity: 1,
            }}
            initial={{
              y: -50, opacity: 0
            }}
            transition={{
              delay: (keywords.length + 2) + 4
            }}
            style={{
              marginTop: '200px', display: 'flex', justifyContent: 'center', width: '100%'
            }}
          >
            <Link href='/timeline'>
              <Button variant='contained' sx={{ margin: '0 max(10px, 5vw)' }}>
                Timeline
              </Button>
            </Link>
            <Link href='https://github.com/sharlottes'>
              <Button variant='contained' sx={{ margin: '0 max(10px, 5vw)', backgroundColor: 'black', color: 'white' }} startIcon={<GithubIcon />}>
                Github Profile
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;