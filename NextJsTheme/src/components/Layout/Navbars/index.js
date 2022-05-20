import clsx from "clsx";
import { useState } from "react";

import Nav from "@Block/Nav";
import Search from "@Block/Search";
import styles from "@styles/MainMenu.module.css";
const Navbars = ({ navbars, logo }) => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className={styles.navbars}>
      <div className="container">
        <div className={styles.navSearch}>
          <span
            className={styles.menuMobile}
            onClick={() => setIsMobile(!isMobile)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </span>
          <div
            className={clsx(styles.overlay, { [styles.show]: isMobile })}
            onClick={() => setIsMobile(!isMobile)}
          ></div>
          <Nav
            path="/category"
            nav={navbars}
            mainMenu={logo}
            isMobile={isMobile}
            setIsMobile={setIsMobile}
          />
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbars;
