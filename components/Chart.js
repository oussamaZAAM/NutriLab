import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
function sumObjectsByKey(object1, object2) {
  const sum = {
    Calories:
      object1.Calories + (object2.Calories * parseInt(object2.size)) / 100,
    Protein: object1.Protein + (object2.Protein * parseInt(object2.size)) / 100,
    Carbs: object1.Carbs + (object2.Carbs * parseInt(object2.size)) / 100,
    Fat: object1.Fat + (object2.Fat * parseInt(object2.size)) / 100,
    Fiber: object1.Fiber + (object2.Fiber * parseInt(object2.size)) / 100,
    Salt: object1.Salt + (object2.Salt * parseInt(object2.size)) / 100,
    Sugar: object1.Sugar + (object2.Sugar * parseInt(object2.size)) / 100,
  };
  return sum;
}
const sumNutrients = () => {
  var nutrients = {
    Calories: 0,
    Protein: 0,
    Carbs: 0,
    Fat: 0,
    Fiber: 0,
    Salt: 0,
    Sugar: 0,
  };
  for (let i = 0; i < eatenFoodList.length; i++) {
    nutrients = sumObjectsByKey(nutrients, eatenFoodList[i]);
  }
  return nutrients;
};
const Chart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [nutri, setNutri] = useState({});

  useEffect(() => {
    async function dailyNutrients() {
      const res = await axios.get("/api/foodList", {
        params: {
          specifyDate: false
        },
      });
      console.log(res.data);
    }
    // dailyNutrients();
    async function nutrients() {
      const res = await axios.get("/api/nutri");
      setNutri(res.data);
    }
    nutrients();
    let idealNutri = new Array(7).fill(nutri.kCalories);
    setChartData({
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          data: idealNutri,
          label: "Applied",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        },
        {
          data: [70, 90, 44, 60, 83, 90, 100],
          label: "Accepted",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        },
      ],
    });
    setChartOptions({
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
  }, []);

  return (
    <>
      <div className="relative m-auto h-[50vh] w-full rounded-lg border bg-white p-4 md:col-span-2 lg:h-[70vh]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Chart;
