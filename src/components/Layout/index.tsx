import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import { MainBody } from "./styled";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => (
  <>
    <Header additional={header} />
    <ScrollFab />
    <MainBody>{children}</MainBody>
    <Footer additional={footer} />
  </>
);

export default Layout;
