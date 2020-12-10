import React, { useState } from "react";
import styles from "./Login.module.css";

export default function PasswordInput({
  password,
  changePassword,
  keyUphandler,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="position-relative">
      <input
        type={showPassword ? `text` : `password`}
        placeholder={placeholder}
        value={password}
        onChange={(e) => changePassword(e.target.value)}
        onKeyUp={keyUphandler}
        required
        autoComplete="true"
      />

      <button
        className={styles.showPwd}
        onClick={(e) => {
          setShowPassword(!showPassword);
          e.preventDefault();
        }}
      >
        {!showPassword ? (
          <i className="fas fa-eye"></i>
        ) : (
          <i className="fas fa-eye-slash"></i>
        )}
      </button>
    </div>
  );
}
