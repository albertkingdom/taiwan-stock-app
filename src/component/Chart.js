import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Chart = ({ stocklist, stockprice, isLoading }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const data = {
    labels: ["成本", "損益"],
    datasets: [
      {
        label: "carbs",
        data: [totalCost, totalValue - totalCost],
        backgroundColor: ["orange", "blue"],
      },
    ],
  };

  useEffect(() => {
    // chartFunc();
    const calTotalCost = () => {
      //計算總成本
      let total = 0;
      for (let i in stocklist) {
        // console.log(i, this.stockObj[i]);
        total += stocklist[i]
          .map((item) => +item.price * +item.amount)
          .reduce((sum, a) => sum + a, 0);
        // console.log(total);
      }
      // console.log("totalcost", total);

      setTotalCost(total);
      // return total;
    };
    const calTotalValue = () => {
      let amountObj = {}; //amountObj ={'2330':股數,}
      for (let i in stocklist) {
        amountObj[i] = stocklist[i]
          .map((item) => Number(item.amount))
          .reduce((sumOfAmount, a) => sumOfAmount + a, 0);
      }
      // console.log(amountObj);
      let total = 0;

      for (let i in stockprice) {
        total += +stockprice[i] * amountObj[i];
      }
      // console.log("totalvalue", total);

      // this.isChartDataOk = true
      setTotalValue(total);
      // return total;
    };
    if (!isLoading) {
      // console.log(isLoading);
      calTotalCost();
      calTotalValue();
    }
  }, [stocklist, stockprice, isLoading]);
  return (
    <div className="row align-items-center">
      <div className="col-lg-6 col-12">
        <Doughnut data={data} />
      </div>
      <div className="col-lg-6 col-12 mt-3">
        <p>總市值:NT${totalValue.toLocaleString()}</p>
        <p>總成本:NT${totalCost.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Chart;
