import { useRouter } from "next/router";
import Layout from "@Layout";
import ArticlesList from "@Layout/Main/Contents/ArticlesList";
import Pagination from "@Pagination";
import Loader from "@Loader";
import { fetchAPI, fetchSWRPagination } from "@lib/api";
import { PAGE_SIZE } from "next.config";

const Tags = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const tagSlug = router.query.slug;

  const options = {
    filters: {
      tags: {
        slug: tagSlug,
      },
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
      tags: "*",
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

  const tagName = articles?.data
    ? articles.data[0].attributes.tags.data[0].attributes?.name
    : "Tags";

  const seo = {
    metaTitle: tagName,
    metaDescription: `Tất cả bài viết của ${tagName}`,
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

export default Tags;

export async function getStaticPaths() {
  const tags = await fetchAPI("/tags", { fields: ["slug"] });

  return {
    paths: tags.data.map((tag) => ({
      params: {
        slug: tag.attributes.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const tagSlug = params.slug;

  const options = {
    filters: {
      tags: {
        slug: tagSlug,
      },
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
      tags: "*",
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
