import clsx from "clsx";
import { Fragment, useState } from "react";
import { format } from "date-fns";
import slug from "slug";
import { parse } from "node-html-parser";
import Link from "next/link";
import Facebook from "@Facebook";
import SocialBox from "@Block/Social";
import AuthorBox from "./AuthorBox";
import TableContent from "./TableContent";

import styles from "@styles/Detail.module.css";

import { COMMENT } from "next.config";

const DetailPage = ({ article, prevArticle, nextArticle }) => {
  const [show, setShow] = useState(true);
  const content = parse(article.content);
  const headings = content.querySelectorAll("h1, h2, h3");
  for (const heading of headings) {
    heading.setAttribute("id", slug(heading.rawText));
  }
  return (
    <Fragment>
      <article className={styles.wiki}>
        <div className={styles.main}>
          <div className="wiki-content">
            <h1 className={styles.title}>{article.title}</h1>
            <header className={styles.header}>
              <div className={styles.authorDate}>
                <span className={styles.authorTime}>
                  <span className={styles.date}>
                    <time>
                      {format(new Date(article.publishedAt), "dd-MM-yyyy")}
                    </time>
                  </span>
                  <span className={styles.nameAuthor}>
                    <span> bởi </span>
                    <Link
                      href={`/author/${article.author.data.attributes.username}`}
                    >
                      <a>{article.author.data.attributes.displayName}</a>
                    </Link>
                  </span>
                </span>
              </div>
              <SocialBox size={26} href={article.slug} />
            </header>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {article.references && (
              <div className={styles.references}>
                <h2 className={styles.title} onClick={() => setShow(!show)}>
                  TÀI LIỆU THAM KHẢO
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      {show ? (
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      ) : (
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                      )}
                    </svg>
                  </span>
                </h2>
                <div
                  className={clsx({ [styles.referencesContent]: show })}
                  dangerouslySetInnerHTML={{ __html: article.references }}
                ></div>
              </div>
            )}
            {article.tags?.data.length > 0 && (
              <div className={styles.tags}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                  </svg>
                </span>
                {article.tags?.data.map((tag) => (
                  <span className={styles.item} key={tag.id}>
                    <Link href={`/tags/${tag.attributes.slug}`}>
                      <a>{tag.attributes.name}</a>
                    </Link>
                  </span>
                ))}
              </div>
            )}
            <AuthorBox author={article.author.data.attributes} />
            <div className={styles.pagination}>
              <div className={styles.prev}>
                {prevArticle && (
                  <>
                    <span>bài trước</span>
                    <Link href={`/${prevArticle.slug}`}>
                      <a>{prevArticle.title}</a>
                    </Link>
                  </>
                )}
              </div>

              <div className={styles.next}>
                {nextArticle && (
                  <>
                    <span>bài kế tiếp</span>
                    <Link href={`/${nextArticle.slug}`}>
                      <a>{nextArticle.title}</a>
                    </Link>
                  </>
                )}
              </div>
            </div>
            {COMMENT && article.comment && (
              <div id="comments">
                <Facebook href={article.slug} isComments />
              </div>
            )}
          </div>
        </div>
      </article>
      <TableContent key={article.slug} headings={headings} />
    </Fragment>
  );
};

export default DetailPage;
