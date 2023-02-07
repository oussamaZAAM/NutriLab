import Head from "next/head";
import { useState } from "react";
import server from "/config";
import getCookie from "next-cookies";
import isAuthenticated from "./api/Auth"; 

import {
  MdOutlineAddCircle,
  MdOutlineCancel,
  MdOutlineRemoveCircle,
} from "react-icons/md";

import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Food = ({ user, food }) => {
  const [wiggle, setWiggle] = useState(false);
  const [addedFood, setAddedFood] = useState({});
  const [searchedWord, setSearchedWord] = useState("");
  const [eatenFoodList, setEatenFoodList] = useState([]);

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

  // Mapping over the list of Searched Food
  const searchedFood = (!food ? null : food.map((food) => {
    if (searchedWord === "" || food.name.toLowerCase().includes(searchedWord)) {
      return (
        <a href="#addedFood" className="w-full" key={food.name}>
          {/* <p
            className="
                      font-paragraph font-bold text-ms indent-4
                      p-2 w-full
                      border-b-2 border-x-2 rounded-lg
                      hover:bg-gray-100 hover:animate-pulse cursor-pointer
                    "
            onClick={() =>
              setAddedFood({ ...food, addingFade: false, removingFade: false })
            }
          >
              {searchedWord !== '' 
              ?
                (<span>food.name</span>)
                +food.name.split(new RegExp(searchedWord, 'i') )[1] 
              : food.name}
          </p> */}
          {searchedWord !== '' 
              ? <div className="
                                indent-4 w-full
                                border-b-2 border-x-2 rounded-lg p-2 
                                hover:bg-gray-100 hover:animate-pulse cursor-pointer">
                <span
                  className="
                            font-paragraph font-bold text-ms 
                          "
                  onClick={() =>
                    setAddedFood({ ...food, addingFade: false, removingFade: false })
                  }
                >
                  {food.name.split(new RegExp(searchedWord, 'i') )[0]}
                </span>
                <span 
                  className="
                            font-paragraph font-black text-ms text-custom-orange
                          "
                  onClick={() =>
                    setAddedFood({ ...food, addingFade: false, removingFade: false })
                  }>
                  {searchedWord}</span>
                <span
                  className="
                            font-paragraph font-bold text-ms
                          "
                  onClick={() =>
                    setAddedFood({ ...food, addingFade: false, removingFade: false })
                  }
                >
                  {food.name.split(new RegExp(searchedWord, 'i') )[1]}
                </span>
              </div>
              : <p
                  className="
                            font-paragraph font-bold text-ms indent-4
                            p-2 w-full
                            border-b-2 border-x-2 rounded-lg
                            hover:bg-gray-100 hover:animate-pulse cursor-pointer
                          "
                  onClick={() =>
                    setAddedFood({ ...food, addingFade: false, removingFade: false })
                  }
                >
                  {food.name}
                </p>
            }
        </a>
      );
    }
  }));

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
        <div className="flex flex-col justify-center items-start w-full truncate xs:ml-12">
          <b className="font-logo font-bold text-xl text-center xs:text-left truncate hover:whitespace-normal sm:whitespace-normal text-custom-orange w-full my-4 cursor-pointer">
            {food.name}
          </b>
          <div className="flex flex-col self-center items-start xs:w-full">
            {/* <p className="font-paragraph text-xs">
              Category:{" "}
              <span className="font-paragraph font-bold text-xs">
                {food.category}
              </span>
            </p> */}
            <p className="font-paragraph text-xs">
              How Much:{" "}
              <span className="font-paragraph font-bold text-xs">
                {food.size} g
              </span>
            </p>
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

  // ---------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <Head>
        <title>NutriLab - Food</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>

      <Navbar User={user ? user : null} />

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
                {/* <Image
                  fill
                  src={addedFood.img}
                  alt="beef"
                  className="h-20 w-20 my-4 mx-4 md:mx-8"
                /> */}

                <div className="flex flex-col justify-center items-start w-full">
                  <b className="font-logo font-bold text-xl text-center xs:text-left text-custom-orange w-full my-4">
                    {addedFood.name}
                  </b>
                  <div className="flex flex-col self-center items-start xs:w-full">
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
                      <input
                        type="number"
                        className={
                          `text-gray-900 text-sm indent-2
                                bg-gray-50 border border-gray-300 rounded-lg focus:ring-custom-orange focus:border-custom-orange
                                block w-20 ml-2 ` +
                          (wiggle
                            ? "border-red-500 animate-wiggle"
                            : "border-gray-300")
                        }
                        placeholder="In grams"
                        value={addedFood.size || ""}
                        onChange={(e) =>
                          setAddedFood({ ...addedFood, size: e.target.value })
                        }
                      />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;

export const getStaticProps = async (context) => {
  const url = (process.env.VERCEL_ENV === 'production' ? '' : process.env.SERVER);
  const res = await axios.get(url+'/api/food');
  const food = await res.data;

  const { NutriLab } = getCookie(context);
  var user = isAuthenticated(NutriLab);
  if (!user) {
    user = false;
    return {
      props: {
        food,
        user
      }
    }
  }
  return {
    props: {
      food, 
      user
    }
  };

  // const res = await fetch(`${server}/api/food`);
  // const food = await res.json();
  // return {
  //   props: {
  //     food,
  //   },
  // };
};

// Food.getInitialProps = async (context) => {

//   const url = (process.env.VERCEL_ENV === 'production' ? '' : process.env.SERVER);
//   const res = await axios.get(url+'/api/food');
//   const food = await res.data;

//   const { NutriLab } = getCookie(context);
//   const user = isAuthenticated(NutriLab);
//   if (!user) {
//     return { user: false, food: food };
//   }
//   return { user: user, food: food };
// };

