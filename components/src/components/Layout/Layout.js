import React from "react";
import Display from "../Display";

const Layout = ({ children }) => {
  return (
    <>
      <Display />
      {children}
    </>
  );
};

export default Layout;
