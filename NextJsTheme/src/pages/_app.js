import "../styles/normalize.css";
import "../styles/globals.css";

import { createContext } from "react";
import App from "next/app";
import Script from "next/script";
import { fetchAPI } from "@lib/api";
import { DEFAULT_GLOBAL, GOOGLE_ANALYTICS } from "../../next.config";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GOOGLE_ANALYTICS}');`}
      </Script>

      <GlobalContext.Provider value={pageProps}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  try {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);
    // Fetch global site settings from Strapi
    const [seoDefault, pages, categories] = await Promise.all([
      fetchAPI("/global", {
        populate: {
          favicon: "*",
          defaultSeo: {
            populate: "*",
          },
          social: "*",
        },
      }),
      fetchAPI("/pages", { fields: ["name", "slug"] }),
      fetchAPI("/categories", { fields: ["name", "slug"] }),
    ]);

    const global = seoDefault ? seoDefault.data.attributes : DEFAULT_GLOBAL;
    const listPages = pages ? pages.data : [];
    const navbars = categories ? categories.data : [];
    // Pass the data to our page via props
    return { ...appProps, pageProps: { global, listPages, navbars } };
  } catch (error) {
    return { pageProps: { global: DEFAULT_GLOBAL } };
  }
};

export default MyApp;
