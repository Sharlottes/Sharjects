import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import ThemeVariables from "src/core/ThemeVariables";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <ScrollFab />
    <main
      style={{
        backgroundColor: ThemeVariables.palette.themedWhite,
      }}
    >
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
