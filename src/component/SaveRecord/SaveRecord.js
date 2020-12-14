import React, { useCallback, useEffect } from "react";
import { apiReadFirebase } from "../../api/fromApi";

function SaveRecord({ saveToFirebase, isAuth, toOverWriteStockList }) {
  const readFromFirebase = useCallback(() => {
    const token = localStorage.getItem("token");

    apiReadFirebase(token)
      .then((res) => {
        // console.log("read from firebase", res.data);
        if (!res.data) {
          // console.log("沒有資料");
          return;
        }
        toOverWriteStockList(res.data);
      })
      .catch((err) => console.log(err));
  }, [toOverWriteStockList]);
  useEffect(() => {
    //登入就從firebase讀資料
    if (isAuth) {
      readFromFirebase();
    }
  }, [isAuth, readFromFirebase]);
  return isAuth ? (
    <div className="storageFunction d-flex justify-content-center">
      {/* <button
        className="btn btn-outline-success m-3 px-4"
        title="存入localstorage"
        onClick={saveToLocalStorage}
      >
        <i className="fas fa-save"></i>
      </button>
      <button
        className="btn btn-outline-success m-3 px-4"
        title="讀取localstorage"
        onClick={readFromLocalStorage}
      >
        <i className="far fa-folder-open"></i>
      </button> */}
      <button
        className="btn btn-outline-success m-3 px-4"
        title="存入firebase"
        onClick={saveToFirebase}
      >
        <i className="fas fa-save"></i> Save to firebase
      </button>
      <button
        className="btn btn-outline-success m-3 px-4"
        title="讀取firebase"
        onClick={readFromFirebase}
      >
        <i className="far fa-folder-open"></i> Read from firebase
      </button>
    </div>
  ) : null;
}

export default React.memo(SaveRecord);
