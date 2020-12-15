import React, { useEffect, useState, useCallback } from "react";
import {
  apiHotStock,
  apiUploadFollowingList,
  apiGetFollowingList,
} from "../../api/fromApi";

import {
  StyledFollowingButton,
  StyledSubmitButton,
} from "../StyledComponents/StyledComponents";
import Loading from "../Loading";
import { editlist as stockNoAndNameList } from "../asset/stocklist";
import HitoItem from "./HitoItem";
import Swal from "sweetalert2";
import MyAutoSuggest from "../Autosuggest/MyAutosuggest";

export default function Hito({ isAuth }) {
  const [hitolist, setHitolist] = useState({});
  const [followingList, setFollowingList] = useState({
    list: ["0050", "0056"],
  });
  const [newStockNo, setNewStockNo] = useState("");
  useEffect(() => {
    async function getHitolist() {
      const list = await apiHotStock();

      setHitolist(list.hitoStocklist);
    }
    getHitolist();
  }, []);

  const saveToFirebase = useCallback(() => {
    if (!isAuth) {
      Swal.fire({
        title: "請先登入!",
        icon: "info",
        confirmButtonText: "ok",
      });
      return;
    }
    const token = localStorage.getItem("token");
    // console.log("token", token);
    //?auth=token, token是登入後取得的

    apiUploadFollowingList(token, followingList)
      .then((res) => {
        if (res.status === 200) {
          //   console.log("success upload");
        } else {
          throw res.statusText;
        }
      })
      .catch((error) => console.log(error));
  }, [followingList, isAuth]);
  const readFromFirebase = useCallback(() => {
    const token = localStorage.getItem("token");

    apiGetFollowingList(token)
      .then((res) => {
        // console.log("read from firebase", res.data);
        if (!res.data) {
          // console.log("沒有資料");
          return;
        }
        setFollowingList(res.data);
        // console.log(res)
        // toOverWriteStockList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleRemoveFollowing = (stock) => {
    setFollowingList({
      list: followingList.list.filter((item) => item !== stock),
    });
  };

  const handleAddFollowing = (e) => {
    e.preventDefault();
    if (!newStockNo) {
      return;
    }
    if (followingList.list.indexOf(newStockNo) > 0) {
      //已在追蹤清單
      setNewStockNo("");
      return;
    }
    setFollowingList({ list: [...followingList.list, newStockNo] });
    setNewStockNo("");
    // saveToFirebase();
  };

  const searchStockName = (no) => {
    const obj = stockNoAndNameList.find((item) => item.no === no);
    return obj.name;
  };
  useEffect(() => {
    //登入就載入firebase資料
    if (isAuth) {
      readFromFirebase();
    }
  }, [readFromFirebase, isAuth]);
  useEffect(() => {
    //追蹤清單有變動且有登入就自動上傳firebase
    if (isAuth) {
      saveToFirebase();
    }
  }, [followingList, saveToFirebase, isAuth]);
  return (
    <div className="container-md">
      <section>
        <h4>
          成交熱門<small style={{ fontSize: "12px" }}>(點擊觸發功能)</small>
        </h4>
        <div className="d-flex flex-wrap justify-content-around">
          {Object.values(hitolist).length < 1 ? (
            <Loading />
          ) : (
            hitolist.map((stock) => (
              <HitoItem
                key={stock[1]}
                stock={stock}
                handleAddFollowing={(stock) => {
                  if (followingList.list.indexOf(stock) > 0) {
                    return;
                  }
                  setFollowingList({ list: [...followingList.list, stock] });
                }}
              />
            ))
          )}
        </div>
      </section>
      <section className="mt-3">
        <h4>
          追蹤清單<small style={{ fontSize: "12px" }}>(點擊愛心取消追蹤)</small>
        </h4>
        <form className="d-flex justify-content-center">
          <MyAutoSuggest
            placeholder="e.g. 2330"
            onChange={(newValue) => setNewStockNo(newValue)}
            name="stockNo"
            className="form-control "
          />
          <StyledSubmitButton
            type="submit"
            className=""
            onClick={handleAddFollowing}
          >
            加入追蹤
          </StyledSubmitButton>
        </form>
        <div className="mt-3">
          <button onClick={saveToFirebase} className="d-none">
            upload
          </button>
          <div>
            <ul className="list-group list-group-flush">
              {followingList.list.length < 1 ? (
                <p>請加入追蹤清單</p>
              ) : (
                followingList.list.map((stock) => (
                  <li key={stock} className="list-group-item">
                    <p className="d-flex">
                      {stock} {searchStockName(stock)}
                      <StyledFollowingButton
                        className="ml-auto text-danger"
                        onClick={() => handleRemoveFollowing(stock)}
                      >
                        <i className="fas fa-heart"></i>
                      </StyledFollowingButton>
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* <button onClick={readFromFirebase}>get</button> */}
        </div>
      </section>
    </div>
  );
}
