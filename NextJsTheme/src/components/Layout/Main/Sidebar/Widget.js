import Link from "next/link";
import styles from "@styles/Widget.module.css";
const Widget = ({ title, children }) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>
        <Link href="#">
          <a>{title}</a>
        </Link>
      </h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Widget;
