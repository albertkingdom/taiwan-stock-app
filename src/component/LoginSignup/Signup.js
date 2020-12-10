import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./Login.module.css";
import Swal from "sweetalert2";
import PasswordInput from "./PasswordInput";
import { apiUserSignup } from "../../api/fromApi";

const Signup = (props) => {
  const [modalshow, setModalshow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");

  const [token, setToken] = useState("");
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
      signupHandler(event);
    }
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
                />
              </label>

              <label>
                Confirm your password:
                <input
                  type="password"
                  placeholder="請再輸入一次密碼"
                  value={passwordcheck}
                  onChange={(e) => setPasswordcheck(e.target.value)}
                  required
                />
              </label>
            </section>

            <button onClick={signupHandler}>sign up</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Signup;
