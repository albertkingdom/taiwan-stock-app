export const GetData = async (stockNo, date) => {
  // const corsproxy = "http://localhost:8080/";
  const corsproxy = "https://taiwan-stock-app-backend.herokuapp.com/";

  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date}&stockNo=${stockNo}`;

  try {
    const response = await fetch(corsproxy + url, {
      headers: new Headers({
        Origin: "null",
      }),
    });
    const data = await response.json();
    // console.log("getdata response", data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
