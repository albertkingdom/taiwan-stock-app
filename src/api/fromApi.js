import axios from "axios";

export const getStockIndex = async (date) => {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=IND`;
  const response = await fetch(`${process.env.REACT_APP_PROXYURL}${url}`);
  // const response = await fetch(`${url}`)

  const data = await response.json();
  const indexInfo = { index: data.data1[1], date: data.params.date };
  // console.log(indexInfo)
  return indexInfo;
};

//get stock price
export const apiGetStockprice = (str) =>
  axios.get(
    process.env.REACT_APP_PROXYURL +
      `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${str}&json=1&delay=0`
  );

//read data from firebase
export const apiReadFirebase = (token) =>
  axios.get(
    `https://udemy-react-burgerbuilde-eda07.firebaseio.com/stocklist/${localStorage.getItem(
      "uid"
    )}.json?auth=${token}`
  );

//save data to firebase
export const apiSaveToFirebase = (token, stocklist) =>
  axios.put(
    `https://udemy-react-burgerbuilde-eda07.firebaseio.com/stocklist/${localStorage.getItem(
      "uid"
    )}.json?auth=${token}`,
    stocklist
  );

//user login
export const apiUserLogin = (logindata) =>
  axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_SIGNIN_KEY}`,
    logindata
  );

//user signup
export const apiUserSignup = (signupdata) =>
  axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_SIGNIN_KEY}`,
    signupdata
  );

//熱門成交股
export const apiHotStock = async () => {
  //取得日期"2020/12/13" -->"20201213",遇假日則找最近平日
  const getDate = () => {
    //if Saturday or Sunday, get Friday info instead
    if (new Date().getDay() === 6) {
      return new Date(Date.now() - 864e5)
        .toLocaleDateString()
        .replace(/\//g, "");
    } else if (new Date().getDay() === 0) {
      return new Date(Date.now() - 2 * 864e5)
        .toLocaleDateString()
        .replace(/\//g, "");
    }
    //Monday morning
    if (new Date().getDay() === 1 && new Date().getHours() < 14) {
      return new Date(Date.now() - 3 * 864e5)
        .toLocaleDateString()
        .replace(/\//g, "");
    }
    //if today's info is not published,then get yesterday's info instead
    if (new Date().getHours() >= 14) {
      return new Date().toLocaleDateString().replace(/\//g, "");
    } else {
      return new Date(Date.now() - 864e5)
        .toLocaleDateString()
        .replace(/\//g, "");
    }
  };
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX20?response=json&date=${getDate()}`;
  const response = await axios.get(`${process.env.REACT_APP_PROXYURL}${url}`);

  return { hitoStocklist: response.data.data };
};

//追蹤清單
export const apiGetFollowingList = async (token) => {
  const url = `https://udemy-react-burgerbuilde-eda07.firebaseio.com/stockFollowingList/${localStorage.getItem(
    "uid"
  )}.json?auth=${token}`;
  try {
    const response = await axios.get(url);
    // console.log("apigetfollwoing list", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const apiUploadFollowingList = async (token, list) => {
  const url = `https://udemy-react-burgerbuilde-eda07.firebaseio.com/stockFollowingList/${localStorage.getItem(
    "uid"
  )}.json?auth=${token}`;
  try {
    const response = await axios.put(url, list);
    // console.log("apiUploadFollowingList", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
