import React from "react";
import { Header } from "../Header";
import "./Layout.scss";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export { Layout };
