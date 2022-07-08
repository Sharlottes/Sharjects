import { AppBar, Fab, Toolbar } from '@mui/material';
import { ScriptProps } from 'next/script';
import { Component } from 'react';
import Header from './Header';
import ScrollTop from './ScrollTop';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

class Layout extends Component<ScriptProps & {header?: JSX.Element}> {
  render(): JSX.Element {
    return (
      <div>     
        <AppBar sx={{'backgroundColor': 'white'}}>
            <Header/>
            {this.props.header}
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <div>
          {this.props.children}
        </div>
        <ScrollTop {...this.props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      </div>
    )
  }
}

export default Layout;