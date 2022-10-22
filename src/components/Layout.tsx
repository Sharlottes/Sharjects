import React from 'react';

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}

const HEADER_HEIGHT = '60px';

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer
}) => (
  <>
    <Header additional={header} height={HEADER_HEIGHT} />
    <div id='content-wrapper' style={{ minHeight: '100vh', marginTop: HEADER_HEIGHT }}>
      {children}
    </div>
    <Footer additional={footer} />
  </>
)

export default Layout;