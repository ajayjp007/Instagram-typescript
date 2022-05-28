import "./Login.css";
import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {
  const [loginSuccess, setLoginSucess] = useState<boolean>(false);
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: usernameInputRef.current?.value,
      password: passwordInputRef.current?.value,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const fetchData = async () => {
      await fetch("http://localhost:5000/api/users/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("token", "true");
          localStorage.setItem("userName", result.username);
          localStorage.setItem("emailId", usernameInputRef.current!.value);
          setLoginSucess(true);
        })
        .catch((error) => {
          setLoginFailed(true);
          console.log("error", error);
        });
    };
    fetchData().catch(console.error);
  };
  return (
    <div className="main-container">
      <img
        src="https://images.unsplash.com/photo-1572096082124-9e8ac147b085?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        alt=""
        className="left-img-login"
      />
      {loginSuccess && <Navigate to="/home-page" />}
      <div className="right-container-login">
        <div className="right-container-main">
          <img
            id="logo-login"
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
          />
          <form className="form-login" onSubmit={loginHandler}>
            <input
              required
              ref={usernameInputRef}
              placeholder="Phone number, username, or email"
              type="text"
              className="input-login"
            />
            <input
              required
              ref={passwordInputRef}
              placeholder="Password"
              className="input-login"
              type="password"
            />
            <button className="login-btn">Log In</button>
          </form>
          {loginFailed && (
            <p className="warning-messages">Wrong username or password</p>
          )}
          <span>OR</span>
          <span className="login-with-fb">
            <img
              src="https://image.similarpng.com/very-thumbnail/2020/04/Popular-facebook-Logo-png.png"
              alt="facebook logo"
              id="fb-logo"
            />
            <p>Log in with Facebook</p>
          </span>
          <p>Forgot Password?</p>
        </div>
        <div className="right-container-2">
          <p>
            Dont have an account?
            <a className="sign-up" href="/signup-page">
              Sign Up
            </a>
          </p>
        </div>
        <div className="right-store-container">
          Get The App
          <div className="store-icons-container">
            <img
              src="https://icon-library.com/images/download-on-the-app-store-icon/download-on-the-app-store-icon-6.jpg"
              alt="App store"
              className="store-icons"
            />
            <img
              src="https://miro.medium.com/max/1400/1*OIIv4FEjJQMqh-zEPhtlYA.png"
              alt="Play store"
              className="store-icons"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
