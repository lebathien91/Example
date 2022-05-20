import clsx from "clsx";
import slug from "slug";
import { Fragment, useCallback, useRef, useState } from "react";

import Link from "next/link";
import { fetchAPI } from "@lib/api";

import styles from "@styles/Search.module.css";

const Search = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const inputElement = useRef();

  const searchEndpoint = (query) =>
    fetchAPI("/articles", {
      filters: {
        $or: [
          {
            slug: {
              $containsi: slug(query),
            },
          },
          {
            content: {
              $containsi: query,
            },
          },
        ],
      },
    });

  const resultsData = async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      const results = await searchEndpoint(query);
      setResults(results.data);
    } else {
      setResults([]);
    }
  };

  const onChange = useCallback(resultsData, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  const onClean = useCallback(() => {
    setResults([]);
    setIsSearch(!isSearch);
    setActive(false);
    setQuery("");
  });
  return (
    <Fragment>
      <form action="/search" method="GET">
        <div className={styles.box}>
          <input
            ref={inputElement}
            className={clsx(styles.input, { [styles.show]: isSearch })}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={() => setActive(false)}
            value={query}
            type="text"
            name="keyword"
            placeholder="Nhập tiếng việt có dấu"
            autoComplete="off"
          />
          {active && results.length > 0 && (
            <ul className={clsx(styles.list, { [styles.show]: isSearch })}>
              {results.map((post) => (
                <li className={styles.item} key={post.id}>
                  <Link href={post.attributes.slug}>
                    <a onClick={onClean}>{post.attributes.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      <span
        className={clsx(styles.close, { [styles.show]: isSearch })}
        onClick={onClean}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </span>
      <span
        className={clsx(styles.open, { [styles.show]: !isSearch })}
        onClick={() => {
          setIsSearch(!isSearch);
          setActive(true);
          inputElement.current.focus();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>
    </Fragment>
  );
};

export default Search;
