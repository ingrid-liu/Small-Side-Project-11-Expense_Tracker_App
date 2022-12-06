import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin");

  let userEmailRef = React.createRef();
  let passwordRef = React.createRef();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleOnSignin = () => {
    let userEmail = userEmailRef.current.value;
    let password = passwordRef.current.value;
    localStorage.setItem("userEmail", userEmail);
    props.passUserEmail(userEmail);
  };

  const handleOnSignUp = () => {
    let userEmail = userEmailRef.current.value;
    let password = passwordRef.current.value;
    localStorage.setItem("userEmail", userEmail);
    props.passUserEmail(userEmail);
  };

  if (authMode === "signin") {
    return (
      <div style={{ display: "inline-block" }}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                ref={userEmailRef}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                ref={passwordRef}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleOnSignin}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: "inline-block" }}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              ref={userEmailRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleOnSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
