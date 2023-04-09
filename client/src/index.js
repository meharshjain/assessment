import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Navigate } from "react-router-dom";
import "./css/style.css";

/* 
components
*/
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NewRequest from "./components/NewRequest";
import ManageTasks from "./components/ManageTasks";

function Logout() {
  const [sessionUser, setSessionUser] = useState("");
  const userHomePage = async function test() {
    try {
      const res = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await res.json();
      setSessionUser(user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    userHomePage();
  }, []);
  if (!sessionUser) {
    return <Navigate to="/" />;
  }
  return <Navigate to="/logout" />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
      integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,700"
      rel="stylesheet"
    />
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/:type/login" element={<Login />}></Route>
        <Route exact path="/:type/register" element={<Register />}></Route>
        <Route exact path="/newRequest" element={<NewRequest />}></Route>
        <Route exact path="/manageTasks" element={<ManageTasks />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
