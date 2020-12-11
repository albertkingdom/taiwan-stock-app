import React from "react";
import styled from "styled-components";

const StyledRecord = styled.li`
  div {
    width: 50%;
    text-align: center;
  }
  div.delete {
    /* background-color: red; */
    width: 100px;
    text-align: center;
    color: red;
  }
`;

function Record({ record }) {
  return (
    <StyledRecord className="d-flex justify-content-center">
      <div className="delete">
        <i class="fas fa-minus-circle"></i>
      </div>
      <div>
        <h5>
          {record[1][1]}
          <span>{record[0]}</span>
        </h5>
      </div>
    </StyledRecord>
  );
}

export default function DelRecord({ stockprice }) {
  //   console.log(stockprice); //{2330:['512','台積電']}

  return (
    <div>
      <ul>
        {Object.entries(stockprice).map((item) => (
          <Record record={item} />
        ))}
      </ul>
    </div>
  );
}
