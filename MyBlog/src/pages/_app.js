import "@/common/assets/css/bootstrap.min.css";
import "@/common/assets/css/globals.css";

import Notify from "@/common/components/Notify";
import GlobalState from "@/common/store/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Notify />
      <Component {...pageProps} />
    </GlobalState>
  );
}

export default MyApp;
