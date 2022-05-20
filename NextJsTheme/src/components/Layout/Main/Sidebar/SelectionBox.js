import Link from "next/link";
import Widget from "./Widget";
import Images from "@Images";
import styles from "@styles/SelectionBox.module.css";
const SelectionBox = ({ articles }) => {
  const selectionName =
    articles[0].attributes.selection === "Featured"
      ? "nổi bật"
      : articles[0].attributes.selection === "Trending"
      ? "xu hướng"
      : articles[0].attributes.selection === "Hotnew"
      ? "mới"
      : null;
  return (
    <Widget title={selectionName}>
      <ul className={styles.post}>
        {articles.map((article) => {
          return (
            <li className={styles.item} key={article.id}>
              <span>
                <Link href={`/${article.attributes.slug}`}>
                  <a className={styles.img}>
                    <Images
                      image={article.attributes.image}
                      width={90}
                      height={60}
                    />
                  </a>
                </Link>
              </span>
              <h4>
                <Link href={`/${article.attributes.slug}`}>
                  <a href={`/${article.attributes.slug}`}>
                    {article.attributes.title}
                  </a>
                </Link>
              </h4>
            </li>
          );
        })}
      </ul>
    </Widget>
  );
};

export default SelectionBox;
