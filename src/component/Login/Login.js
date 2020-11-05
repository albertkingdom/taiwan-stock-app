import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./Login.module.css";
const Login = (props) => {
  const [modalshow, setModalshow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");

  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formNo, setFormNo] = useState(0);
  const showModal = () => {
    setModalshow((prevState) => !prevState); //close modal
    props.history.goBack(); //回到上一頁
  };
  const signinHandler = (event) => {
    event.preventDefault();
    // console.log("submit");
    const logindata = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_SIGNIN_KEY}`,
      {
        body: JSON.stringify(logindata),
        method: "POST",
        contentType: "application/json",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.error) {
          //成功登入
          // this.setState({ ...this.state, token: data.idToken });
          props.auth(data.idToken);
          props.isAuth();
          const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          );
          //登入狀態存入localstorage
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("expire", expirationDate);
          props.saveLoginEmail(data.email);
          alert("成功登入");
        } else {
          //錯誤訊息

          setErrorMsg(data.error.message);
        }

        // this.props.history.goBack();
        showModal();
      })
      .catch((error) => console.log("error", error));
  };
  const signupHandler = (event) => {
    event.preventDefault();
    // console.log("submit");
    const signupdata = {
      email: email,
      password: password,
    };
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_SIGNIN_KEY}`,
      { body: JSON.stringify(signupdata), method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.error) {
          // this.setState({ ...this.state, token: data.idToken });
          setToken(data.idToken);
          alert("成功註冊");
        } else {
          //錯誤訊息
          // this.setState({ ...this.state, errorMsg: data.error.message });
          setErrorMsg(data.error.message);

          alert("失敗註冊");
        }
        //導回首頁
        props.location.replace("/");
      })
      .catch((error) => {
        console.log("error", error);
        //導回首頁
        props.history.replace("/");
      });
  };
  return (
    <>
      <Modal show={modalshow} toClose={showModal}>
        <div className={styles.Login}>
          {/* <h1>Login</h1> */}
          <ul>
            <li
              onClick={() => setFormNo(0)}
              className={[formNo === 0 ? styles.active : ""]}
            >
              LOGIN
            </li>
            <li
              onClick={() => setFormNo(1)}
              className={[formNo === 1 ? styles.active : ""]}
            >
              SIGN UP
            </li>
          </ul>
          <p>{errorMsg}</p>
          <form>
            <input
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="test123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {formNo === 1 ? (
              <input
                type="password"
                placeholder="請再輸入一次密碼"
                value={passwordcheck}
                onChange={(e) => setPasswordcheck(e.target.value)}
                required
              />
            ) : null}

            {formNo === 1 ? (
              <button onClick={signupHandler}>sign up</button>
            ) : (
              <button onClick={signinHandler}>sign in</button>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
