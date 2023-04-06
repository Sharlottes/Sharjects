import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import { MainBody } from "./styled";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <ScrollFab />
    <MainBody>{children}</MainBody>
    <Footer />
  </>
);

export default Layout;
