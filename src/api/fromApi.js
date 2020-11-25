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
      `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${str}&json=1&delay=0&_=${Date.now()}`
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
