import React, { useState, useContext } from "react";
import { SwitchButton } from "../StyledComponents/StyledComponents";
//context api
import { ThemeContext } from "../../Context/Context";
export default function SwitchTheme() {
  const [dark, setDark] = useState(false);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext); //context api

  return (
    <SwitchButton
      dark={dark ? true : false}
      onClick={() => {
        setDark(!dark);
        setDarkTheme(!darkTheme);
      }}
    >
      <div className={`circle ${dark ? "" : "dark"}`}></div>
    </SwitchButton>
  );
}
