import React from "react";

import {
  StyledFollowingLink,
  HitoTooltip,
} from "../StyledComponents/StyledComponents";

export default function Tooltip({ showTooltip, handleAddFollowing }) {
  return (
    showTooltip && (
      <HitoTooltip className="">
        <span className="hitotooltiptext">
          <StyledFollowingLink role="button" onClick={handleAddFollowing}>
            <i className="far fa-heart text-danger"></i>
          </StyledFollowingLink>
        </span>
      </HitoTooltip>
    )
  );
}
