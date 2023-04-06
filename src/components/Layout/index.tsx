import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <ScrollFab />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
