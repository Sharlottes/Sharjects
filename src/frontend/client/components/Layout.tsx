import { ScriptProps } from 'next/script'
import { AppBar, Fab, Toolbar } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Header from './Header'
import ScrollTop from './ScrollTop'

interface LayoutProps extends ScriptProps {
  header?: JSX.Element
}

const Layout: React.FC<LayoutProps> = (props) =>
  <>
    <AppBar sx={{ 'backgroundColor': 'white' }}>
      <Header />
      {props.header}
    </AppBar>

    <Toolbar id='back-to-top-anchor' />

    {props.children}

    <ScrollTop {...props}>
      <Fab size='small' aria-label='scroll back to top'>
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </>

export default Layout