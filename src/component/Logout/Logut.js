import React, { useEffect } from "react";

import { Redirect } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("expire");
    props.isAuth(); //{isAuth:false}
    // props.auth(""); //delete token in App.js
    props.saveLoginEmail("");
  }, []);
  return <Redirect to="/" />;
};

export default Logout;
