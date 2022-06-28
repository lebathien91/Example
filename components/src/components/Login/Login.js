import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className="container">
        <div className={styles.center}>
          <div className={styles.wrap}>
            <div className={styles.icon}>
              <span className={styles.user}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </span>
            </div>
            <form>
              <div className="group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="group">
                <label>password</label>
                <input type="password" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
