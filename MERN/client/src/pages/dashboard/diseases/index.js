import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

export default function Dashboard({ diseases }) {
  return (
    <Layout>
      <h2>Danh sách bài viết</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((disease) => (
              <tr key={disease._id}>
                <td>{disease._id}</td>
                <td>{disease.name}</td>
                <td>{disease.description}</td>
                <td>placeholder</td>
                <td>text</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
