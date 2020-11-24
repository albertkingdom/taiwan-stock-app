import React, { useState } from "react";
import styles from "./Login.module.css";

export default function PasswordInput({
  password,
  changePassword,
  keyUphandler,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="position-relative">
      <input
        type={showPassword ? `text` : `password`}
        placeholder="test123456"
        value={password}
        onChange={(e) => changePassword(e.target.value)}
        onKeyUp={keyUphandler}
        required
      />

      <button
        className={styles.showPwd}
        onClick={() => setShowPassword(!showPassword)}
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
