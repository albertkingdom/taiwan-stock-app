import React, { useState } from "react";

const AddNewRecord = ({ stocklist, addNewIndexFunc }) => {
  const [newIndexNo, setNewIndexNo] = useState("");
  const [newIndexPrice, setNewIndexPrice] = useState("");
  const [newIndexAmount, setNewIndexAmount] = useState("");
  const [buydate, setBuydate] = useState("");
  const [buyorsell, setBuyorsell] = useState("");

  const datepickfunc = (date) => {
    // console.log(date);
    setBuydate(date);
  };

  return (
    <div className="input-group addNewStock">
      <input
        type="text"
        className="form-control"
        placeholder="新增一筆股票代號"
        // style={{ width: "100px" }}
        value={newIndexNo}
        onChange={(e) => setNewIndexNo(e.target.value)}
      />
      <select
        className="custom-select"
        onChange={(e) => setBuyorsell(e.target.value)}
      >
        <option value="" defaultValue>
          買/賣
        </option>
        <option value="buy">買</option>
        <option value="sell">賣</option>
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="價格"
        // style={{ width: "100px" }}
        value={newIndexPrice}
        onChange={(e) => setNewIndexPrice(e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        placeholder="股數"
        // style={{ width: "100px" }}
        value={newIndexAmount}
        onChange={(e) => setNewIndexAmount(e.target.value)}
      />
      <input
        type="date"
        className="form-control"
        value={buydate}
        onChange={(e) => datepickfunc(e.target.value)}
      />
      <div id="datepickerdiv">
        {/* <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={handleDateChange}
        /> */}

        <button
          className="btn btn-outline-info"
          id="addRecordBtn"
          title="新增一筆交易紀錄"
          onClick={() => {
            addNewIndexFunc(
              newIndexNo,
              newIndexPrice,
              newIndexAmount,
              buyorsell,
              buydate
            );
            // setBuydate("");
            // setNewIndexPrice("");
            // setNewIndexAmount("");
          }}
        >
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default AddNewRecord;
