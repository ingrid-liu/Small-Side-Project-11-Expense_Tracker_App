import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { default as api } from "../../store/apiSlice";

export default function (props) {
  const [authMode, setAuthMode] = useState("signin"); // initial value

  const userEmailRef = React.createRef(); // ref: create a referance points to DOM for the email input
  const passwordRef = React.createRef();
  const [createNewUser] = api.useCreateNewUserMutation(); // apiSlice
  const [validateUserLogin] = api.useValidateUserLoginMutation();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleOnSignin = () => {
    let userEmail = userEmailRef.current.value; // html input
    let password = passwordRef.current.value;
    validateUserLogin({ userEmail: userEmail, password: password }).then(
      (response) => {
        localStorage.setItem("userEmail", response.data["userEmail"]); // pass the username/psw to the server, and validate the u/p match the record in db
        props.passUserEmail(response.data["userEmail"]); // if login success --> pass username to parent component (app.js)
      }
    );
  };

  const handleOnSignUp = () => {
    let userEmail = userEmailRef.current.value;
    let password = passwordRef.current.value;
    createNewUser({ userEmail: userEmail, password: password }).then(
      (response) => {
        localStorage.setItem("userEmail", response.data["userEmail"]); // localStorage stores the login status so the user won't log out on refresh..
        props.passUserEmail(response.data["userEmail"]);
      }
    );
  };

  if (authMode === "signin") {
    // HTML: switch between sign-in and sign-up
    return (
      <div style={{ display: "inline-block" }}>
        <div className="Auth-form">
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
                ref={userEmailRef} // ADD react reference for this element
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
              <button className="btn btn-primary" onClick={handleOnSignin}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "inline-block" }}>
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
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
            <button className="btn btn-primary" onClick={handleOnSignUp}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
