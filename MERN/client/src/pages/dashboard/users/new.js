import Layout from "@/components/Layout";
import { fetchAPI } from "@/libs/api";

export default function createUsers() {
  return (
    <Layout>
      <h2>Tạo mới username</h2>
      <div className="table-responsive">
        <form>
          <div className="form-floating">
            <input
              type="username"
              className="form-control mb-3"
              name="username"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              id="floatingEmail"
              placeholder="Password"
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Create User
          </button>
        </form>
      </div>
    </Layout>
  );
}
