import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <ScrollFab />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
