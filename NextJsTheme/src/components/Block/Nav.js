import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@styles/Nav.module.css";
import Images from "@Images";

const Nav = ({ path, nav, mainMenu, isMobile, setIsMobile }) => {
  const router = useRouter();
  const slug = router.query.slug;
  const route = router.route;

  return (
    <nav
      className={clsx(styles.nav, {
        [styles.mainMenu]: mainMenu,
        [styles.show]: isMobile,
      })}
    >
      {mainMenu && (
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Link href="/">
              <a onClick={() => setIsMobile(false)}>
                <Images image={mainMenu} width={50} height={50} />
              </a>
            </Link>
          </div>
          <span className={styles.close} onClick={() => setIsMobile(!isMobile)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>
        </div>
      )}
      <ul className={styles.list}>
        <li className={clsx(styles.item, { [styles.home]: mainMenu })}>
          <Link href="/">
            {mainMenu ? (
              <a
                className={clsx(styles.link, {
                  [styles.active]: route === "/",
                })}
                onClick={() => setIsMobile(false)}
              >
                <svg
                  className={styles.homeIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L8 2.207l6.646 6.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Zm0 5.189c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z"
                  />
                </svg>
              </a>
            ) : (
              <a className={styles.link}>Home</a>
            )}
          </Link>
        </li>
        {nav?.length &&
          nav.map((item) => (
            <li
              className={clsx(styles.item, {
                [styles.active]: slug === item.attributes.slug,
              })}
              key={item.id}
            >
              <Link href={`${path}/${item.attributes.slug}`}>
                <a
                  className={styles.link}
                  onClick={mainMenu && (() => setIsMobile(false))}
                >
                  {item.attributes.name}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Nav;
