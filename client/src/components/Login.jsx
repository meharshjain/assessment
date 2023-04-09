import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const hrefPath = window.location.pathname.replace("login", "register");
  return (
    <a className="btn btn-default btn-primary btn-block" href={hrefPath}>
      Register Here
    </a>
  );
}

function Login() {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState("");
  const userHomePage = async function test() {
    const res = await fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    setSessionUser(user);
  };
  useEffect(() => {
    userHomePage();
  }, []);
  if (sessionUser && `/${sessionUser.userType}/login` === window.location.pathname) {
    if (sessionUser.userType === "customer") return navigate("/newRequest");
    else if (sessionUser.username === "employee1")
      return navigate("/manageTasks");
    else if (sessionUser.username === "employee2") return navigate("/manageTasks?option=myTasks");
  }
  return (
    <div className="AppContainer img3">
      <div className="login">
        <div className="container">
          <div className="title formtitle" style={{ marginLeft: "35%" }}>
            Login
          </div>
          <form action={window.location.pathname} method="POST" id="form1">
            <h5>Enter Email</h5>
            <div className="input-box underline">
              <input
                className="form-control"
                id="username"
                type="text"
                name="username"
                placeholder="Enter Your Username"
                required="required"
              />
              <input
                className="form-control"
                id="PASS"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required="required"
              />
              <div className="underline"></div>
            </div>
            <div className="input-box button">
              <input type="submit" name="" value="Submit" />
              <Register />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
