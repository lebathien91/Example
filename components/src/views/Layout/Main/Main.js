import styles from "./Main.module.css";

const Main = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className="container">{children}</div>
    </main>
  );
};

export default Main;
