import React from "react";

export default function Filter({ toFilter, filterStockNo }) {
  return (
    <div className="row justify-content-center m-3">
      <div className="filterStock input-group col-10 col-md-5">
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
