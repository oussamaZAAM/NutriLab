import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItsBuilt from "../components/HowItsBuilt";
import DietInfo from "../components/DietInfo";
import DailyNutrients from "../components/DailyNutrients";
import isAuthenticated from "./api/Auth";
import getCookie from "next-cookies";

import { User_data } from "../context/context";
import { useContext } from "react";

function calculateNutrients(age, sex, height, weight, activity, plan) {
  // Calculate BMR : Harris-Benedict Calculator
  var BMR;
  if (sex === "male") {
    BMR = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
  }
  if (sex === "female") {
    BMR = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }

  // Calculate Calories
  var kCalories;
  if (activity === "sedentary") {
    kCalories = 1.2 * BMR;
  }
  if (activity === "lightly_active") {
    kCalories = 1.375 * BMR;
  }
  if (activity === "moderately_active") {
    kCalories = 1.55 * BMR;
  }
  if (activity === "very_active") {
    kCalories = 1.725 * BMR;
  }
  if (activity === "super_active") {
    kCalories = 1.9 * BMR;
  }

  if (plan === "lose_weight") {
    kCalories -= 500;
  }
  if (plan === "build_muscle") {
    kCalories += 500;
  }


  // Calculate Proteins
  var proteins;
  if (plan === "maintain") {
    if (activity === "sedentary" || activity==="lightly_active") {
      proteins = 0.8 * weight;
    }
    if (activity === "moderately_active") {
      proteins = 0.9 * weight;
    }
    if (activity === "very_active" || activity==="super_active") {
      proteins = 1.0 * weight;
    }
  }

  if (plan === "lose_weight") {
    if (activity === "sedentary") {
      proteins = 1.2 * weight;
    }
    if (activity==="lightly_active") {
      proteins = 1.3 * weight;
    }
    if (activity === "moderately_active") {
      proteins = 1.4 * weight;
    }
    if (activity === "very_active") {
      proteins = 1.5 * weight;
    }
    if (activity==="super_active") {
      proteins = 1.6 * weight;
    }
  }

  if (plan === "build_muscle") {
    if (activity === "sedentary") {
      proteins = 1.6 * weight;
    }
    if (activity==="lightly_active") {
      proteins = 1.7 * weight;
    }
    if (activity === "moderately_active") {
      proteins = 1.8 * weight;
    }
    if (activity === "very_active") {
      proteins = 1.9 * weight;
    }
    if (activity==="super_active") {
      proteins = 2.0 * weight;
    }
  }

  // Calculate Fats
  var fats;
  if (plan === "maintain") {
    fats = (kCalories * 0.275) / 9;
  }
  if (plan === "lose_weight") {
    fats = 0.75 * weight;
  }
  if (plan === "build_muscle") {
    fats = 1.0 * weight;
  }

  // Calculate Carbs
  var carbs;
  if (plan === "lose_weight") {
    carbs = (kCalories * 0.45) / 4;
  }
  if (plan === "maintain") {
    carbs = (kCalories * 0.55) / 4;
  }
  if (plan === "build_muscle") {
    carbs = (kCalories * 0.65) / 4;
  }

  // Calculate Iron
  var iron;
  if (sex === "female") {
    if (age <= 50) {
      iron = 0.018;
    } else {
      iron = 0.008;
    }
  } else {
    iron = 0.008;
  }
  // Calculate Fiber
  var fiber = (kCalories / 1000) * 14;
  // Calculate Sugar
  var sugar;
  if (sex === "female") {
    sugar = 24;
  } else {
    sugar = 36;
  }
  // Calculate Sugar
  var salt = 6;

  return {
    kCalories: Math.round(kCalories),
    proteins: Math.round(proteins),
    fats: Math.round(fats),
    carbs: Math.round(carbs),
    iron: Math.round(iron),
    fiber: Math.round(fiber),
    sugar: Math.round(sugar),
    salt: Math.round(salt),
  };
}

function calculateVitamins(age, sex) {
  //Vitamin A
  var vitaminA;
  if (sex === "female") {
    vitaminA = 0.0007;
  } else {
    vitaminA = 0.0009;
  }

  //Vitamin C
  var vitaminC;
  if (sex === "female" && age === 18) {
    vitaminC = 0.065;
  } else {
    vitaminC = 0.075;
  }

  //Vitamin D
  var vitaminD;
  if (age >= 70) {
    vitaminD = 0.00002;
  } else {
    vitaminD = 0.000015;
  }

  //Vitamin E
  var vitaminE = 0.015;

  //Vitamin K
  var vitaminK;
  if (age >= 19) {
    if (sex === "male") {
      vitaminK = 0.00012;
    } else {
      vitaminK = 0.00009;
    }
  } else {
    vitaminK = 0.000075;
  }

  return {
    vitaminA: vitaminA,
    vitaminC: vitaminC,
    vitaminD: vitaminD,
    vitaminK: vitaminK,
  };
}

export default function Nutrients() {
  const [isInfosApplied, setIsInfosApplied] = useState(false);
  const [nutrients, setNutrients] = useState();
  const [vitamins, setVitamins] = useState();
  const { user, setUser } = useContext(User_data);
  const applyInfos = async (dietInfos) => {
    const { age, sex, height, weight, activity, plan } = dietInfos;
    // localStorage.setItem("dietInfos", JSON.stringify(dietInfos));
    user &&
      (await axios.put("/api/profile", dietInfos, {
        headers: {
          "Content-Type": "application/json",
        },
      }));
    const nutris = calculateNutrients(age, sex, height, weight, activity, plan);
    //Calculate Nutrients
    setNutrients(nutris);
    user && (await axios.put("/api/nutri", nutris));
    //Calculate Vitamins
    setVitamins(calculateVitamins(age, sex, height, weight, activity, plan));

    setIsInfosApplied(true);
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
        <div className="flex flex-col justify-center items-center | sm:col-start-2 xl:col-start-3 col-span-6 sm:col-span-4 xl:col-span-2 | max-w-xl mx-4">
          <h1 className="font-title text-6xl text-center | w-full my-16">
            Let us know You
          </h1>
          <DietInfo
            handleApply={applyInfos}
            flushInfos={() => setIsInfosApplied(false)}
            isInfosApplied={isInfosApplied}
          />
        </div>
      </div>

      <div className="grid grid-cols-8">
        {isInfosApplied && (
          <DailyNutrients nutrients={nutrients} vitamins={vitamins} />
        )}
      </div>

      <HowItsBuilt />

      <Footer />
    </div>
  );
}

Nutrients.getInitialProps = async (context) => {
  const { NutriLab } = getCookie(context);
  const user = isAuthenticated(NutriLab);
  if (!user) {
    return { user: false };
  }
  return { user: user };
};
