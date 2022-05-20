import clsx from "clsx";
import Card from "@Block/Card";
import styles from "@styles/ArticlesList.module.css";
const ArticlesList = ({ style, articles, imgWidth, imgHeight }) => {
  return (
    <div className={clsx(styles[style], styles.row)}>
      {articles.map((article) => (
        <Card
          style={style}
          key={article.id}
          article={article.attributes}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
        />
      ))}
    </div>
  );
};

export default ArticlesList;

ArticlesList.defaultProps = {
  imgWidth: 740,
  imgHeight: 370,
};
