import { useState, useContext } from "react";
import { GlobalContext } from "@/store/GlobalState";
import Link from "next/link";
import styles from "./Register.module.css";
import { validRegister } from "@/utils/validate";
import { postData } from "@/utils/fetchData";

const Register = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cf_password: "",
    checked: false,
  });

  const { username, email, password, cf_password, checked } = formData;

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
      checked: !checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cf_password, checked } = formData;

    const msg = validRegister(username, email, password, cf_password);

    if (msg)
      return dispatch({
        type: "NOTIFY",
        payload: { error: msg },
      });

    if (!checked)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Bạn cần đồng ý với điều khoản bảo mật" },
      });
    const res = await postData("user");
    console.log(res);
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
            <h3 className={styles.title}>Đăng ký</h3>
            <form method="POST" action="#">
              <div className={styles.group}>
                <input
                  name="username"
                  type="username"
                  placeholder="Tên"
                  value={username}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <input
                  name="cf_password"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={cf_password}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.group}>
                <button
                  className={styles.btn}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Đăng ký
                </button>
              </div>
              <div className={styles.group}>
                <label className={styles.remember}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckbox}
                  />
                  <span>
                    Tôi đồng ý với <a href="#">điều khoản bảo mật</a>
                  </span>
                </label>
              </div>
              <div className={styles.notmember}>
                <span>Bạn đã là thành viên? </span>
                <Link href="/login">
                  <a>Đăng nhập ngay</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
