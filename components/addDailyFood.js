import {
  MdOutlineAddCircle,
  MdOutlineCancel,
  MdOutlineRemoveCircle,
} from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import styles from "/styles/Home.module.css";
import axios from "axios";

export default function AddDailyFood({
  food,
  setEatenFoodList,
  eatenFoodList,
  setAlgoData,
  setIsAlgorithmEnabled,
  sumNutrients,
}) {
  const [wiggle, setWiggle] = useState(false);
  const [addedFood, setAddedFood] = useState({});
  const [searchedWord, setSearchedWord] = useState("");
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
          <span className="text-ms font-paragraph font-bold ">{word}</span>
          <span className="text-ms font-paragraph font-black text-custom-orange">
            {searchedWord}
          </span>
        </>
      );
    });
    styled.pop();
    return styled;
  };
  function addValuesOfTwoObjects(obj1, obj2) {
    const obj3 = {};

    obj3["Calories"] = obj1["kCalories"] - obj2["Calories"];
    obj3["Protein"] = obj1["proteins"] - obj2["Protein"];
    obj3["Carbs"] = obj1["carbs"] - obj2["Carbs"];
    obj3["Fat"] = obj1["fats"] - obj2["Fat"];
    obj3["Fiber"] = obj1["fiber"] - obj2["Fiber"];
    obj3["Salt"] = obj1["salt"] - obj2["Salt"];
    obj3["Sugar"] = obj1["sugar"] - obj2["Sugar"];

    return obj3;
  }
  const enableAlgorithm = async () => {
    const nutrients = sumNutrients();
    const nutriRes = await axios.get("/api/nutri");
    const neededNutri = addValuesOfTwoObjects(nutriRes.data, nutrients);
    const res = await axios.post(
      "http://127.0.0.1:8000/polls/getFood/",
      neededNutri
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
          food.name.toLowerCase().includes(searchedWord.toLowerCase())
        ) {
          return (
            <div className="w-full" key={food.name}>
              {searchedWord !== "" ? (
                <div
                  className={
                    `w-full cursor-pointer
                          rounded-lg border-x-2 border-b-2 p-2 
                          indent-4 hover:bg-gray-100` +
                    (eatenFoodList.some(
                      (thisFood) => thisFood.name === food.name
                    )
                      ? " cursor-not-allowed bg-orange-100 hover:bg-orange-100"
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
                  <span className="text-ms font-paragraph font-bold">
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
                          text-ms w-full rounded-lg border-x-2
                          border-b-2 p-2
                          indent-4 font-paragraph font-bold
                          hover:bg-gray-100
                        ` +
                    (eatenFoodList.some(
                      (thisFood) => thisFood.name === food.name
                    )
                      ? "cursor-not-allowed bg-orange-100 hover:bg-orange-100"
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
          "flex w-full flex-col items-center justify-end xs:flex-row " +
          (food.removingFade
            ? "scale-y-0 scale-x-100 opacity-0 transition duration-300"
            : "opacity-100 transition duration-500") +
          " " +
          styles.dropshadow
        }
      >
        <div className="flex w-full flex-col items-start justify-center truncate xs:ml-8">
          <div className="flex items-center justify-center">
            <b className="my-4 w-full truncate text-center font-logo text-xl font-bold text-custom-orange hover:whitespace-normal xs:text-left sm:whitespace-normal">
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
              <FaExternalLinkAlt className="mx-4 h-3 w-3 transition duration-300 hover:fill-custom-orange" />
            </a>
          </div>
          <div className="my-1 flex flex-col items-start self-center xs:w-full">
            {/* <p className="font-paragraph text-xs">
          Category:{" "}
          <span className="font-paragraph font-bold text-xs">
            {food.category}
          </span>
        </p> */}
            <div className="flex items-center justify-center font-paragraph text-xs">
              How Much:{" "}
              {/* <span className="font-paragraph font-bold text-xs">
            {food.size} g
          </span> */}
              <div
                className={`group ml-2 flex
            w-20 items-center justify-start
            rounded-lg border border-gray-300 bg-gray-50 indent-2 text-sm text-gray-900 outline
            outline-1 group-focus:outline-4`}
              >
                <input
                  type="number"
                  className={`
                  ml-2 block w-12
                  bg-gray-50 indent-2
                  text-sm text-gray-900 outline-none`}
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

        <div className="flex flex-row-reverse items-center justify-center xs:flex-row">
          <button className="my-2 md:mx-2" onClick={() => deleteFood(index)}>
            <MdOutlineRemoveCircle
              className=" transition duration-500 hover:fill-black"
              size={50}
              color={"#FF9351"}
            />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-8 justify-items-center">
      <div className="| | col-span-8 mx-4 flex max-w-5xl flex-col items-center justify-center sm:col-span-6 sm:col-start-2">
        <h1 className="| my-16 w-full text-center font-title text-4xl xs:text-5xl sm:text-6xl">
          Tell us what you ate Today
        </h1>
      </div>

      <div
        className="
                        col-span-8 flex w-full
                        items-center justify-center rounded
                        border-2 border-custom-orange sm:col-span-6
                        sm:col-start-2"
      >
        <div
          className="
                        flex w-full max-w-xl flex-col 
                        items-center justify-center"
        >
          {/* Search Box */}
          <div className="my-6 flex w-8/12 flex-col items-center justify-center">
            <input
              type="text"
              onChange={(e) => setSearchedWord(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 indent-2 text-sm text-gray-900 focus:border-custom-orange focus:ring-custom-orange"
              placeholder="Search ingredients to add"
            />
            <div className="h-64 overflow-y-auto">
              <div className="flex w-full flex-col items-start justify-center">
                {searchedFood}
              </div>
            </div>
          </div>

          {/* Adding Field */}
          {addedFood !== undefined && addedFood.name !== undefined && (
            <div
              id="addedFood"
              className={
                "rounded-2 dropshadow my-4 flex w-11/12 flex-col items-center justify-start transition duration-500 xs:flex-row " +
                (addedFood.removingFade
                  ? "scale-y-0 scale-x-100 opacity-0 transition duration-300"
                  : " opacity-100") +
                (addedFood.addingFade
                  ? "translate-y-6 opacity-0 transition duration-300"
                  : " opacity-100") +
                " " +
                styles.dropshadow
              }
            >
              <div className="flex w-full flex-col items-start justify-center truncate xs:ml-8">
                <div className="flex items-center justify-center">
                  <b className="my-4 w-full truncate text-center font-logo text-xl font-bold text-custom-orange hover:whitespace-normal xs:text-left sm:whitespace-normal">
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
                    <FaExternalLinkAlt className="mx-4 h-3 w-3 transition duration-300 hover:fill-custom-orange" />
                  </a>
                </div>
                <div className="my-1 flex flex-col items-start self-center xs:w-full">
                  {/* <p className="font-paragraph text-xs">
                      Category:{" "}
                      <span className="font-paragraph font-bold text-xs">
                        {addedFood.category}
                      </span>
                    </p> */}
                  <div className="flex items-center justify-start">
                    <p className="font-paragraph text-xs">
                      How much did you eat:{" "}
                    </p>
                    <div
                      className={
                        `group ml-2 flex
                            w-20 items-center justify-start
                            rounded-lg border bg-gray-50 indent-2 text-sm text-gray-900 outline
                             outline-1 group-focus:outline-4 ` +
                        (wiggle && "animate-wiggle outline-red-500")
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
                        className={`ml-2 block w-12
                            bg-gray-50 indent-2
                            text-sm text-gray-900 outline-none`}
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

              <div className="flex flex-row-reverse items-center justify-center xs:flex-row">
                <button className="my-2 md:mx-2" onClick={addPendingFood}>
                  <MdOutlineAddCircle
                    className=" transition duration-500 hover:fill-black"
                    size={50}
                    color={"#FF9351"}
                  />
                </button>
                <button className="my-2 md:mx-2" onClick={cancelPendingFood}>
                  <MdOutlineCancel
                    className=" transition duration-500 hover:fill-black"
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
               my-4 w-11/12 border-b-2 border-custom-orange ` +
              (eatenFoodList.length
                ? "scale-x-100 transition duration-300"
                : "scale-x-0 transition duration-300")
            }
          ></div>

          <div className="rounded-2 dropshadow my-4 flex w-11/12 items-center justify-center">
            <div className="grid w-full grid-cols-2 items-center justify-center gap-2 xs:flex xs:flex-col">
              {eatenFood}
            </div>
          </div>

          {eatenFoodList.length !== 0 && (
            <div className="flex w-full items-center justify-center">
              <a href="#algorithm">
                <div
                  className="relative max-w-xs overflow-hidden rounded-2xl bg-cover  bg-no-repeat "
                  style={{ backgroundColor: "#DCF8FF" }}
                  onClick={enableAlgorithm}
                >
                  <button className="py-4 px-9 font-extrabold">Proceed</button>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition duration-300 ease-in-out hover:opacity-70"></div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
