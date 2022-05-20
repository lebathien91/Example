import styles from "@styles/Pagination.module.css";
const Pagination = ({ size, setSize }) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => setSize(size + 1)} className="btn">
        Xem thêm
      </button>
    </div>
  );
};

export default Pagination;
