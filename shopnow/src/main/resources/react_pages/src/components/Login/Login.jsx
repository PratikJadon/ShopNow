import React, { useEffect, useState } from "react";
import "./Login.css";
import { ScaleLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [signupForm, setSignupForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupErrors, setSignupErrors] = useState({
    fullname: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function checkValidation(event) {
    var regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // Match special characters
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      event.target.id == "signup_email" &&
      !regexEmail.test(event.target.value)
    ) {
      setSignupErrors({ ...signupErrors, email: true });
      setSignupForm({ ...signupForm, email: "Please provide a valid email." });
    } else if (event.target.id == "signup_email") {
      setSignupErrors({ ...signupErrors, email: false });
      setSignupForm({ ...signupForm, email: "" });
    }

    if (
      event.target.id == "signup_password" &&
      !regexSpecial.test(event.target.value)
    ) {
      setSignupErrors({ ...signupErrors, password: true });
      setSignupForm({
        ...signupForm,
        password: "Password must contain at least one special character.",
      });
    } else if (event.target.id == "signup_password") {
      setSignupErrors({ ...signupErrors, password: false });
      setSignupForm({
        ...signupForm,
        password: "",
      });
    }

    if (
      event.target.id == "confirmPassword" &&
      !(event.target.value == document.getElementById("signup_password").value)
    ) {
      setSignupErrors({ ...signupErrors, confirmPassword: true });
      setSignupForm({
        ...signupForm,
        confirmPassword: "Passwords do not match.",
      });
    } else if (event.target.id == "confirmPassword") {
      setSignupErrors({ ...signupErrors, confirmPassword: false });
      setSignupForm({
        ...signupForm,
        confirmPassword: "",
      });
    }
  }

  const notify = (message) => {
    toast.error(message);
  };

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoading((loading) => !loading);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formdata = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();
    setLoading((loading) => !loading);
    if (!response.ok) {
      notify(data?.Message);
      return;
    }
    localStorage.setItem("token", data.Token);
    window.location.replace("/");
  }

  function handleSignup() {
    const signupForm = document.querySelector(".user_forms-signup");
    const loginForm = document.querySelector(".user_forms-login");
    const formsContainer = document.querySelector(".user_options-forms");
    signupForm.style.opacity = "1";
    signupForm.style.visibility = "visible";
    loginForm.style.opacity = "0";
    loginForm.style.visibility = "hidden";
    formsContainer.classList.add("signup-click");
    formsContainer.classList.remove("login-click");
  }

  function handleLogin() {
    const signupForm = document.getElementById("user_forms-signup");
    const loginForm = document.getElementById("user_forms-login");
    const formsContainer = document.getElementById("user_options-forms");
    loginForm.style.opacity = "1";
    loginForm.style.visibility = "visible";
    signupForm.style.opacity = "0";
    signupForm.style.visibility = "hidden";
    formsContainer.classList.add("login-click");
    formsContainer.classList.remove("signup-click");
  }

  async function handleSignupSubmit(event) {
    event.preventDefault();
    setLoading((loading) => !loading);
    const email = document.getElementById("signup_email").value;
    const username = document.getElementById("username").value;
    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("signup_password").value;
    const formdata = {
      email: email,
      password: password,
      fullname: fullname,
      username: username,
    };
    const response = await fetch("http://localhost:8080/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();
    setLoading((loading) => !loading);
    if (!data?.Success) {
      notify(data?.Message);
      return;
    }
    window.location.replace("/");
    localStorage.setItem("token", data.Token);
  }

  return (
    <section className="user">
      <ScaleLoader
        className="flex fixed w-full h-full bg-gray-500/40 justify-center items-center z-50"
        color="#36d7b7"
        loading={loading}
      />
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              Unlock exclusive access to premium products, exciting offers, and
              many more. Don't miss out, sign up now!
            </p>
            <button
              onClick={handleSignup}
              className="user_unregistered-signup"
              id="signup-button"
            >
              Sign up
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Start shopping and grab the best products now without any
              trouble...........
            </p>
            <button
              onClick={handleLogin}
              className="user_registered-login"
              id="login-button"
            >
              Login
            </button>
          </div>
        </div>

        <div className="user_options-forms h-[475px]" id="user_options-forms">
          <div id="user_forms-login" className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" onSubmit={handleLoginSubmit}>
              <fieldset classNameName="forms_fieldset">
                <div className="forms_field">
                  <TextField
                    fullWidth
                    id="email"
                    type="email"
                    label="Email"
                    helperText=""
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <TextField
                    type="password"
                    fullWidth
                    id="password"
                    label="Password"
                    helperText=""
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <div id="user_forms-signup" className="user_forms-signup">
            <h2 className="forms_title my-7">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSignupSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <TextField
                    fullWidth
                    id="fullname"
                    label="Full name"
                    helperText=""
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <TextField
                    fullWidth
                    id="username"
                    label="User name"
                    helperText=""
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <TextField
                    onChange={checkValidation}
                    fullWidth
                    error={signupErrors.email}
                    id="signup_email"
                    label="Email"
                    helperText={signupForm.email}
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <TextField
                    type="password"
                    onChange={checkValidation}
                    fullWidth
                    id="signup_password"
                    label="Password"
                    helperText={signupForm.password}
                    error={signupErrors.password}
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <TextField
                    type="password"
                    id="confirmPassword"
                    onChange={checkValidation}
                    fullWidth
                    label="Confirm Password"
                    helperText={signupForm.confirmPassword}
                    error={signupErrors.confirmPassword}
                    variant="standard"
                    required
                    autoFocus
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        className={"text-sm font-semibold w-max"}
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </section>
  );
}
