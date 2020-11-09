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
    const modifydata = data.data.slice();

    modifydata.forEach((day) => {
      day[0] = day[0].replace("109", "2020").replace(/\//g, "-");
      day[1] = day[1].replace(/,/g, "");
      day[2] = day[2].replace(/,/g, "");
    });
    // console.log("modifydata", modifydata);
    return modifydata;
  } catch (error) {
    console.log(error);
  }
};
