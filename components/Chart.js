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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Chart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [nutri, setNutri] = useState({});

  useEffect(() => {
    let calorieWeek = [0, 0, 0, 0, 0, 0, 0];
    async function dailyNutrients() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        calorieWeek.splice(index, 1, foodList.Calories);
      });
    }

    let idealNutri;
    async function nutrients() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.kCalories);
      await dailyNutrients();
      console.log(calorieWeek);
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
            data: calorieWeek,
            label: "Accepted",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            fill: false,
          },
        ],
      });
    }
    nutrients();

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
