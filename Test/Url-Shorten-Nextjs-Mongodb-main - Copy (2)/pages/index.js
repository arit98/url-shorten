import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import UrlShortner from "./url-short/page"
import LoginForm from "./login/page";
import RegisterForm from "./register/page";

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  );
}