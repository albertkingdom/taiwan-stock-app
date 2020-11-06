import React from "react";
import styles from "./Modal.module.css";

const Historybox = ({ show, historyRecords, closeModal }) => {
  // console.log("Modal", show, historyRecords);
  return show ? (
    <div
      className={styles.myModal}
      id="exampleModalCenter"
      // tabindex="-1"
      role="dialog"
      // aria-labelledby="exampleModalCenterTitle"
      // aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className={["modal-content", styles.myfade].join(" ")}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              歷史紀錄
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>日期</th>
                  <th>價格</th>
                  <th>股數</th>
                  <th>買/賣</th>
                </tr>
                {historyRecords.map((item) => (
                  <tr key={Math.random()}>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{item.buyorsell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Historybox;
