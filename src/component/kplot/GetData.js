export const GetData = async (stockNo, date1, date2) => {
  // const corsproxy = "http://localhost:8080/";
  const corsproxy = "https://taiwan-stock-app-backend.herokuapp.com/";

  //近兩個月的每日交易資訊
  const url1 = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date1}&stockNo=${stockNo}`;
  const url2 = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${date2}&stockNo=${stockNo}`;

  try {
    function getStockInfo(target) {
      return fetch(corsproxy + target, {
        headers: new Headers({
          Origin: "null",
        }),
      }).then((resp) => resp.json());
    }
    const response = Promise.all([getStockInfo(url1), getStockInfo(url2)]);
    const [{ data: data1 }, { data: data2 }] = await response;
    // console.log("getdata response", data1, data2);
    // const modifydata = data1.data.concat(data2.data).slice();
    const modifydata = data1.concat(data2).slice();

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
