import { AppBar, Fab, Toolbar } from '@mui/material';
import { ScriptProps } from 'next/script';
import Header from './Header';
import ScrollTop from './ScrollTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface LayoutProps extends ScriptProps {
  header?: JSX.Element
}

const Layout: React.FC<LayoutProps> = (props) =>
  <div>
    <AppBar sx={{ 'backgroundColor': 'white' }}>
      <Header />
      {props.header}
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <div>
      {props.children}
    </div>
    <ScrollTop {...props}>
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  </div>

export default Layout;