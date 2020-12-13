import React, { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

const StyledButton = styled.button`
  background-color: #e5f4f3;
  border: none;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 10px;
  outline: none;
  position: relative;
  &:focus {
    outline: none;
  }
`;
export default function HitoItem({ stock, handleAddFollowing }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <StyledButton
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
    </StyledButton>
  );
}
