import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<{
  header?: React.ReactNode | undefined,
  footer?: React.ReactNode | undefined,
  children?: React.ReactNode | undefined
}> = ({ children, header, footer }) => (
  <>
    <Header additional={header} />
    {children}
    <Footer additional={footer} />
  </>
)

export default Layout;