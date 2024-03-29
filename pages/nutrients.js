import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItsBuilt from "../components/HowItsBuilt";
import DietInfo from "../components/DietInfo";
import DailyNutrients from "../components/DailyNutrients";

import { User_data } from "../context/context";
import { useContext } from "react";
import calculateNutrients from "../components/Calculate/CalculateNutrients";
import calculateVitamins from "../components/Calculate/CalculateVitamins";
import { useRouter } from "next/router";

export default function Nutrients() {
  const [isInfosApplied, setIsInfosApplied] = useState(false);
  const [nutrients, setNutrients] = useState();
  const [vitamins, setVitamins] = useState({});
  const { user, setUser } = useContext(User_data);

  const router = useRouter();

  // Next is SSR so we should ... , Force a render with useEffect
  const [localInfos, setLocalInfos] = useState({
    age: "",
    sex: "",
    height: "",
    weight: "",
    activity: "",
    plan: "",
  });
  const [localNutris, setLocalNutris] = useState({
    kCalories: null,
    proteins: null,
    carbs: null,
    fats: null,
    fiber: null,
    salt: null,
    iron: null,
    sugar: null,
  });

  useEffect(() => {
    // Fetch Data from the server if the user is authenticated
    const fetchNutriInfo = async (dietInfos) => {
      await axios.get("/api/nutriInfo").then((res) => {
        if (Object.keys(res.data).every((key) => res.data[key] !== null)) {
          setLocalInfos(res.data);
        } else {
          setLocalInfos(dietInfos);
        }
      });
    };

    const fetchNutrients = async (nutris) => {
      await axios.get("/api/nutri").then((res) => {
        if (Object.keys(res.data).every((key) => res.data[key] !== null)) {
          setLocalNutris(res.data);
          setIsInfosApplied(true);
        }
      });
    };
    // Fetch Data from localStorage if the user is guest
    const dietInfos = JSON.parse(window.localStorage.getItem("dietInfos"));
    const nutris = JSON.parse(window.localStorage.getItem("nutris"));

    // Check if the user is authenticated or is a guest
    if (!user) {
      setLocalInfos(dietInfos);
    } else {
      fetchNutriInfo(dietInfos);
      fetchNutrients(nutris);
    }
  }, [user]);

  const applyInfos = async (dietInfos) => {
    const { age, sex, height, weight, activity, plan } = dietInfos;
    user &&
      (await axios.put("/api/nutriInfo", dietInfos, {
        headers: {
          "Content-Type": "application/json",
        },
      }));
    const nutris = calculateNutrients(age, sex, height, weight, activity, plan);

    //Check if user is authenticated
    if (user) {
      //Calculate Nutrients
      setNutrients(nutris);
      localStorage.setItem("nutris", JSON.stringify(nutris));
      user && (await axios.put("/api/nutri", nutris));
      //Calculate Vitamins
      setVitamins(calculateVitamins(age, sex, height, weight, activity, plan));
      setIsInfosApplied(true);
    } else {
      // Redirect to logging in
      router.push("/?path=/nutrients&requestLogin=1");
    }
  };

  return (
    <div>
      <Head>
        <title>NutriLab - Nutrients</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>

      {/* Nutrients Page  */}
      <Navbar User={user} />

      <div className="grid grid-cols-6 justify-items-center">
        <div className="| | col-span-6 mx-4 flex max-w-xl flex-col items-center justify-center sm:col-span-4 sm:col-start-2 xl:col-span-2 xl:col-start-3">
          <h1 className="| my-16 w-full text-center font-title text-6xl">
            Let us know You
          </h1>
          <DietInfo
            handleApply={applyInfos}
            flushInfos={() => setIsInfosApplied(false)}
            isInfosApplied={isInfosApplied}
            localInfos={localInfos}
          />
        </div>
      </div>

      <div className="grid grid-cols-8">
        {isInfosApplied &&
          (nutrients ? (
            <DailyNutrients nutrients={nutrients} vitamins={vitamins} />
          ) : (
            Object.keys(localNutris).every(
              (key) => localNutris[key] !== null
            ) && <DailyNutrients nutrients={localNutris} vitamins={vitamins} />
          ))}
      </div>

      <HowItsBuilt />

      <Footer />
    </div>
  );
}
