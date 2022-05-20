import { useRouter } from "next/router";
import Layout from "@Layout";
import ArticlesList from "@Layout/Main/Contents/ArticlesList";
import Pagination from "@Pagination";
import Loader from "@Loader";
import { fetchAPI, fetchSWRPagination } from "@lib/api";
import { PAGE_SIZE } from "next.config";

const Category = ({ categories, posts, selections }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  const categorySlug = router.query.slug;
  const options = {
    filters: {
      categories: {
        slug: categorySlug,
      },
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
      categories: "*",
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

  const category = categories.data.filter(
    (category) => category.attributes.slug == categorySlug
  );
  const categoryName = category ? category[0].attributes.name : "Thể loại";
  const seo = {
    metaTitle: categoryName,
    metaDescription: `Tất cả bài viết của ${categoryName}`,
  };
  return (
    <Layout seo={seo} sidebar={selections.data}>
      <ArticlesList style="list" articles={articles} />
      {isLoadding ? (
        <Loader />
      ) : isReachedEnd ? null : (
        <Pagination size={size} setSize={setSize} />
      )}
    </Layout>
  );
};

export default Category;

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories", { fields: ["slug"] });

  return {
    paths: categories.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const categorySlug = params.slug;
  const selection = {
    filters: {
      selection: "Featured",
    },
    populate: {
      image: "*",
    },
  };

  const options = {
    filters: {
      categories: {
        slug: categorySlug,
      },
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
      categories: "*",
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
  };

  const [categories, posts, selections] = await Promise.all([
    fetchAPI("/categories"),
    fetchAPI("/articles", options),
    fetchAPI("/articles", selection),
  ]);

  if (!categories || !posts || !selections) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories,
      posts,
      selections,
    },
    revalidate: 1,
  };
}
