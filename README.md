# My Taiwan Stock App

[DEMO](https://taiwan-stock-app.netlify.app/)

## Features
  
- Built with React and styled components
- Apply React builtin **context API** partially to broadcast certain state to deep nested components
- Apply React builtin **useReducer hook and reducer/dispatch** for certain state and the logic to update the state, and hence reduce the callback functions needed to be passed as props

## 功能

- 顯示持股資訊、目前股價、計算損益
- 登入才能檢視，以保護個人資訊
  - 結合 firebase 提供登入、保存個人資料功能
- 登入後可以新增股票買、賣紀錄，方便日後回顧檢討
- 新增一筆股票交易紀錄
  - 股票代號自動提示
  ![auto suggest](https://imgur.com/scGLcfU.jpg)
- 檢視最近兩個月的 k 線圖，提供基本均線、成交量資訊
  ![kplot-screenshot](https://raw.githubusercontent.com/albertkingdom/taiwan-stock-app/main/public/screencapture-kplot.png)

  - 資料來源:台灣證交所
  - 使用[anychart](https://www.npmjs.com/package/anychart) [anychart-react](https://www.npmjs.com/package/anychart-react)套件
- 股票追蹤/熱門股票清單
  - 熱門股票
  - 個人追蹤清單
  ![following-list](https://imgur.com/yQgJn4p.jpg)
  
## API 來源

- 即時成交資訊(以 2330 為例)
  https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&json=1&delay=0

- 每月股價、成交量資訊(以 20201010 當日為例，抓到當月的每日開盤價、收盤價、最高、最低，以 2330 為例) https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20201010&stockNo=2330

- 大盤指數(以 20201010 當日為例，收盤後才能抓到) https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=20201010&type=IND

- 每日熱門股票
https://www.twse.com.tw/exchangeReport/MI_INDEX20?response=json&date=20201211
