import React, { useContext } from "react";
import { StyledDisclaimer } from "../StyledComponents/StyledComponents";
//context api
import { ThemeContext } from "../../Context/Context";

export default function Disclaimer() {
  const { darkTheme } = useContext(ThemeContext); //context api
  return (
    <StyledDisclaimer dark={darkTheme}>
      {/* <i className="fas fa-info-circle"></i> */}
      <p>
        <span>&copy;2021 Copyright</span> 不計入手續費、股市交易稅
      </p>
    </StyledDisclaimer>
  );
}
