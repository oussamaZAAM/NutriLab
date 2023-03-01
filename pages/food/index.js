import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import {
  MdOutlineAddCircle,
  MdOutlineCancel,
  MdOutlineRemoveCircle,
} from "react-icons/md";

import { RiEditFill } from "react-icons/ri";
import { FaExternalLinkAlt } from "react-icons/fa";

import Navbar from "/components/Navbar";
import styles from "/styles/Home.module.css";
import axios from "axios";
import { User_data } from "/context/context";
import Link from "next/link";

// Irrelevent Fcts
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sliceUnderscore(string) {
  const splitted = string.split("_");
  const capitalized = splitted.map((string) => capitalizeFirstLetter(string));
  return capitalized.join(" ");
}

const Food = ({ food }) => {
  const [wiggle, setWiggle] = useState(false);
  const [addedFood, setAddedFood] = useState({});
  const [searchedWord, setSearchedWord] = useState("");
  const [eatenFoodList, setEatenFoodList] = useState([]);
  const [isAlgorithmEnabled, setIsAlgorithmEnabled] = useState(false);

  const { user, setUser } = useContext(User_data);

  // Next is SSR, so we should ... , Force a render with useEffect
  const [localNutris, setLocalNutris] = useState(false);
  const [localInfos, setLocalInfos] = useState(false);
  useEffect(() => {
    setLocalNutris(JSON.parse(window.localStorage.getItem("nutris")));
    setLocalInfos(JSON.parse(window.localStorage.getItem("dietInfos")));
  }, []);

  //Functions
  const cancelPendingFood = () => {
    setAddedFood({ ...addedFood, removingFade: true });
    setTimeout(() => setAddedFood(), 250);
  };

  const addPendingFood = () => {
    if (addedFood.size > 0) {
      setAddedFood({ ...addedFood, addingFade: true });
      setTimeout(() => {
        // setEatenFoodList(prevList => {
        //   prevList.unshift(addedFood);
        //   return prevList;
        // })
        setEatenFoodList([addedFood, ...eatenFoodList]);
        setAddedFood();
      }, 250);
    } else {
      setWiggle(true);
      setTimeout(() => {
        setWiggle(false);
      }, 1000);
    }
  };
  const deleteFood = (index) => {
    // setEatenFoodList(prevList => {
    //   prevList[index].removingFade = true;
    //   return prevList;
    // })
    setEatenFoodList((prevList) => {
      const newList = [];
      for (let i = 0; i < prevList.length; i++) {
        if (i === index) {
          const editedFood = prevList[i];
          editedFood.removingFade = true;
          newList.push(editedFood);
        } else {
          newList.push(prevList[i]);
        }
      }
      return newList;
    });
    setTimeout(() => {
      setEatenFoodList((prevList) => {
        const newList = prevList.filter(
          (food) => prevList.indexOf(food) !== index
        );
        return newList;
      });
    }, 250);
  };

  //Handle Searching food with emphasizing the input
  const formatSearchWord = (food, searchedWord) => {
    const splitted = food.name.split(new RegExp(searchedWord, "i"));
    const styled = splitted.map((word) => {
      return (
        <>
          <span className="font-paragraph font-bold text-ms ">{word}</span>
          <span className="font-paragraph font-black text-ms text-custom-orange">
            {searchedWord}
          </span>
        </>
      );
    });
    styled.pop();
    return styled;
  };

  //Handle API changes
  const [algoData, setAlgoData] = useState({});
  const enableAlgorithm = async () => {
    const res = await axios.post(
      "http://127.0.0.1:8000/polls/getFood/",
      [1000, 100, 100, 100, 100, 100, 100]
    );
    setAlgoData(res.data);
    setIsAlgorithmEnabled(true);
  };

  // Mapping over the list of Searched Food
  const searchedFood = !food
    ? null
    : food.map((food) => {
        if (
          searchedWord === "" ||
          food.name.toLowerCase().includes(searchedWord)
        ) {
          return (
            <div className="w-full" key={food.name}>
              {searchedWord !== "" ? (
                <div
                  className={
                    `indent-4 w-full
                              border-b-2 border-x-2 rounded-lg p-2 
                              hover:bg-gray-100 cursor-pointer` +
                    (eatenFoodList.some(
                      (thisFood) => thisFood.name === food.name
                    )
                      ? " bg-orange-100 hover:bg-orange-100 cursor-not-allowed"
                      : " cursor-pointer")
                  }
                  onClick={() => {
                    if (
                      eatenFoodList.length === 0 ||
                      eatenFoodList.every(
                        (thisFood) => thisFood.name !== food.name
                      )
                    ) {
                      setAddedFood({
                        ...food,
                        addingFade: false,
                        removingFade: false,
                      });
                    }
                  }}
                >
                  {formatSearchWord(food, searchedWord)}
                  <span className="font-paragraph font-bold text-ms">
                    {
                      food.name.split(new RegExp(searchedWord, "i"))[
                        food.name.split(new RegExp(searchedWord, "i")).length -
                          1
                      ]
                    }
                  </span>
                </div>
              ) : (
                <p
                  className={
                    `
                              font-paragraph font-bold text-ms indent-4
                              p-2 w-full
                              border-b-2 border-x-2 rounded-lg
                              hover:bg-gray-100
                            ` +
                    (eatenFoodList.some(
                      (thisFood) => thisFood.name === food.name
                    )
                      ? "bg-orange-100 hover:bg-orange-100 cursor-not-allowed"
                      : "cursor-pointer")
                  }
                  onClick={() => {
                    if (
                      eatenFoodList.length === 0 ||
                      eatenFoodList.some(
                        (thisFood) => thisFood.name !== food.name
                      )
                    ) {
                      setAddedFood({
                        ...food,
                        addingFade: false,
                        removingFade: false,
                      });
                    }
                  }}
                >
                  {food.name}
                </p>
              )}
            </div>
          );
        }
      });

  // Mapping over the List of Eaten Food
  const eatenFood = eatenFoodList.map((food, index) => {
    return (
      <div
        key={food.name}
        className={
          "flex flex-col xs:flex-row justify-end items-center w-full " +
          (food.removingFade
            ? "transition duration-300 scale-y-0 scale-x-100 opacity-0"
            : "transition duration-500 opacity-100") +
          " " +
          styles.dropshadow
        }
      >
        <div className="flex flex-col justify-center items-start w-full truncate xs:ml-8">
          <div className="flex items-center justify-center">
            <b className="font-logo font-bold text-xl text-center xs:text-left truncate hover:whitespace-normal sm:whitespace-normal text-custom-orange w-full my-4">
              {food.name}
            </b>
            <a
              target="_blank"
              rel="noreferrer"
              href={
                "/food/" +
                food.name.split(",").join("").split(" ").join("-").toLowerCase()
              }
            >
              <FaExternalLinkAlt className="mx-4 h-3 w-3 hover:fill-custom-orange transition duration-300" />
            </a>
          </div>
          <div className="flex flex-col self-center items-start xs:w-full my-1">
            {/* <p className="font-paragraph text-xs">
              Category:{" "}
              <span className="font-paragraph font-bold text-xs">
                {food.category}
              </span>
            </p> */}
            <div className="font-paragraph text-xs flex justify-center items-center">
              How Much:{" "}
              {/* <span className="font-paragraph font-bold text-xs">
                {food.size} g
              </span> */}
              <div
                className={`flex justify-start items-center
                text-gray-900 text-sm indent-2
                bg-gray-50 border border-gray-300 rounded-lg group outline outline-1 group-focus:outline-4
                block w-20 ml-2`}
              >
                <input
                  type="number"
                  className={`
                      text-gray-900 text-sm indent-2
                      bg-gray-50 outline-none
                      block w-12 ml-2`}
                  value={food.size || ""}
                  onChange={(e) =>
                    setEatenFoodList((prevList) => {
                      const newList = [];
                      for (let i = 0; i < prevList.length; i++) {
                        if (i === index) {
                          const editedFood = prevList[i];
                          editedFood.size = e.target.value;
                          newList.push(editedFood);
                        } else {
                          newList.push(prevList[i]);
                        }
                      }
                      return newList;
                    })
                  }
                />
                <span> g</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse xs:flex-row justify-center items-center">
          <button className="my-2 md:mx-2" onClick={() => deleteFood(index)}>
            <MdOutlineRemoveCircle
              className=" hover:fill-black transition duration-500"
              size={50}
              color={"#FF9351"}
            />
          </button>
        </div>
      </div>
    );
  });

  const laboTable1 = eatenFoodList.map((food) => {
    return (
      <tr
        key={food.name}
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <th
          scope="row"
          class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white truncate hover:whitespace-normal sm:whitespace-normal"
        >
          {food.name}
        </th>
        <td class="px-3 py-4 underline font-black text-lg truncate whitespace-normal">
          {food.size}g
        </td>
      </tr>
    );
  });

  const laboTable2 =
    Object.keys(algoData).length !== 0 &&
    Object.keys(algoData).map((food) => {
      console.log(food);
      return (
        <tr
          key={food.name}
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-bold text-gray-900 dark:text-white truncate whitespace-normal sm:whitespace-normal"
          >
            {food.slice(1).split("_").join(" ")}
          </th>
          <td class="px-3 py-4 underline font-black text-lg truncate whitespace-nowrap">
            {/* {100 * algoData[food]} g */}
            {(Math.round(100 * algoData[food] * 100) / 100).toFixed(2)}g
          </td>
        </tr>
      );
    });
  // const laboTable3 = treatedFoodList.map((food) => {
  const laboTable3 =
    Object.keys(algoData).length !== 0 &&
    Object.keys(algoData).map((food) => {
      console.log(food);
      return (
        <tr
          key={food.name}
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="text-green-500 px-6 py-4 font-bold  whitespace-nowrap dark:text-white truncate hover:whitespace-normal sm:whitespace-normal"
          >
            {food.slice(1).split("_").join(" ")}
          </th>
          <td class="px-3 py-4 underline font-black text-lg truncate whitespace-normal text-green-500">
            +{(Math.round(100 * algoData[food] * 100) / 100).toFixed(2)}g
          </td>
        </tr>
      );
    });

  // ---------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Head>
        <title>NutriLab - Food</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>

      <Navbar User={user} />

      <div className="grid grid-cols-8 justify-items-center">
        <div className="flex flex-col justify-center items-center | sm:col-start-2 col-span-8 sm:col-span-6 | max-w-5xl mx-4">
          <h1 className="font-title text-4xl xs:text-5xl sm:text-6xl text-center | w-full my-16">
            Tell us what you ate Today
          </h1>
        </div>

        <div
          className="
                        flex justify-center items-center
                        sm:col-start-2 col-span-8 sm:col-span-6
                        border-2 border-custom-orange rounded
                        w-full"
        >
          <div
            className="
                        flex flex-col justify-center items-center 
                        w-full max-w-xl"
          >
            {/* Search Box */}
            <div className="flex flex-col justify-center items-center my-6 w-8/12">
              <input
                type="text"
                onChange={(e) => setSearchedWord(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm indent-2 rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5"
                placeholder="Search ingredients to add"
              />
              <div className="overflow-y-auto h-64">
                <div className="flex flex-col justify-center items-start w-full">
                  {searchedFood}
                </div>
              </div>
            </div>

            {/* Adding Field */}
            {addedFood !== undefined && addedFood.name !== undefined && (
              <div
                id="addedFood"
                className={
                  "flex flex-col xs:flex-row justify-start items-center rounded-2 dropshadow my-4 w-11/12 transition duration-500 " +
                  (addedFood.removingFade
                    ? "transition duration-300 scale-y-0 scale-x-100 opacity-0"
                    : " opacity-100") +
                  (addedFood.addingFade
                    ? "transition duration-300 translate-y-6 opacity-0"
                    : " opacity-100") +
                  " " +
                  styles.dropshadow
                }
              >
                <div className="flex flex-col justify-center items-start w-full truncate xs:ml-8">
                  <div className="flex justify-center items-center">
                    <b className="font-logo font-bold text-xl text-center xs:text-left truncate hover:whitespace-normal sm:whitespace-normal text-custom-orange w-full my-4">
                      {addedFood.name}
                    </b>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={
                        "/food/" +
                        addedFood.name
                          .split(",")
                          .join("")
                          .split("%")
                          .join("percent")
                          .split("/")
                          .join("per")
                          .split(" ")
                          .join("-")
                          .toLowerCase()
                      }
                    >
                      <FaExternalLinkAlt className="mx-4 h-3 w-3 hover:fill-custom-orange transition duration-300" />
                    </a>
                  </div>
                  <div className="flex flex-col self-center items-start xs:w-full my-1">
                    {/* <p className="font-paragraph text-xs">
                      Category:{" "}
                      <span className="font-paragraph font-bold text-xs">
                        {addedFood.category}
                      </span>
                    </p> */}
                    <div className="flex justify-start items-center">
                      <p className="font-paragraph text-xs">
                        How much did you eat:{" "}
                      </p>
                      <div
                        className={
                          `flex justify-start items-center
                            text-gray-900 text-sm indent-2
                            bg-gray-50 border rounded-lg group outline outline-1 group-focus:outline-4
                            block w-20 ml-2 ` +
                          (wiggle && "outline-red-500 animate-wiggle")
                        }
                      >
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addPendingFood();
                            }
                          }}
                          autoFocus
                          type="number"
                          className={`text-gray-900 text-sm indent-2
                            bg-gray-50 outline-none
                            block w-12 ml-2`}
                          value={addedFood.size || ""}
                          onChange={(e) =>
                            setAddedFood({
                              ...addedFood,
                              size: e.target.value,
                              edit: false,
                            })
                          }
                        />
                        <span> g</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row-reverse xs:flex-row justify-center items-center">
                  <button className="my-2 md:mx-2" onClick={addPendingFood}>
                    <MdOutlineAddCircle
                      className=" hover:fill-black transition duration-500"
                      size={50}
                      color={"#FF9351"}
                    />
                  </button>
                  <button className="my-2 md:mx-2" onClick={cancelPendingFood}>
                    <MdOutlineCancel
                      className=" hover:fill-black transition duration-500"
                      size={45}
                      color={"#FF9351"}
                    />
                  </button>
                </div>
              </div>
            )}

            <div
              className={
                `
                w-full border-b-2 border-custom-orange my-4 w-11/12 ` +
                (eatenFoodList.length
                  ? "transition duration-300 scale-x-100"
                  : "transition duration-300 scale-x-0")
              }
            ></div>

            <div className="flex justify-center items-center rounded-2 dropshadow my-4 w-11/12">
              <div className="grid grid-cols-2 xs:flex xs:flex-col justify-center items-center gap-2 w-full">
                {eatenFood}
              </div>
            </div>

            {eatenFoodList.length !== 0 && (
              <div className="flex justify-center items-center w-full">
                <a href="#algorithm">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs  rounded-2xl "
                    style={{ backgroundColor: "#DCF8FF" }}
                    onClick={enableAlgorithm}
                  >
                    <button className="py-4 px-9 font-extrabold">
                      Proceed
                    </button>
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-70"></div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Check Your Informations  */}
        <div
          className="
                        flex flex-col justify-center items-center
                        sm:col-start-2 col-span-8 sm:col-span-6
                        border-2 border-custom-orange rounded
                        w-full my-16"
        >
          <h3 className="font-title text-3xl xs:text-4xl sm:text-5xl text-center | w-full my-16">
            Check Your Informations
          </h3>
          <div className="flex justify-between items-center">
            <h4 className="font-title text-2xl xs:text-3xl sm:text-4xl text-center | w-full">
              Your Input Infos
            </h4>
            <Link href="/nutrients">
              <RiEditFill
                size={25}
                className="hover:fill-custom-orange transition duration-300 ml-2"
              />
            </Link>
          </div>
          {localInfos ? (
            <div className="flex-2 flex justify-center items-center border rounded my-4">
              <table className="w-full text-sm text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Age
                    </th>
                    <td className="px-6 py-4 truncate">
                      {localInfos.age || "No Entry"}
                    </td>
                  </tr>

                  <tr className="border-b bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Sex
                    </th>
                    <td className="px-6 py-4 truncate">
                      {capitalizeFirstLetter(localInfos.sex) || "No Entry"}
                    </td>
                  </tr>

                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Height
                    </th>
                    <td className="px-6 py-4 truncate">
                      {localInfos.height || "No Entry"}
                    </td>
                  </tr>

                  <tr className="border-b bg-gray-50">
                    <th
                      scope="row"
                      className="px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Weight
                    </th>
                    <td className="px-6 py-4 truncate">
                      {localInfos.weight || "No Entry"}
                    </td>
                  </tr>

                  <tr className="border-b bg-white">
                    <th
                      scope="row"
                      className="text-center px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Activity
                    </th>
                    <td className="px-6 py-4 truncate">
                      {sliceUnderscore(localInfos.activity) || "No Entry"}
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <th
                      scope="row"
                      className="text-center px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      Plan
                    </th>
                    <td className="px-6 py-4 truncate">
                      {sliceUnderscore(localInfos.plan) || "No Entry"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center border rounded my-8">
              <span>
                <b className="font-paragraph font-medium text-sm">
                  It seems you have yet to tell us about you,{" "}
                </b>
                <Link href="/nutrients">
                  <b className="font-paragraph font-black text-sm hover:underline hover:text-custom-orange transition duration-300">
                    click here
                  </b>
                </Link>
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <h4 className="font-title text-2xl xs:text-3xl sm:text-4xl text-center | w-full">
              Your generated Infos
            </h4>
            <Link href="/nutrients">
              <RiEditFill
                size={25}
                className="hover:fill-custom-orange transition duration-300 ml-2"
              />
            </Link>
          </div>

          {localNutris ? (
            <div className="flex my-8 overflow-x-auto no-scrollwbar w-11/12">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-700">
                      Calories
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-800">
                      Proteins
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-700">
                      Carbs
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-800">
                      Fats
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-700">
                      Fiber
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-800">
                      Salt
                    </th>
                    <th scope="col" class="px-6 py-3 text-white bg-gray-700">
                      Sugar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                      {localNutris.kCalories} kCal
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {localNutris.proteins} g
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                      {localNutris.carbs} g
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {localNutris.fats} g
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                      {localNutris.fiber} g
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {localNutris.salt} g
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                      {localNutris.sugar} g
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center border rounded my-8">
              <span>
                <b className="font-paragraph font-medium text-sm">
                  You haven't yet generated your daily nutrients ,{" "}
                </b>
                <Link href="/nutrients">
                  <b className="font-paragraph font-black text-sm hover:underline hover:text-custom-orange transition duration-300">
                    click to apply your infos
                  </b>
                </Link>
              </span>
            </div>
          )}
        </div>

        {/* Food Algorithm  */}
        {isAlgorithmEnabled && (
          <div
            id="algorithm"
            className="
                        flex flex-col justify-center items-center
                        sm:col-start-2 col-span-8 sm:col-span-6
                        border-2 border-custom-orange rounded
                        w-full mb-16"
          >
            <h3 className="font-title text-3xl xs:text-4xl sm:text-5xl text-center | w-full my-16">
              Your Labo
            </h3>
            <div className="flex items-stretch justify-between w-full mb-4">
              <div className="flex-1 border-2 border-custom-orange flex flex-col justify-start items-center w-full mx-2">
                <p className="font-paragraph font-bold text-xl text-black my-4">
                  Previous Diet
                </p>

                <div className="border-b-2 border-custom-orange w-full"></div>

                <table class="w-full text-sm text-left text-black dark:text-white font-logo">
                  <tbody>{laboTable1}</tbody>
                </table>
              </div>

              <div
                className="
                          border-2 border-custom-orange 
                          flex-1 flex flex-col justify-start items-center 
                          w-full mx-2
                          
            "
              >
                <div className="bg-gradient-to-r from-gradient1 to-gradient2 w-full text-center">
                  <p className="font-paragraph font-bold text-xl text-white my-4">
                    Changes Made
                  </p>
                </div>

                <div className="border-b-2 border-custom-orange w-full"></div>

                <table class="w-full text-sm text-left text-black dark:text-white font-logo">
                  <tbody>{laboTable2}</tbody>
                </table>
              </div>

              <div
                className="
                          border-2 border-custom-orange 
                          flex-1 flex flex-col justify-start items-center 
                          w-full mx-2
                          
            "
              >
                <div className="bg-gradient-to-r from-gradient1 to-gradient2 w-full text-center">
                  <p className="font-paragraph font-bold text-xl text-white my-4">
                    New Diet
                  </p>
                </div>

                <div className="border-b-2 border-custom-orange w-full"></div>

                <table class="w-full text-sm text-left text-black dark:text-white font-logo">
                  <tbody>{laboTable1}</tbody>
                  <tbody>{laboTable3}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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
