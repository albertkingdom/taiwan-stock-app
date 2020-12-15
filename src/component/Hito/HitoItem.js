import React, { useState } from "react";

import { StyledHitoButton } from "../StyledComponents/StyledComponents";
import Tooltip from "./Tooltip";

export default function HitoItem({ stock, handleAddFollowing }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <StyledHitoButton
      key={stock[1]}
      onClick={() => {
        setShowTooltip(!showTooltip);
      }}
    >
      <span>{stock[1]}</span>
      <span>{stock[2]}</span>
      <Tooltip
        showTooltip={showTooltip}
        handleAddFollowing={() => handleAddFollowing(stock[1])}
      />
    </StyledHitoButton>
  );
}
