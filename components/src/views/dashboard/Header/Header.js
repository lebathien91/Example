import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="flex space-between center-y">
          <div className="logo">logo</div>
          <div className="user">
            <a className="flex center-y" href="#">
              <img
                className="avatar"
                src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                alt="avatar"
              />
              <span>Username</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
