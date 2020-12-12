import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const Chart = ({ stocklist, stockprice, isLoading, isAuth }) => {
  // console.log("stockprice", stockprice, stocklist);
  const [totalCost, setTotalCost] = useState(0);
  const [totalValue, setTotalValue] = useState(100);

  const data = {
    labels: ["成本", "損益"],
    datasets: [
      {
        label: "carbs",
        data: [totalCost, totalValue - totalCost],
        backgroundColor: ["orange", "lightblue"],
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
      }

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

      for (let i in amountObj) {
        total += +stockprice[i][0] * amountObj[i];
      }

      setTotalValue(total);
    };
    if (!isLoading && Object.keys(stocklist).length !== 0) {
      // console.log("chart", !isLoading && !stocklist && !stockprice);
      calTotalCost();
      calTotalValue();
    }
  }, [stocklist, stockprice, isLoading]);
  return (
    <div className="row align-items-center">
      <div className="col-7 col-md-6">
        <Doughnut
          data={data}
          height={100}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="col-5 col-md-6 mt-3">
        <p>
          總市值:
          <span>NT${isAuth ? totalValue.toLocaleString() : "XXXXXX"}</span>
        </p>
        <p>
          總成本:
          <span>NT${isAuth ? totalCost.toLocaleString() : "XXXXXX"}</span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(Chart);