import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import Navbar from "/components/Navbar";
import axios from "axios";
import { User_data } from "/context/context";
import AddDailyFood from "../components/AddDailyFoods";
import YourInfo from "../components/YourInfo";

const Food = ({ food }) => {
  const [eatenFoodList, setEatenFoodList] = useState([]);
  const [isAlgorithmEnabled, setIsAlgorithmEnabled] = useState(false);

  const { user, setUser } = useContext(User_data);

  // Next is SSR, so we should ... , Force a render with useEffect

  const [localNutris, setLocalNutris] = useState({});
  const [localInfos, setLocalInfos] = useState({});

  useEffect(() => {
    // Fetch Data from the server if the user is authenticated
    const fetchNutriInfo = async () => {
      await axios.get("/api/nutriInfo").then((res) => {
        setLocalInfos(res.data);
      });
    };

    const fetchNutrients = async () => {
      await axios.get("/api/nutri").then((res) => {
        setLocalNutris(res.data);
      });
    };
    // Fetch Data from localStorage if the user is guest
    const dietInfos = JSON.parse(window.localStorage.getItem("dietInfos"));
    const nutris = JSON.parse(window.localStorage.getItem("nutris"));

    // Check if the user is authenticated or is a guest
    if (!user) {
      setLocalInfos(dietInfos);
      setLocalNutris(nutris);
    } else {
      fetchNutriInfo();
      fetchNutrients();
    }
  }, [user]);

  const objectizeEatenFood = (eatenFoodList) => {
    var object = {};
    for (let i = 0; i < eatenFoodList.length; i++) {
      object = { ...object, [eatenFoodList[i].name]: eatenFoodList[i].size };
    }
    return object;
  };

  //Handle API changes
  const [algoData, setAlgoData] = useState({});

  const laboTable1 = eatenFoodList.map((food) => {
    return (
      <tr
        key={food}
        className="dark:bg-gray-800 dark:border-gray-700 border-b bg-white"
      >
        <th
          scope="row"
          className="dark:text-white truncate whitespace-normal px-6 py-4 font-bold text-gray-900"
        >
          {food.name}
        </th>
        <td className="max-w-[100px] truncate whitespace-nowrap px-3 py-4 text-lg font-black underline hover:max-w-full md:max-w-[150px] ">
          {food.size}g
        </td>
      </tr>
    );
  });

  const laboTable2 =
    Object.keys(algoData).length !== 0 &&
    Object.keys(algoData).map((food) => {
      return (
        <tr
          key={food}
          className="dark:bg-gray-800 dark:border-gray-700 border-b bg-white"
        >
          <th
            scope="row"
            className={`dark:text-white truncate whitespace-normal px-6  py-4 font-bold ${
              algoData[food] >= 0 ? "text-green-500" : "text-red-600"
            }`}
          >
            {food}
          </th>
          <td
            className={`max-w-[100px] truncate whitespace-nowrap px-3 py-4 text-lg font-black underline hover:max-w-full md:max-w-[150px] ${
              algoData[food] >= 0 ? "text-green-500" : "text-red-600"
            }`}
          >
            {algoData[food] > 0 ? "+" : ""}
            {Math.round(algoData[food]).toFixed(2)}g
          </td>
        </tr>
      );
    });

  const laboTable3 =
    Object.keys(algoData).length !== 0 &&
    Object.keys(algoData).map((food) => {
      const eatenFoodObject = objectizeEatenFood(eatenFoodList);

      return (
        <tr
          key={food}
          className="dark:bg-gray-800 dark:border-gray-700 border-b bg-white"
        >
          <th
            scope="row"
            className="dark:text-white truncate whitespace-normal px-6  py-4 font-bold text-blue-500"
          >
            {food}
          </th>
          <td className="max-w-[100px] truncate whitespace-nowrap px-3 py-4 text-lg font-black text-blue-500 underline hover:max-w-full md:max-w-[150px]">
            {algoData[food] > 0 ? "+" : ""}
            {algoData[food] > 0
              ? Math.round(algoData[food]).toFixed(2)
              : Math.round(eatenFoodObject[food]).toFixed(2) -
                -Math.round(algoData[food]).toFixed(2)}
            g
          </td>
        </tr>
      );
    });

  function sumObjectsByKey(object1, object2) {
    const sum = {
      Calories:
        object1.Calories + (object2.Calories * parseInt(object2.size)) / 100,
      Protein:
        object1.Protein + (object2.Protein * parseInt(object2.size)) / 100,
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

  // ---------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Head>
        <title>NutriLab - Food</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>
      <Navbar User={user} />
      <AddDailyFood
        food={food}
        eatenFoodList={eatenFoodList}
        setEatenFoodList={setEatenFoodList}
        setAlgoData={setAlgoData}
        setIsAlgorithmEnabled={setIsAlgorithmEnabled}
        sumNutrients={sumNutrients}
      />
      <YourInfo localInfos={localInfos} localNutris={localNutris} />
      {/* Food Algorithm  */}
      <div
        id="algorithm"
        className="
                        col-span-8 mb-16 flex w-full
                        flex-col items-center justify-center
                        rounded border-2 border-custom-orange
                        sm:col-span-6 sm:col-start-2"
      >
        <h3 className="| my-16 w-full text-center font-title text-3xl xs:text-4xl sm:text-5xl">
          Your Labo
        </h3>
        <div className="mb-4 flex w-full flex-col items-stretch justify-between space-y-4 md:flex-row md:space-y-0 xl:w-3/4">
          <div className="flex w-full flex-1 flex-col items-center justify-start border-2 border-custom-orange">
            <p className="my-4 font-paragraph text-xl font-bold text-black">
              Previous Diet
            </p>

            <div className="w-full border-b-2 border-custom-orange"></div>

            <table className="dark:text-white w-full text-left font-logo text-sm text-black">
              <tbody>{laboTable1}</tbody>
            </table>
          </div>
          {/* {isAlgorithmEnabled && ( */}
          <div
            className="flex w-full flex-1 flex-col items-center justify-start border-2 border-custom-orange
              "
          >
            <div className="w-full bg-gradient-to-r from-gradient1 to-gradient2 text-center">
              <p className="my-4 font-paragraph text-xl font-bold text-white">
                Changes Made
              </p>
            </div>

            <div className="w-full border-b-2 border-custom-orange"></div>

            {isAlgorithmEnabled && (
              <table className="dark:text-white w-full text-left font-logo text-sm text-black">
                <tbody>{laboTable2}</tbody>
              </table>
            )}
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-start border-2 border-custom-orange">
            <div className="w-full bg-gradient-to-r from-gradient1 to-gradient2 text-center">
              <p className="my-4 font-paragraph text-xl font-bold text-white">
                New Diet
              </p>
            </div>

            <div className="w-full border-b-2 border-custom-orange"></div>
            {isAlgorithmEnabled && (
              <table className="dark:text-white w-full text-left font-logo text-sm text-black">
                <tbody>{laboTable3}</tbody>
              </table>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Food;

export const getStaticProps = async () => {
  const url =
    process.env.VERCEL_ENV === "production"
      ? "https://nutrilab.vercel.app/api/food"
      : "http://localhost:3000/api/food";
  const res = await axios.get(url);
  const food = await res.data;

  return {
    props: {
      food,
    },
  };
};
