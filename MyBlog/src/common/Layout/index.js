import React from "react";
import Header from "./Header";
import Main from "./Main";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default DefaultLayout;
