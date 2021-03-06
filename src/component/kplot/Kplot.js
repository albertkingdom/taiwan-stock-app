import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AnyChart from "anychart-react/dist/anychart-react.min";

import { getKplotData } from "../../api/fromApi";
import Modal from "../Modal/Modal";
import Loading from "../Loading";
//context api
import { ContextStore } from "../../Context/Context";

import { sub, format } from "date-fns";

import {
  PreviousButton,
  NextButton,
} from "../StyledComponents/StyledComponents";
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
  var chart = window.anychart.stock();
  window.anychart.format.inputLocale("zh-tw");
  window.anychart.format.outputLocale("zh-tw");

  var msftDataTable = window.anychart.data.table();
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
  chart.plot(1).column(volumeMapping).name("成交股數");
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
  const { stocklist } = useContext(ContextStore); //context api
  const [data, setData] = useState([]); //股票成交價array
  const [modalshow, setModalshow] = useState(true);
  const [stockNoList, setStockNoList] = useState([]); //array of all stock No
  const [stockNoIndex, setStockNoIndex] = useState(0);
  let history = useHistory();

  const showModal = () => {
    setModalshow((prevState) => !prevState); //close modal
    props.history.replace("/");
  };
  useEffect(() => {
    const getstockdata = async (stockNo, date1, date2) => {
      const response = await getKplotData(stockNo, date1, date2);

      // 將民國年替換成西元年
      function replaceDate(data) {
        // data[0] = data[0].replace("110", "2021");
        data[0] =
          (parseInt(data[0].split("-")[0]) + 1911).toString() +
          "-" +
          data[0].split("-").splice(1).join("-");

        return data;
      }
      const newKplotDate = response.map((item) => replaceDate(item));
      setData(newKplotDate);
    };
    const getDateString = () => {
      const lastMonth = format(
        sub(new Date(), {
          months: 1,
        }),
        "yyyyMMdd"
      );

      const currentMonth = format(new Date(), "yyyyMMdd");

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
    const exchangeHistory = stocklist[props.match.params.stockNo];

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

  useEffect(() => {
    // to get an array of stock numbers
    setStockNoList(Object.keys(stocklist));
  }, [stocklist]);

  // button
  useEffect(() => {
    const index = stockNoList.findIndex(
      (number) => number === props.match.params.stockNo
    );
    setStockNoIndex(index);
  }, [props.match.params.stockNo, stockNoList]);

  const handleNext = () => {
    if (stockNoList.length > stockNoIndex + 1) {
      history.push(`/kplot/${stockNoList[stockNoIndex + 1]}`);
    }
  };

  const handlePrevious = () => {
    if (stockNoIndex !== 0) {
      history.push(`/kplot/${stockNoList[stockNoIndex - 1]}`);
    }
  };

  if (data && data.length === 0) {
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
      <div className="position-relative">
        <PreviousButton onClick={handlePrevious} disabled={stockNoIndex === 0}>
          <i className="fas fa-arrow-left"></i>
        </PreviousButton>
        <div className="w-100">
          <AnyChart
            instance={chart}
            title="stock candlestick chart"
            width={"100%"}
            height="750px"
            left="30"
          />
        </div>
        <NextButton
          onClick={handleNext}
          disabled={stockNoIndex === stockNoList.length - 1}
        >
          <i className="fas fa-arrow-right"></i>
        </NextButton>
      </div>
    </Modal>
  );
}
