import { useRouter } from "next/router";
import Layout from "@Layout";
import ArticlesList from "@Layout/Main/Contents/ArticlesList";
import Pagination from "@Pagination";
import Loader from "@Loader";
import { fetchAPI, fetchSWRPagination } from "@lib/api";
import { PAGE_SIZE } from "next.config";

const Author = ({ posts, selections }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const authorSlug = router.query.slug;

  const options = {
    filters: {
      author: {
        username: authorSlug,
      },
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

  const displayName = articles?.data
    ? articles.data[0]?.attributes.author.data.attributes.displayName
    : "Tác giả";

  const seo = {
    metaTitle: displayName,
    metaDescription: `Tất cả bài viết của ${displayName}`,
  };
  return (
    <Layout seo={seo} sidebar={selections.data}>
      <ArticlesList
        style="loop"
        articles={articles}
        imgWidth={900}
        imgHeight={450}
      />
      {isLoadding ? (
        <Loader />
      ) : isReachedEnd ? null : (
        <Pagination size={size} setSize={setSize} />
      )}
    </Layout>
  );
};

export default Author;

export async function getStaticPaths() {
  const users = await fetchAPI("/users", { fields: "username" });

  return {
    paths: users.map((user) => ({
      params: {
        slug: user.username,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const authorSlug = params.slug;
  const selection = {
    filters: {
      selection: "Featured",
    },
    populate: {
      image: "*",
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
  };
  const options = {
    filters: {
      author: {
        username: authorSlug,
      },
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
  };
  const [posts, selections] = await Promise.all([
    fetchAPI("/articles", options),
    fetchAPI("/articles", selection),
  ]);

  if (!posts || !selections) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts,
      selections,
    },
    revalidate: 1,
  };
}
