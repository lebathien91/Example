import { Fragment, useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "@styles/TableContent.module.css";

const TableContent = ({ headings }) => {
  const [showTableContent, setShowTableContent] = useState(false);
  const [activeId, setActiveId] = useState();

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];

    headingElements.forEach((heading) => {
      const id = heading.id;
      const title = heading.rawText.trim();

      if (heading.tagName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.tagName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });

    return nestedHeadings;
  };

  const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState([]);

    useEffect(() => {
      const headingElements = headings;

      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);
    return { nestedHeadings };
  };
  const { nestedHeadings } = useHeadingsData();

  const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = useRef({});
    useEffect(() => {
      const callback = (headings) => {
        headingElementsRef.current = headings.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);

        const visibleHeadings = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting)
            visibleHeadings.push(headingElement);
        });

        const getIndexFromId = (id) =>
          headingElements.findIndex((heading) => heading.id === id);

        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
          );
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      };

      const observer = new IntersectionObserver(callback, {
        rootMargin: "-80px 0px -50% 0px",
      });

      const headingElements = Array.from(
        document.querySelectorAll(".wiki-content h2, .wiki-content h3")
      );

      headingElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }, [setActiveId]);
  };

  useIntersectionObserver(setActiveId);

  return (
    <Fragment>
      <aside
        className={clsx(styles.sidebar, { [styles.show]: showTableContent })}
      >
        <nav className={styles.nav}>
          <ol className={styles.list}>
            {nestedHeadings.map((heading) => {
              return (
                <li
                  key={heading.id}
                  className={styles.item}
                  onClick={() => setShowTableContent(false)}
                >
                  <a
                    className={clsx({
                      [styles.active]: heading.id === activeId,
                    })}
                    href={`#${heading.id}`}
                  >
                    {heading.id === activeId && (
                      <span className={styles.icon}></span>
                    )}
                    {heading.title}
                  </a>
                  {heading.items.length > 0 && (
                    <ol>
                      {heading.items.map((child) => (
                        <li
                          className={styles.item}
                          key={child.id}
                          onClick={() => setShowTableContent(false)}
                        >
                          <a
                            className={clsx({
                              [styles.active]: child.id === activeId,
                            })}
                            href={`#${child.id}`}
                          >
                            {child.id === activeId && (
                              <span className={styles.icon}></span>
                            )}
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>
      <div
        className={clsx(styles.content, { [styles.show]: showTableContent })}
        onClick={() => setShowTableContent(!showTableContent)}
      >
        <div className={styles.width}>
          <div className={styles.height}>
            <div className={styles.button}>
              <svg
                className={styles.topSvg}
                viewBox="0 0 926.23699 573.74994"
                version="1.1"
                x="0px"
                y="0px"
                width="15"
                height="15"
              >
                <g transform="translate(904.92214,-879.1482)">
                  <path
                    fill="currentColor"
                    d="m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,-55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,-174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,-174.68583 0.6895,0 26.281,25.03215 56.8701,55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864-231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,-104.0616 -231.873,-231.248 z"
                  ></path>
                </g>
              </svg>
              <svg
                className={styles.bottomSvg}
                viewBox="0 0 926.23699 573.74994"
                version="1.1"
                x="0px"
                y="0px"
                width="15"
                height="15"
              >
                <g transform="translate(904.92214,-879.1482)">
                  <path
                    fill="currentColor"
                    d="m -673.67664,1221.6502 -231.2455,-231.24803 55.6165,-55.627 c 30.5891,-30.59485 56.1806,-55.627 56.8701,-55.627 0.6894,0 79.8637,78.60862 175.9427,174.68583 l 174.6892,174.6858 174.6892,-174.6858 c 96.079,-96.07721 175.253196,-174.68583 175.942696,-174.68583 0.6895,0 26.281,25.03215 56.8701,55.627 l 55.6165,55.627 -231.245496,231.24803 c -127.185,127.1864-231.5279,231.248 -231.873,231.248 -0.3451,0 -104.688,-104.0616 -231.873,-231.248 z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TableContent;
