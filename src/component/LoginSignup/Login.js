import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./Login.module.css";
import Swal from "sweetalert2";
import PasswordInput from "./PasswordInput";
import { apiUserLogin } from "../../api/fromApi";

const Login = (props) => {
  const [modalshow, setModalshow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const changePassword = (value) => {
    setPassword(value);
  };
  return (
    <>
      <Modal show={modalshow} toClose={showModal} forLogin={true}>
        <div className={styles.Login}>
          <p>{errorMsg}</p>
          <h5>Taiwan Stock App</h5>
          <form>
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
                  placeholder="test123456"
                />
              </label>
            </section>

            <button onClick={signinHandler}>sign in</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
