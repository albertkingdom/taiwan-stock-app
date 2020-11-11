export const getStockIndex = async (date) => {
  const url = `https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=${date}&type=IND`;
  const response = await fetch(`${process.env.REACT_APP_PROXYURL}${url}`);
  // const response = await fetch(`${url}`)

  const data = await response.json();
  const indexInfo = { index: data.data1[1], date: data.params.date };
  // console.log(indexInfo)
  return indexInfo;
};
