import Notify from "../Notify";
import Seo from "../Seo";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Notify />
      <Seo />

      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
