import Layout from "@/views/Layout";

const HomePage = ({ data }) => {
  return (
    <Layout>
      <div className="container">{data}</div>
    </Layout>
  );
};

export default HomePage;
