import Link from "next/link";
import ArticlesList from "./ArticlesList";
import styles from "@styles/HomePage.module.css";
const HomePage = ({ style, articles }) => {
  return articles.map(
    (cat) =>
      cat.attributes.articles?.data.length > 0 && (
        <section className={styles.section} key={cat.id}>
          <div className={styles.heading}>
            <h2 className={styles.title}>{cat.attributes.name}</h2>
            <Link href={`/category/${cat.attributes.slug}`}>
              <a className={styles.viewsAll}>Xem tất cả</a>
            </Link>
          </div>
          <ArticlesList
            style={style}
            articles={cat.attributes.articles.data.slice(0, 6)}
          />
        </section>
      )
  );
};

export default HomePage;
