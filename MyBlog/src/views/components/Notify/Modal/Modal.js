import styles from "./Modal.module.css";

const Modal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.opacity}></div>
      <div className={styles.dialog}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h5 className={styles.title}>Modal title</h5>
            <span className={styles.close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          </div>
          <div className={styles.body}>
            <p>Bạn có muốn xoá phần tử này?</p>
          </div>
          <div className={styles.footer}>
            <button className={`${styles.btn} ${styles.agree}`}>Yes</button>
            <button className={`${styles.btn} ${styles.disagree}`}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
