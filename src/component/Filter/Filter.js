import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { StyledLink } from "../StyledComponents/StyledComponents";
//context api
import { ThemeContext } from "../../Context/Context";

export default function Filter({ toFilter, filterStockNo }) {
  const { darkTheme } = useContext(ThemeContext); //context api

  return (
    <div className="row justify-content-center m-3 ">
      <div className="filterStock input-group">
        <StyledLink dark={darkTheme}>
          <Link to="/hito">
            追蹤、熱門
            <span className="text-danger">
              <i className="fas fa-fire"></i>
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
