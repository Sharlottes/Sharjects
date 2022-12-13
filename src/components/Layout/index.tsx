import React from 'react'

import Header from './Header'
import Footer from './Footer'
import ScrollFab from './ScrollFab'

interface LayoutProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer
}) => (
  <>
    <Header additional={header} />
    <div style={{ minHeight: '100vh', marginTop: '60px' }}>
      <ScrollFab />
      {children}
    </div>
    <Footer additional={footer} />
  </>
)

export default Layout;