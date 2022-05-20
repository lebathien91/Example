import { format } from "date-fns";
import clsx from "clsx";
import Link from "next/link";

import Facebook from "@Facebook";
import Image from "@Images";
import Social from "@Block/Social";

import styles from "@styles/Card.module.css";
import { COMMENT } from "next.config";

const Card = ({ style, article, imgWidth, imgHeight }) => {
  const author = article.author.data;
  const wordsContent = article.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsContent / 200);
  const selection = article.selection;
  let selectionName =
    selection === "Featured"
      ? "Nổi bật"
      : selection === "Trending"
      ? "Xu hướng"
      : selection === "Popular"
      ? "Phổ biến"
      : undefined;
  return (
    <div className={clsx(styles[style], styles.card)}>
      <article className={styles.article}>
        {style !== "grid" && (
          <header className={styles.header}>
            <div className={styles.authorDate}>
              <span className={styles.author}>
                <Image
                  image={author.attributes.avatar}
                  width="120"
                  height="120"
                />
              </span>
              <span className={styles.authorTime}>
                <span className={styles.nameAuthor}>
                  <Link href={`/author/${author.attributes.username}`}>
                    <a>{author.attributes.displayName}</a>
                  </Link>
                </span>
                <span className={styles.date}>
                  <time>
                    {format(
                      article.publishedAt
                        ? new Date(article.publishedAt)
                        : new Date(),
                      "dd-MM-yyyy"
                    )}
                  </time>
                </span>
              </span>
            </div>
            <Social href={article.slug} />
          </header>
        )}

        <main className={styles.main}>
          <div className={styles.banner}>
            <figure className={clsx(styles.figure, "img-fluid")}>
              {style === "grid" && selection && (
                <div
                  className={clsx(
                    styles.badge,
                    styles[selection.toLowerCase()]
                  )}
                >
                  <span>
                    <Link href={`/posts/${selection.toLowerCase()}`}>
                      <a>{selectionName}</a>
                    </Link>
                  </span>
                </div>
              )}
              <Link href={`/${article.slug}`}>
                <a>
                  <Image
                    image={article.image}
                    width={imgWidth}
                    height={imgHeight}
                  />
                </a>
              </Link>
            </figure>
          </div>
          <div className={styles.content}>
            <h2 title="title" className={styles.title}>
              <Link href={`/${article.slug}`}>
                <a>{article.title && article.title}</a>
              </Link>
            </h2>
            <p className={styles.description}>
              {article.description && article.description}
            </p>
          </div>
        </main>
        <footer className={styles.footer}>
          {COMMENT && article.comment ? (
            <Link href={`/${article.slug}#comments`}>
              <a>
                <span className={styles.countComments}>
                  <Facebook href={article.slug} isCommentsCount />
                  <span className={styles.textComments}>Bình luận</span>
                </span>
              </a>
            </Link>
          ) : (
            <Link href={`/${article.slug}`}>
              <a>
                <time>{format(new Date(article.publishedAt), "dd/MM/yy")}</time>
              </a>
            </Link>
          )}

          <Link href={`/${article.slug}`}>
            <a>
              <span> {readTime} phút đọc</span>
            </a>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default Card;
