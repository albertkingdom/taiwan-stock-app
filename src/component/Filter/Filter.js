import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.span`
  padding: 5px;
  a {
    color: black;
    span {
      display: inline-block;
      width: 20px;
    }
  }
`;
export default function Filter({ toFilter, filterStockNo }) {
  return (
    <div className="row justify-content-center m-3">
      <div className="filterStock input-group col-10 col-md-5">
        <StyledLink>
          <Link to="/hito" className="mr-3">
            <span className="text-danger">
              <i className="fas fa-fire"></i>{" "}
            </span>
            <span>
              <i className="fas fa-list"></i>
            </span>
          </Link>
        </StyledLink>
        <input
          className="form-control filterStock"
          type="text"
          placeholder="從庫存篩選股票代號"
          onChange={(e) => toFilter(e.target.value)}
          value={filterStockNo}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
