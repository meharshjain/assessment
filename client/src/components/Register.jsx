import React from "react";
function Login() {
  return (
    <div className="AppContainer img3">
      <div className="container register login title">SignUp</div>
      <div className="container register">
        <form action={window.location.pathname} method="POST" id="Loginform">
          <div className="registerForm">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                id="FNAME"
                name="firstname"
                placeholder="First Name"
                required="required"
              />
              <input
                className="form-control"
                type="text"
                id="LNAME"
                name="lastname"
                placeholder="Last Name"
              />
              <div className="form-group title">
                <input
                  className="form-control"
                  type="text"
                  id="EMAIL"
                  name="username"
                  placeholder="Username"
                  required="required"
                />
                <input
                  className="form-control"
                  type="password"
                  id="PASS"
                  name="password"
                  placeholder="Password"
                  required="required"
                />
              </div>
            </div>
            By clicking Sign Up, you agree to our Terms and Conditions.
            <br />
            <div className="form-group">
              <br />
              <button
                id="loginBtn"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
