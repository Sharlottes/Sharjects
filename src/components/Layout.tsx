import React from 'react';

import Header from './Header'
import Footer from './Footer'

const HEADER_HEIGHT = '60px';

const Layout: React.FC<{
  header?: React.ReactNode,
  footer?: React.ReactNode,
  children?: React.ReactNode
}> = ({ children, header, footer }) => (
  <>
    <Header additional={header} height={HEADER_HEIGHT} />
    <div id='content-wrapper' style={{ minHeight: '100vh', marginTop: HEADER_HEIGHT }}>{children}</div>
    <Footer additional={footer} />
  </>
)

export default Layout;