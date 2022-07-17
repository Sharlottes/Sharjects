import Link from 'next/link';
import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { SettingIcon, DiscordIcon } from 'src/assets/icons';
import { styled } from '@mui/system';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { typeAsserted } from 'src/utils/typeAsserted'

// js는 ; 안 써도 되는데요
// 근데 안 쓴 코드를 작성하다보면 마음이 바뀌실수도 있음
// 제가 그랬거든요 
//어차피 우리들의 멋진 prettier가 다 해결해줄겁니다..!
// 강박증이에요
const links = typeAsserted<[string, string][]>()([
  ['/', 'Home'],
  ['/about', 'About'],
  ['/botList', 'Bots'],
])
  .map(([url, name]) =>
    ({ url, name })
  );

const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'uni-sans-heavy',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'black',
  transition: 'all 0.5s',
  margin: '5px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#a7abd7',
  },
}));

const IconTabs: React.FC = () =>
  <Stack
    direction='row'
    sx={{
      '& .MuiSvgIcon-root': { mr: '4px', ml: '4px' },
      '& :hover': { color: 'black' },
      '& *': { transition: 'color 0.25s ease-in' },
      color: 'gray',
    }}
  >
    <Link href='/login'>
      <AccountCircleIcon />
    </Link>

    {/*TODO: make setting page */}
    <SettingIcon />
  </Stack>

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [overlapStep, setOverlapStep] = React.useState(0); //0: none, 1: navigator, 2: icons

  const handleOpen = (evt: React.MouseEvent<HTMLElement>) => setAnchorEl(evt.currentTarget);
  const handleClose = () => setAnchorEl(null);

  React.useEffect(() => {
    const target = document.getElementById('navigator') as HTMLElement;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setOverlapStep(entry.intersectionRatio < 0.95 ? 2 : entry.intersectionRatio < 0.99 ? 1 : 0);
        if (entry.intersectionRatio >= 0.99) setAnchorEl(null);
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.95, 0.99, 1]
    });
    io.observe(target);
    return () => io.unobserve(target);
  }, [overlapStep]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: '100%',
        borderBottom: '2px solid black',
        boxShadow: '0px 0px 5px',
        pt: '10px'
      }}
    >
      <Box sx={{ transform: 'scale(2)', mr: '10px' }} ml='20px'>
        <DiscordIcon />
      </Box>

      <Stack
        direction="row"
        id='navigator'
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Stack direction="row" sx={{ minWidth: '200px' }}>
          {overlapStep > 0
            ? <IconButton onClick={handleOpen}><MenuIcon /></IconButton>
            : links.map((link, i) =>
              <Link href={link.url} key={i}>
                <StyledTypography className='.noselect'>{link.name}</StyledTypography>
              </Link>
            )
          }
        </Stack>
        <IconTabs />

        <Menu
          anchorEl={anchorEl}
          id='navigator-menu'
          open={Boolean(anchorEl)}
          onClick={handleClose}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {links.map((link, i) =>
            <MenuItem key={i}>
              <Link href={link.url}>
                <StyledTypography className='.noselect'>
                  {link.name}
                </StyledTypography>
              </Link>
            </MenuItem>
          )}
          {overlapStep === 2 && (
            <MenuItem>
              <IconTabs />
            </MenuItem>
          )}
        </Menu>
      </Stack>
    </Stack>
  );
}

export default Header;