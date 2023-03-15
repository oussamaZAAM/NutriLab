import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false
    },
  }
};


export function DailyChart({date}) {
    const [idealNutris, setIdealNutris] = useState({
        kCalories: 0,
        proteins: 0,
        fats: 0,
        carbs: 0,
        fiber: 0,
        salt: 0,
        sugar: 0
    });
    const [foodNutris, setFoodNutris] = useState([{
        kCalories: 0,
        proteins: 0,
        fats: 0,
        carbs: 0,
        fiber: 0,
        salt: 0,
        sugar: 0
    }]);

    const labels = ['kCalories', 'proteins', 'fats', 'carbs', 'fiber', 'salt', 'sugar'];
    const [data, setData] = useState({
        labels,
        datasets: [
          {
            label: 'Goal',
            data: labels.map((a) => 0),
            borderColor: "rgb(255, 50, 50, 1)",
            borderWidth: 2
          },
          {
              label: 'Consumed',
              data: labels.map((a) => 0),
              backgroundColor: "rgb(255, 255, 255, 1)",
              borderColor: "rgb(0, 0, 0, 1)",
          },
        ],
      });
      useEffect(()=>{
        setData({
            labels,
            datasets: [
              {
                label: 'Goal',
                data: labels.map((a) => idealNutris[a]),
                borderColor: "rgb(255, 150, 50, 1)",
                borderWidth: 2
              },
              {
                  label: 'Consumed',
                  data: labels.map((a) => foodNutris[0][a]),
                  backgroundColor: "rgb(50, 150, 255, 1)",
                  borderColor: "rgb(255, 255, 255, 1)",
              },
            ],
          })
      }, [foodNutris])
      
    useEffect(()=>{
        const fetchIdeal = async() => {
            const res = await axios.get("/api/nutri");
            setIdealNutris(res.data);
        }
        fetchIdeal();
        const getNutris = async() => {
            const foodNutrisData = await axios.get("/api/foodList", {
              params: {
                specifyDate: true,
                date: date.toJSON(),
              },
            });
            setFoodNutris(foodNutrisData.data);
          }
          getNutris();
    }, [date]);

    return <Bar className='bg-white rounded-md' options={options} data={data} />;
}
