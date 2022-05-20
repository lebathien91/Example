import clsx from "clsx";
import Sidebar from "./Sidebar";
import styles from "@styles/Main.module.css";
const Main = ({ children, sidebar, style, wiki }) => {
  return (
    <main className="main">
      <div className="container">
        <section className={clsx(styles.mainContent, { [styles.wiki]: wiki })}>
          <section
            className={clsx(styles[style], styles.content, {
              [styles.wiki]: wiki,
            })}
          >
            {children}
          </section>
          {sidebar && <Sidebar selection={sidebar} />}
        </section>
      </div>
    </main>
  );
};

export default Main;
