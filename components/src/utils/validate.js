export const register = (username, email, password, cf_password) => {
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  if (!username || !email || !password || !cf_password)
    return "Bạn cần nhập đầy đủ các trường";

  if (!validateEmail(email)) return "Email không hợp lệ";

  if (password.length < 6) return "Mật khẩu ít nhấp 6 ký tự";

  if (password !== cf_password) return "Mật khẩu nhập lại không khớp";
};
