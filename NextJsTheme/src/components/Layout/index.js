import { Fragment, useContext } from "react";

import { GlobalContext } from "../../pages/_app";
import Seo from "../Seo";
import Header from "./Header";
import Navbars from "./Navbars";
import Main from "./Main";
import Footer from "./Footer";

const Layout = ({ style, seo, footer, children, sidebar, wiki }) => {
  const { global, listPages, navbars } = useContext(GlobalContext);
  const { defaultSeo, siteName, favicon } = global;
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
    siteName,
    favicon,
  };

  return (
    <Fragment>
      <Seo seo={seoWithDefaults} />
      <Header siteName={siteName} navbars={listPages} />
      <Navbars navbars={navbars} logo={favicon} />
      <Main style={style} sidebar={sidebar} wiki={wiki}>
        {children}
      </Main>
      <Footer navbars={listPages} wiki={wiki} />
    </Fragment>
  );
};

export default Layout;
