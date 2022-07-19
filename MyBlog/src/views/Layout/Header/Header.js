const Header = () => {
  return (
    <header className="header">
      <div className="flex space-between">
        <div className="logo">Logo</div>
        <div className="user">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
