import React from "react";
import styles from "./Toast.module.css";

const Toast = () => {
  return (
    <div className={`${styles.container} ${styles.error}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Title</h2>
        <button>X</button>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>Nội dung thông báo</div>
      </div>
    </div>
  );
};

export default Toast;
