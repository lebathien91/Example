import React from "react";

const Toast = () => {
  return (
    <div className="Toast">
      <div className="header">
        <span>Title</span>
        <button>X</button>
      </div>
      <div className="body">
        <div>Nội dung thông báo</div>
      </div>
    </div>
  );
};

export default Toast;
