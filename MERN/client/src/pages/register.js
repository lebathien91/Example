import { useState } from "react";
import { fetchAPI } from "@/libs/api";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = registerForm;

  const handeInput = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify(registerForm),
    };
    try {
      const response = await fetchAPI(
        "http://localhost:5000/users/register",
        options
      );
      console.log(response);
      if (response.success) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="main-form">
      <form className="form-signin">
        <img className="mb-4" src="/vercel.svg" alt="" width={72} height={57} />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="username"
            className="form-control mb-3"
            name="username"
            id="floatingInput"
            placeholder="name@example.com"
            value={username}
            onChange={handeInput}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control mb-3"
            name="email"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={handeInput}
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={handeInput}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2021</p>
      </form>
    </main>
  );
};

export default Login;
