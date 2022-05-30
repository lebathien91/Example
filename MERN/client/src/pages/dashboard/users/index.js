import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

export default function Users({ users }) {
  const handeDestroy = async (id) => {
    const options = {
      method: "DELETE",
    };
    const data = await fetchAPI(
      `http://localhost:5000/users/destroy/${id}`,
      options
    );
  };
  return (
    <Layout>
      <h2>Danh sách username</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>placeholder</td>
                <td>
                  <button onClick={() => handeDestroy(user._id)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await fetchAPI("http://localhost:5000/users");

  if (!data.success) {
    console.log(data.message);
    return {
      notFound: true,
    };
  }

  return {
    props: { users: data.users },
  };
}
