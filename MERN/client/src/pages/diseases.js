import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

const Diseases = () => {
  const diseases = fetchAPI("http://localhost:5000/diseases");
  console.log(diseases);

  if (diseases.success) {
    const posts = diseases.diseases;
  }

  return (
    <Layout>
      <div className="card">
        <h2>headding 2</h2>
        <p className="description">description</p>
      </div>
    </Layout>
  );
};

export default Diseases;
