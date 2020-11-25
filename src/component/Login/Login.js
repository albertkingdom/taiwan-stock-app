import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./Login.module.css";
import Swal from "sweetalert2";
import PasswordInput from "./PasswordInput";
import { apiUserLogin, apiUserSignup } from "../../api/fromApi";

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
  const keyUphandler = (event) => {
    //click enter to signin
    // keyCode 13 is Enter key
    if (event.keyCode === 13) {
      // console.log("enter");
      signinHandler(event);
    }
  };
  const signinHandler = (event) => {
    event.preventDefault(); //in form, button onclick will act as submit
    // console.log("submit");
    const logindata = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    apiUserLogin(logindata)
      .then((resp) => resp.data)
      .then((data) => {
        // console.log(data);
        if (!data.error) {
          //成功登入
          // this.setState({ ...this.state, token: data.idToken });
          // props.auth(data.idToken);
          props.isAuth();
          const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          );
          //登入狀態存入localstorage
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("expire", expirationDate);
          localStorage.setItem("uid", data.localId);
          props.saveLoginEmail(data.email);
          // alert("成功登入");
          Swal.fire({
            title: "成功登入!",
            icon: "success",
            confirmButtonText: "ok",
          });
        } else {
          //錯誤訊息
          Swal.fire({
            title: "登入失敗!",
            icon: "error",
            confirmButtonText: "ok",
          });
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

    apiUserSignup(signupdata)
      .then((resp) => resp.data)
      .then((data) => {
        console.log(data);
        if (!data.error) {
          // this.setState({ ...this.state, token: data.idToken });
          setToken(data.idToken);
          // alert("成功註冊");
          Swal.fire({
            title: "成功註冊!",
            icon: "success",
            confirmButtonText: "ok",
          });
        } else {
          //錯誤訊息
          // this.setState({ ...this.state, errorMsg: data.error.message });
          setErrorMsg(data.error.message);
          Swal.fire({
            title: "註冊失敗!",
            icon: "error",
            confirmButtonText: "ok",
          });
          // alert("失敗註冊");
        }
        //導回首頁
        props.history.replace("/");
      })
      .catch((error) => {
        console.log("error", error);
        //導回首頁
        props.history.replace("/");
      });
  };
  const changePassword = (value) => {
    setPassword(value);
  };
  return (
    <>
      <Modal show={modalshow} toClose={showModal} forLogin={true}>
        <div className={styles.Login}>
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
          {/* <form> */}
          <section>
            <label>
              Email:
              <input
                type="text"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </section>
          <section>
            <label>
              Password:
              <PasswordInput
                password={password}
                changePassword={changePassword}
                keyUphandler={keyUphandler}
              />
            </label>

            {formNo === 1 ? (
              <input
                type="password"
                placeholder="請再輸入一次密碼"
                value={passwordcheck}
                onChange={(e) => setPasswordcheck(e.target.value)}
                required
              />
            ) : null}
          </section>

          {formNo === 1 ? (
            <button onClick={signupHandler}>sign up</button>
          ) : (
            <button onClick={signinHandler}>sign in</button>
          )}
          {/* </form> */}
        </div>
      </Modal>
    </>
  );
};

export default Login;
