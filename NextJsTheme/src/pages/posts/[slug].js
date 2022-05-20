import { useRouter } from "next/router";
import Layout from "@Layout";
import ArticlesList from "@Layout/Main/Contents/ArticlesList";
import Pagination from "@Pagination";
import Loader from "@Loader";

import { fetchAPI, fetchSWRPagination } from "@lib/api";
import { PAGE_SIZE } from "next.config";

const Selection = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const selection =
    router.query.slug.charAt(0).toUpperCase() + router.query.slug.slice(1);
  const options = {
    filters: {
      selection,
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
    },
  };

  const { pageData, error, size, setSize, isReachedEnd, isLoadding } =
    fetchSWRPagination("/articles", options);
  if (error) return <h1>Something went wrong!</h1>;
  let articles;
  if (pageData.length) {
    articles = pageData;
  } else {
    articles = posts.data;
  }

  const seo = {
    metaTitle: selection,
    metaDescription: `Tất cả bài viết của ${selection}`,
  };
  return (
    <Layout style="grid" seo={seo}>
      <ArticlesList style="grid" articles={articles} />
      {isLoadding ? (
        <Loader />
      ) : isReachedEnd ? null : (
        <Pagination size={size} setSize={setSize} />
      )}
    </Layout>
  );
};

export default Selection;

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        slug: "featured",
      },
    },
    {
      params: {
        slug: "trending",
      },
    },
    {
      params: {
        slug: "hotnew",
      },
    },
  ];
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const selection = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const options = {
    filters: {
      selection,
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
  };
  const posts = await fetchAPI("/articles", options);

  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}
