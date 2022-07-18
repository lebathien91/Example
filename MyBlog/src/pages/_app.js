import "../styles/styles.scss";
import { GlobalState } from "@/store/GlobalState";
import Notify from "@/components/Notify";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Notify />
      <Component {...pageProps} />
    </GlobalState>
  );
}

export default MyApp;
