import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import variableMap from "src/lib/variableMap";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <ScrollFab />
    <main
      style={{
        backgroundColor: variableMap.palette.themedWhite,
      }}
    >
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
