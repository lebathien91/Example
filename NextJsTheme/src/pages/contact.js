import Layout from "@Layout";
import Pages from "@Layout/Main/Contents/Pages";
import { fetchAPI } from "@lib/api";
const contact = ({ content }) => {
  const seo = {
    metaTitle: content.name,
    slug: content.slug,
  };
  return (
    <Layout seo={seo}>
      <Pages content={content.content} />
    </Layout>
  );
};

export default contact;

export async function getStaticProps() {
  try {
    const content = await fetchAPI("/pages", {
      filters: { slug: "contact" },
    });

    return {
      props: {
        content: content.data[0]?.attributes,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
