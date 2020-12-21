import axios from "axios";

export const getStockIndex = async (date) => {
  const response = await axios.post(
    `${process.env.REACT_APP_PROXYURL}stock/stockIndex`,
    { date: date }
  );

  return response.data;
};

//get stock price
export const apiGetStockprice = (str) =>
  axios.post(`${process.env.REACT_APP_PROXYURL}stock/stockprice`, { str: str });

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
  const response = await axios.get(
    `${process.env.REACT_APP_PROXYURL}stock/hotstock`
  );

  return response.data;
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

//kplot
export const getKplotData = async (stockNo, date1, date2) => {
  const response = await axios.post(
    `${process.env.REACT_APP_PROXYURL}stock/kplot`,
    { stockNo, date1, date2 }
  );
  return response.data;
};
