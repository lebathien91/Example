import styles from "@styles/Pages.module.css";
const Pages = ({ content }) => {
  return (
    <div
      className={styles.pages}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Pages;
