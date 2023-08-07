import { Outlet } from "react-router-dom";
import "../assets/css/style.css";
import { Fragment } from "react";
import Header from "../components/layout/Header";

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
