import React, { useEffect, useState } from "react";

import AnyChart from "anychart-react";
import anychart from "anychart";

import { GetData } from "./GetData";
import Modal from "../Modal/Modal";

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

function createPlot(data, stockNo) {
  //define the chart type
  var chart = anychart.stock();

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

  // set the series 2: mma5
  const mmaMapping = msftDataTable.mapAs({ value: 4 });
  var mmaplot = chart.plot(0).mma(mmaMapping, 5).series();
  mmaplot.stroke("black");
  return chart;
}

export default function Kplot(props) {
  const [data, setData] = useState([]); //股票成交價array
  const [modalshow, setModalshow] = useState(true);

  const showModal = () => {
    setModalshow((prevState) => !prevState); //close modal
    props.history.goBack();
  };
  useEffect(() => {
    const getstockdata = async (stockNo, date) => {
      const response = await GetData(stockNo, date);
      //   console.log(response);
      setData(response);
    };
    const getDateString = () => {
      const thisYear = new Date().getFullYear();
      const thisMonth = new Date().getMonth() + 1;
      const thisDate = new Date().getDate();

      // console.log(`${thisYear}${thisMonth}${thisDate}`);
      return `${thisYear}${thisMonth}${thisDate}`;
    };
    getstockdata(props.match.params.stockNo, getDateString());
  }, []);

  const chart = createPlot(data, props.match.params.stockNo);
  return (
    <Modal show={modalshow} toClose={showModal}>
      <div className="">
        <AnyChart
          instance={chart}
          title="stock candlestick chart"
          width={"100%"}
          height={600}
        />
      </div>
    </Modal>
  );
}
