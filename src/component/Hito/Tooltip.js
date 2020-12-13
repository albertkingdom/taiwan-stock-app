import React from "react";
import styled from "styled-components";

const HitoTooltip = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  z-index: 1;

  .hitotooltiptext {
    /* visibility: hidden; */
    width: 100%;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    top: 100%;
    left: 0;
    position: absolute;
    /* z-index: 1; */
    &::after {
      content: " ";
      position: absolute;
      bottom: 100%; /* At the top of the tooltip */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }
  }
`;
const StyledFollowingButton = styled.a`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;
export default function Tooltip({ showTooltip, handleAddFollowing }) {
  return (
    showTooltip && (
      <HitoTooltip className="">
        <span className="hitotooltiptext">
          <StyledFollowingButton role="button" onClick={handleAddFollowing}>
            <i className="far fa-heart text-danger"></i>
          </StyledFollowingButton>
        </span>
      </HitoTooltip>
    )
  );
}
