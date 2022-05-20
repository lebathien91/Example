import styles from "@styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <span className={styles.ellipsis}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}
