import React from 'react';

import Header from './Header'
import Footer from './Footer'

const Layout: React.FC<{
  header?: React.ReactNode | undefined,
  footer?: React.ReactNode | undefined,
  children?: React.ReactNode | undefined
}> = ({ children, header, footer }) => (
  <>
    <Header additional={header} />
    <div id='content-wrapper' style={{ minHeight: '100vh' }}>{children}</div>
    <Footer additional={footer} />
  </>
)

export default Layout;