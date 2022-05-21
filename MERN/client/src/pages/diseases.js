import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

const Diseases = ({ diseases }) => {
  return (
    <Layout>
      {diseases.map((disease) => (
        <div className="card" key={disease._id}>
          <h2>headding 2</h2>
          <p className="description">description</p>
        </div>
      ))}
    </Layout>
  );
};

export default Diseases;

export async function getServerSideProps() {
  const data = await fetchAPI("http://localhost:5000/diseases");

  if (!data.success) {
    console.log(data.message);
    return {
      notFound: true,
    };
  }

  return {
    props: { diseases: data.diseases },
  };
}
