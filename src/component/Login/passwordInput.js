import React, { useState } from "react";
import styles from "./Login.module.css";

export default function passwordInput({ password, changePassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="position-relative">
      <input
        type={showPassword ? `text` : `password`}
        placeholder="test123456"
        value={password}
        onChange={(e) => changePassword(e.target.value)}
        required
      />

      <button
        className={styles.showPwd}
        onClick={() => setShowPassword(!showPassword)}
      >
        {!showPassword ? (
          <i class="fas fa-eye"></i>
        ) : (
          <i class="fas fa-eye-slash"></i>
        )}
      </button>
    </div>
  );
}
