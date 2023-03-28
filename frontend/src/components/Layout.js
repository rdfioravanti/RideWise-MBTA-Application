import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;