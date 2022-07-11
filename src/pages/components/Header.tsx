import Link from 'next/link';
import { Component, ReactNode } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { SettingIcon, DiscordIcon } from 'src/assets/icons';
import { styled } from '@mui/system';

const links: {url: string, name: string}[] = [];
(()=>{
  function addLink(url: string, name: string) {
    links.push({url: url, name: name});
  }
  addLink('/', 'Home');
  addLink('/about', 'About');
  addLink('/botList', 'Bots');
})();

const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'uni-sans-heavy',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'black',
  transition: 'all 0.5s',
  margin: '5px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#a7abd7'
  }
}));

class Header extends Component {
  render(): ReactNode {
    return (
      <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{width:'100%', borderBottom: '2px solid black', boxShadow: '0px 0px 5px', pt: '10px'}}>
        <Grid item sx={{transform: 'scale(2)'}} ml='20px'><DiscordIcon /></Grid>
        <Grid item xs={10}>
          <Stack direction="row">
            {links.map((link, i) => 
              <Link href={link.url} key={i}>
                <StyledTypography className='.noselect'>{link.name}</StyledTypography>
              </Link>
            )}
          </Stack>
        </Grid>
        <Grid item mr='10px'><SettingIcon /></Grid>
      </Grid>
    )
  }
}

export default Header;