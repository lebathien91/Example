import Seo from "@/Components/Seo";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
