import Link from "next/link";
import Images from "@Images";
import styles from "@styles/AuthorBox.module.css";
const AuthorBox = ({ author }) => {
  return (
    <div className={styles.authorBox}>
      <div className={styles.avatar}>
        <Link href={`/author/${author.username}`}>
          <a>
            <Images image={author.avatar} height={100} width={100} />
          </a>
        </Link>
      </div>
      <div className={styles.decription}>
        <Link href={`/author/${author.username}`}>
          <a>{author.displayName}</a>
        </Link>
        <p>{author.description ? author.description : ""}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
