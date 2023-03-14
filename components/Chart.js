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
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
const Chart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [nutri, setNutri] = useState({});

  useEffect(() => {
    let calorieWeek = [0, 0, 0, 0, 0, 0, 0];
    async function dailyNutrients() {
      const res = await axios.get("/api/foodList", {
        params: {
          specifyDate: false
        },
      });
      const data = res.data;
      data.forEach((foodList, index) => {
        calorieWeek.splice(index, 1, foodList.Calories);
      });
    }

    let idealNutri;
    async function nutrients() {
      const res = await axios.get("/api/nutri");
      const data = res.data;
      idealNutri = new Array(7).fill(data.kCalories);
      await dailyNutrients();
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
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
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
    <div className="w-[1000px]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"3"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="w-full"
      >
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartData} options={chartOptions} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartData} options={chartOptions} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartData} options={chartOptions} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Chart;
