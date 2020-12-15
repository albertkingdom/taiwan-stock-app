import React from "react";
import { StyledEditDiv } from "../StyledComponents/StyledComponents";
import { Link } from "react-router-dom";

export default function Edit({ toShowDeleteButton, showDeleteButton }) {
  return (
    <StyledEditDiv>
      <ul>
        <li>
          <button onClick={toShowDeleteButton}>
            {showDeleteButton ? "完成編輯" : "編輯"}
            {/* <Link to="/delrecord">編輯</Link> */}
          </button>
        </li>
        <li>
          <button>
            <Link to="/addrecord">新增</Link>
          </button>
        </li>
      </ul>
    </StyledEditDiv>
  );
}
