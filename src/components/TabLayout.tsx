import React, { type PropsWithChildren } from 'react'

import Collapse from '@mui/material/Collapse'
import Toolbar from '@mui/material/Toolbar'
import Fab from '@mui/material/Fab'
import Tabs from '@mui/material/Tabs'
import Fade from '@mui/material/Fade'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Layout from './Layout';

const CollapseFab = styled(Fab)<{ shown?: string }>(({ shown }) => ({
  ...(Boolean(shown) && {
    boxShadow: 'none'
  }),
  marginRight: '5px', marginLeft: '5px',
  backgroundColor: '#7289DA',
  position: 'fixed',
  top: '67px',
  opacity: 0.3,
  transition: 'all 0.5s ease-out',
  '&:hover': {
    backgroundColor: '#7289DA',
    opacity: 0.7,
  },
}));

const ScrollTop: React.FC = () => {
  const trigger = useScrollTrigger({
    target: global.window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const anchor = evt.currentTarget.ownerDocument.querySelector('#back-to-top-anchor');

    anchor?.scrollIntoView({
      block: 'center',
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}>
         <Fab size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
      </Box>
    </Fade>
  );
}

const TabLayout: React.FC<PropsWithChildren & {onIndexChanged?: (index: number) => void, tabs: string[]}> = (
  { 
children, 
onIndexChanged, 
tabs 
  }) => {
  const [shown, setShown] = React.useState(true);
  const [index, setIndex] = React.useState(0);

  return (
    <Layout header={<>
      <Collapse collapsedSize='5px' in={shown} sx={{ backgroundColor: '#7289DA', }}>
        <Toolbar variant='dense' sx={{ ml: '20px' }}>
          <Tabs 
            value={index} 
            onChange={(_, index)=>{
              setIndex(index); 
              if(onIndexChanged) onIndexChanged(index)
            }}
            sx={{
              "& .MuiTab-root": {
                '&.Mui-selected': {
                  color: '#adb6ff',
                },
                transition: 'color 0.5s',
              }
            }}
          >
            {tabs.map((tab, i) => <Tab key={i} label={tab} />)}
          </Tabs>
        </Toolbar>
      </Collapse>

      <CollapseFab size='small' shown={shown.toString()} onClick={()=>setShown(prev=>!prev)} >
        {shown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </CollapseFab>
    </>}>
      <>
        <ScrollTop />
        {children}
      </>
    </Layout>
  )
}

export const withTabLayout = (...pages: JSX.Element[]) => {
  const [page, setPage] = React.useState<JSX.Element>(pages[0])

  return(<TabLayout onIndexChanged={index=>setPage(pages[index])} tabs={pages.map((page, i)=>page.key?.toString() ?? `${i}tab`)}>
    {page}
  </TabLayout>)
}

export default TabLayout