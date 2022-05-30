import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

export default function Home({ diseases }) {
  return (
    <Layout>
      <main className="d-flex flex-column min-vh-100">
        {diseases.map((disease) => {
          return (
            <div key={disease._id}>
              <h2>{disease.name}</h2>
              <p>{disease.description}</p>
              <p>{disease.body}</p>
            </div>
          );
        })}
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
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
