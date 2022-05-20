import slug from "slug";
import { useRouter } from "next/router";
import Layout from "@Layout";
import ArticlesList from "@Layout/Main/Contents/ArticlesList";
import Pagination from "@Pagination";
import Loader from "@Loader";

import { fetchAPI, fetchSWRPagination } from "../lib/api";

export default function search({ selections }) {
  const router = useRouter();
  const keyword = router.query.keyword;
  const seo = {
    metaTitle: "Tìm kiếm",
    metaDescription: `Kết quả tìm kiếm cho ${keyword}`,
  };
  if (!keyword) {
    return (
      <Layout seo={seo} sidebar={selections.data}>
        <h1>Không có từ khoá tìm kiếm</h1>
      </Layout>
    );
  }

  const options = {
    filters: {
      $or: [
        {
          slug: {
            $containsi: slug(keyword),
          },
        },
        {
          content: {
            $containsi: keyword,
          },
        },
      ],
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
    },
  };

  const { pageData, error, size, setSize, isReachedEnd, isLoadding } =
    fetchSWRPagination("/articles", options);

  if (error) return <h1>Something went wrong!</h1>;

  const articles = pageData;

  return (
    <Layout seo={seo} sidebar={selections.data}>
      <h1>
        {isLoadding
          ? "Đang tìm kiếm..."
          : articles.length
          ? "Kết quả tìm kiếm cho: " + keyword
          : "Không tìm thấy kết quả cho: " + keyword}
      </h1>
      <ArticlesList style="list" articles={articles} />
      {isLoadding ? (
        <Loader />
      ) : isReachedEnd ? null : (
        <Pagination size={size} setSize={setSize} />
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const selection = {
    filters: {
      selection: "Featured",
    },
    populate: "image",
  };

  const selections = await fetchAPI("/articles", selection);

  return {
    props: {
      selections,
    },
  };
}
