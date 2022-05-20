import Layout from "@Layout";
import HomePage from "@Layout/Main/Contents/HomePage";
import { fetchAPI } from "@lib/api";
export default function Home({ articles }) {
  return (
    <Layout style="grid">
      <HomePage style="grid" articles={articles.data} />
    </Layout>
  );
}

export async function getStaticProps() {
  const options = {
    populate: {
      articles: {
        populate: {
          image: "*",
          author: { populate: "avatar" },
        },
        filters: {
          isHomePage: true,
        },
      },
    },
  };

  const articles = await fetchAPI("/categories", options);

  return {
    props: {
      articles,
    },
    revalidate: 1,
  };
}
