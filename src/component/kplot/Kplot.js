import React, { useEffect, useState } from "react";

import AnyChart from "anychart-react";
import anychart from "anychart";

import { GetData } from "./GetData";
import Modal from "../Modal/Modal";
import Loading from "../Loading";

//open, high, low , close
// const data = [
//   ["2020-10-10", 23.55, 23.88, 23.38, 23.62],
//   ["2020-10-11", 22.65, 23.7, 22.65, 23.36],
//   ["2020-10-12", 22.75, 23.7, 22.69, 23.44],
//   ["2020-10-13", 30, 23.7, 22.69, 23.44],
//   ["2020-10-14", 30, 23.7, 22.69, 23.44],
//   ["2020-10-15", 23.55, 23.88, 23.38, 23.62],
//   ["2020-10-16", 22.65, 23.7, 22.65, 23.36],
//   ["2020-10-17", 22.75, 23.7, 22.69, 23.44],
//   ["2020-10-18", 30, 23.7, 22.69, 23.44],
//   ["2020-10-19", 30, 23.7, 22.69, 23.44]
// ];

function createPlot(data, stockNo, markersData) {
  //define the chart type
  var chart = anychart.stock();
  anychart.format.inputLocale("zh-tw");
  anychart.format.outputLocale("zh-tw");

  var msftDataTable = anychart.data.table();
  msftDataTable.addData(data);

  //mapping the data
  const mapping = msftDataTable.mapAs();
  mapping.addField("open", 3, "first");
  mapping.addField("high", 4, "max");
  mapping.addField("low", 5, "min");
  mapping.addField("close", 6, "last");
  mapping.addField("value", 6, "last");

  //draw
  // set the series 1 : candlestick
  var firstPlotSeries = chart.plot(0).candlestick(mapping);
  firstPlotSeries.name(stockNo);

  //set color
  firstPlotSeries.normal().fallingFill("green", 1);
  firstPlotSeries.normal().fallingStroke("green", 1);
  firstPlotSeries.normal().risingFill("red", 0.8);
  firstPlotSeries.normal().risingStroke("red", 0.8);

  // configure the format of the legend title
  // chart
  //   .plot(0)
  //   .legend()
  //   .titleFormat(function () {
  //     var date = anychart.format.dateTime(
  //       this.value,
  //       "yyy-MM-dd",
  //       -500,
  //       "zh-tw"
  //     );

  //     return date;
  //   });

  // set the series 2: mma5
  const mmaMapping = msftDataTable.mapAs({ value: 6 });
  var mmaplot = chart.plot(0).mma(mmaMapping, 5).series();
  mmaplot.stroke("black");
  //成交量
  const volumeMapping = msftDataTable.mapAs({ value: 1 });
  var volumePlot = chart.plot(1).column(volumeMapping).name("成交股數");
  //調整y軸數字顯示，數字/1000
  chart
    .plot(1)
    .yAxis()
    .labels()
    .format(function () {
      var value = this.value;
      value = value / 1000;
      return value + "k";
    });

  // add event markers，標交易時間點

  chart.plot(0).eventMarkers({
    groups:
      // {
      //   format: "buy",
      //   data: [
      //     {
      //       date: "2020-11-11",
      //       description:
      //         "Cisco announced the acquisition of Audium Corporation.",
      //     },
      //     {
      //       date: "2008-04-27",
      //       description: "Cisco announced its intent to acquire PostPath, Inc.",
      //     },
      //   ],
      // },
      markersData,
  });
  return chart;
}

export default function Kplot(props) {
  const [data, setData] = useState([]); //股票成交價array
  const [modalshow, setModalshow] = useState(true);
  console.log("kplot data", data);
  const showModal = () => {
    setModalshow((prevState) => !prevState); //close modal
    props.history.goBack();
  };
  useEffect(() => {
    const getstockdata = async (stockNo, date1, date2) => {
      const response = await GetData(stockNo, date1, date2);
      //   console.log(response);
      setData(response);
    };
    const getDateString = () => {
      const thisYear = new Date().getFullYear();
      const thisMonth = new Date().getMonth() + 1;
      const thisDate = new Date().getDate();

      const currentMonth = `${thisYear}${thisMonth}${thisDate}`;
      const lastMonth = `${thisYear}${thisMonth - 1}${thisDate}`;
      // console.log(`${thisYear}${thisMonth}${thisDate}`);
      return [currentMonth, lastMonth];
    };
    getstockdata(
      props.match.params.stockNo,
      getDateString()[0],
      getDateString()[1]
    );
  }, [props.match.params.stockNo]);

  //整理交易紀錄for anychart
  const outputExchangeHistory = () => {
    const exchangeHistory = props.stocklist[props.match.params.stockNo];
    console.log("exchange history", exchangeHistory);
    const dataBuy = exchangeHistory
      .filter((item) => item.buyorsell === "buy")
      .map((item) => {
        return {
          date: item.date,
          description: `買在價位${item.price}共${item.amount}股`,
        };
      });
    const dataSell = exchangeHistory
      .filter((item) => item.buyorsell === "sell")
      .map((item) => {
        return {
          date: item.date,
          description: `賣在價位${item.price}共${item.amount}股`,
        };
      });
    const output = [
      { format: "買", data: dataBuy },
      { format: "賣", data: dataSell },
    ];
    return output;
  };
  // console.log(outputExchangeHistory());

  const chart = createPlot(
    data,
    props.match.params.stockNo,
    outputExchangeHistory()
  );
  if (data.length === 0) {
    return (
      <Modal show={modalshow} toClose={showModal}>
        <div className="text-center" style={{ height: "600px" }}>
          <Loading />
        </div>
      </Modal>
    );
  }
  return (
    <Modal show={modalshow} toClose={showModal}>
      <div className="">
        <AnyChart
          instance={chart}
          title="stock candlestick chart"
          width={"100%"}
          height="750px"
          left="30"
        />
      </div>
    </Modal>
  );
}
