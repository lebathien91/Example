import { useRouter } from "next/router";
import Layout from "@Layout";
import DetailPage from "@Layout/Main/Contents/DetailPage";
import Loader from "@Loader";
import { fetchAPI } from "@lib/api";
const Detail = ({ article, prevArticle, nextArticle }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const { title, description, image } = article
    ? article.data[0].attributes
    : { title: null, description: null, image: null };

  const seo = {
    metaTitle: title,
    metaDescription: description,
    shareImage: image,
    article: true,
  };
  return (
    <Layout seo={seo} wiki>
      <DetailPage
        article={article.data[0].attributes}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
      />
    </Layout>
  );
};

export default Detail;

export async function getStaticPaths() {
  const articlesAllSlug = await fetchAPI("/articles", { fields: "slug" });
  const paths = articlesAllSlug.data.map((article) => ({
    params: {
      slug: article.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const options = {
    filters: {
      slug: params.slug,
    },
    populate: {
      image: "*",
      author: { populate: "avatar" },
      tags: "*",
    },
  };

  const article = await fetchAPI("/articles", options);
  const articleId = article ? article.data[0]?.id : 0;

  const [next, prev] = await Promise.all([
    fetchAPI("/articles", {
      filters: {
        id: articleId + 1,
      },
    }),
    fetchAPI("/articles", {
      filters: {
        id: articleId - 1,
      },
    }),
  ]);
  const nextArticle = next?.data[0] ? next.data[0].attributes : null;
  const prevArticle = prev?.data[0] ? prev.data[0].attributes : null;
  if (!article.data[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      nextArticle,
      prevArticle,
    },
    revalidate: 1,
  };
}
