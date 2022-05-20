import Link from "next/link";
import Nav from "@Block/Nav";
import Social from "@Block/Social";
import styles from "@styles/Header.module.css";

const Header = ({ siteName, navbars }) => {
  return (
    <header>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.navSocial}>
            <Nav path="" nav={navbars} />
            <Social />
          </div>
        </div>
      </div>
      <div className={styles.slogan}>
        <div className="container">
          <h1 className={styles.title}>
            <Link href="/">
              <a>{siteName}</a>
            </Link>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
