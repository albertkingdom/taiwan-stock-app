import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Div = styled.div`
  ul {
    list-style: none;
    display: flex;
    li {
      flex-grow: 1;
    }
  }
  button {
    width: 120px;
    border: none;
    padding: 5px;
    background-color: #e5f4f3;
  }
  a {
    display: block;
    color: #000;
    width: 100%;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default function Edit({ toShowDeleteButton, showDeleteButton }) {
  return (
    <Div>
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
    </Div>
  );
}