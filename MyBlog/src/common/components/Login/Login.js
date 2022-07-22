import { useState, useContext } from "react";

import Link from "next/link";
import { GlobalContext } from "@/common/store/GlobalState";
import styles from "./Login.module.css";

const Login = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const { email, password, remember } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = () => {
    setFormData({
      ...formData,
      remember: !remember,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Bạn phải nhập đầy đủ các trường" },
      });
    console.log(formData);
  };

  return (
    <div className={styles.login}>
      <div className="container">
        <div className={styles.center}>
          <div className={styles.wrap}>
            <div className={styles.back}>
              <a href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </a>
            </div>
            <div className={styles.icon}>
              <span className={styles.user}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </span>
            </div>
            <h3 className={styles.title}>Login</h3>
            <form method="POST" action="#">
              <div className={styles.group}>
                <input
                  className={styles.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <input
                  className={styles.password}
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <button
                  className={styles.btn}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Đăng nhập
                </button>
              </div>
              <div className={styles.group}>
                <div className={styles.w50}>
                  <label className={styles.remember}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={remember}
                      onChange={handleCheckbox}
                    />
                    Remember Me
                  </label>
                </div>
                <div className={`${styles.w50} ${styles.forgot}`}>
                  <a href="#">Quên mật khẩu</a>
                </div>
              </div>

              <div className={styles.notmember}>
                <span>Bạn không phải thành viên? </span>
                <Link href="/register">
                  <a>Đăng ký ngay</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
