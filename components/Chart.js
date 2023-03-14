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
  const [chartDataCalories, setChartDataCalories] = useState({
    datasets: [],
  });
  const [chartDataProtein, setChartDataProtein] = useState({
    datasets: [],
  });
  const [chartDataCarbs, setChartDataCarbs] = useState({
    datasets: [],
  });
  const [chartDataFat, setChartDataFat] = useState({
    datasets: [],
  });
  const [chartDataFiber, setChartDataFiber] = useState({
    datasets: [],
  });
  const [chartDataSalt, setChartDataSalt] = useState({
    datasets: [],
  });
  const [chartDataSugar, setChartDataSugar] = useState({
    datasets: [],
  });

  const [chartOptionsCalories, setChartOptionsCalories] = useState({});
  const [chartOptionsProtein, setChartOptionsProtein] = useState({});
  const [chartOptionsCarbs, setChartOptionsCarbs] = useState({});
  const [chartOptionsFat, setChartOptionsFat] = useState({});
  const [chartOptionsFiber, setChartOptionsFiber] = useState({});
  const [chartOptionsSalt, setChartOptionsSalt] = useState({});
  const [chartOptionsSugar, setChartOptionsSugar] = useState({});

  useEffect(() => {
    let calorieWeek = [0, 0, 0, 0, 0, 0, 0];
    let proteinWeek = [0, 0, 0, 0, 0, 0, 0];
    let carbsWeek = [0, 0, 0, 0, 0, 0, 0];
    let fatWeek = [0, 0, 0, 0, 0, 0, 0];
    let fiberWeek = [0, 0, 0, 0, 0, 0, 0];
    let saltWeek = [0, 0, 0, 0, 0, 0, 0];
    let sugarWeek = [0, 0, 0, 0, 0, 0, 0];
    async function dailyNutrientsCalories() {
      const res = await fetch("/api/foodList", {
        params: {
          specifyDate: false,
        },
      });
      const data = await res.json();
      data.forEach((foodList, index) => {
        calorieWeek.splice(index, 1, foodList.Calories);
      });
    }
    async function dailyNutrientsProtein() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        proteinWeek.splice(index, 1, foodList.Protein);
      });
    }
    async function dailyNutrientsCarbs() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        carbsWeek.splice(index, 1, foodList.Carbs);
      });
    }
    async function dailyNutrientsFat() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        fatWeek.splice(index, 1, foodList.Fat);
      });
    }
    async function dailyNutrientsFiber() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        fiberWeek.splice(index, 1, foodList.Fiber);
      });
    }
    async function dailyNutrientsSalt() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        saltWeek.splice(index, 1, foodList.Salt);
      });
    }
    async function dailyNutrientsSugar() {
      const res = await fetch("/api/foodList");
      const data = await res.json();
      data.forEach((foodList, index) => {
        sugarWeek.splice(index, 1, foodList.Sugar);
      });
    }

    let idealNutri;
    async function nutrientsCalories() {
      const res = await axios.get("/api/nutri");
      const data = res.data;
      idealNutri = new Array(7).fill(data.kCalories);
      await dailyNutrientsCalories();
      setChartDataCalories({
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
    async function nutrientsProtein() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.proteins);
      await dailyNutrientsCalories();
      setChartDataCalories({
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
            data: proteinWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }
    async function nutrientsCarbs() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.carbs);
      await dailyNutrientsCarbs();
      setChartDataCarbs({
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
            data: carbsWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }
    async function nutrientsFat() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.fats);
      await dailyNutrientsFat();
      setChartDataFat({
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
            data: fatWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }
    async function nutrientsFiber() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.fiber);
      await dailyNutrientsFiber();
      setChartDataFiber({
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
            data: fiberWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }
    async function nutrientsSalt() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.salt);
      await dailyNutrientsSalt();
      setChartDataSalt({
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
            data: saltWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }
    async function nutrientsSugar() {
      const res = await fetch("/api/nutri");
      const data = await res.json();
      idealNutri = new Array(7).fill(data.sugar);
      await dailyNutrientsSugar();
      setChartDataSugar({
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
            data: sugarWeek,
            label: "Accepted",
            borderColor: "#FF9351",
            backgroundColor: "#FF9351",
            fill: false,
          },
        ],
      });
    }

    nutrientsCalories();
    nutrientsProtein();
    nutrientsCarbs();
    nutrientsFat();
    nutrientsFiber();
    nutrientsSalt();
    nutrientsSugar();
    setChartOptionsCalories({
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
          text: "Calories",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsProtein({
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
          text: "Protein",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsCarbs({
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
          text: "Carbs",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsFiber({
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
          text: "Fibers",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsFat({
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
          text: "Fats",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsSalt({
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
          text: "Salt",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
    setChartOptionsSugar({
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
          text: "Sugar",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      tension: 0.3,
    });
  }, []);

  return (
    <div className="w-[100vw] md:w-[60vw]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.25}
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
            <Line data={chartDataCalories} options={chartOptionsCalories} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataProtein} options={chartOptionsProtein} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataCarbs} options={chartOptionsCarbs} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataFiber} options={chartOptionsFiber} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataFat} options={chartOptionsFat} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataSugar} options={chartOptionsSugar} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative m-auto h-72 rounded-lg border bg-white p-4 md:col-span-2 lg:h-72">
            <Line data={chartDataSalt} options={chartOptionsSalt} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Chart;
