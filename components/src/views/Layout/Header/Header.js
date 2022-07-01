import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.logo}>Logo</div>
          <div className={styles.user}>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
