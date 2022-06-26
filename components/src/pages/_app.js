import "../styles/globals.css";
import { GlobalState } from "@/store/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Component {...pageProps} />
    </GlobalState>
  );
}

export default MyApp;
