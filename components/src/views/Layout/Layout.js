import Seo from "@/components/Seo";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="default-layout">
      <Seo />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
