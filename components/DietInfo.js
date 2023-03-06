import { useEffect, useState } from "react";

import { IoMdMale, IoMdFemale } from "react-icons/io";
import styles from "../styles/Home.module.css";

// Irrelevent Fcts
function capitalizeFirstLetter(string) {
  if (typeof string === 'string' || string instanceof String) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
  }
}

function sliceUnderscore(string) {
  if (typeof string === 'string' || string instanceof String) {
    const splitted = string.split("_");
    const capitalized = splitted.map((string) => capitalizeFirstLetter(string));
    return capitalized.join(" ");
  }
}

// ------------------------------------------------------------------------------------------

const DietInfo = ({ handleApply, isInfosApplied, flushInfos, localInfos }) => {

  const [stepper, setStepper] = useState([1, 1]);
  const [dietInfos, setDietInfos] = useState(localInfos);

  useEffect(()=>{
    if (localInfos) setDietInfos(localInfos);
  }, [localInfos])

  // ----------- Errors States ---------------------
  const [ageError, setAgeError] = useState(1);
  const [sexError, setSexError] = useState(1);
  const [heightError, setHeightError] = useState(1);
  const [weightError, setWeightError] = useState(1);
  const [activityError, setActivityError] = useState(1);
  const [planError, setPlanError] = useState(1);

  // Function
  const handleChange = (event) => {
    setDietInfos({ ...dietInfos, [event.target.name]: event.target.value });

    localStorage.setItem(
      "dietInfos",
      JSON.stringify({ ...dietInfos, [event.target.name]: event.target.value })
    );
  };

  const handleSex = (sex) => {
    setDietInfos({ ...dietInfos, sex: sex });

    localStorage.setItem(
      "dietInfos",
      JSON.stringify({ ...dietInfos, sex: sex })
    );
  };

  const resetInfos = () => {
    localStorage.removeItem("dietInfos");
    localStorage.removeItem("nutris");
    setDietInfos({
      age: "",
      sex: "",
      height: "",
      weight: "",
      activity: "",
      plan: ""
    });
    setAgeError(1);
    setSexError(1);
    setHeightError(1);
    setWeightError(1);
    setActivityError(1);
    setPlanError(1);
    flushInfos();
  };

  // ----------- Handeling Errors---------------------
  const CheckValidity = (data) => {
    const { age, sex, height, weight, activity, plan } = data;

    // Check Age
    if (age < 18 || age > 120) {
      setAgeError(1);
    } else {
      setAgeError(0);
    }
    // Check Sex
    if (sex !== "male" && sex !== "female") {
      setSexError(1);
    } else {
      setSexError(0);
    }
    // Check Height
    if (height < 80 || height > 300) {
      setHeightError(1);
    } else {
      setHeightError(0);
    }
    // Check Weight
    if (weight < 20 || weight > 220) {
      setWeightError(1);
    } else {
      setWeightError(0);
    }
    // Check Activity
    if (
      activity !== "sedentary" &&
      activity !== "lightly_active" &&
      activity !== "moderately_active" &&
      activity !== "very_active" &&
      activity !== "super_active"
    ) {
      setActivityError(1);
    } else {
      setActivityError(0);
    }
    // Check Plan
    if (
      plan !== "lose_weight" &&
      plan !== "maintain" &&
      plan !== "build_muscle"
    ) {
      setPlanError(1);
    } else {
      setPlanError(0);
    }
  };

  // ---------------------------------------------

  return (
    <div
      className={
        "w-full rounded-md outline-dotted outline-2 outline-custom-orange " +
        styles.dropshadow
      }
      style={{ height: "480px" }}
    >
      {/* -----------------------------------------stepper[0]---------------------------------------------- */}
      <div className="flex justify-center items-center h-10">
        <ol className="h-full flex justify-center items-center w-full p-3 space-x-2 text-sm text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:text-base sm:p-4 sm:space-x-4">
          <div
            className={
              "flex items-center justify-center cursor-pointer " +
              (stepper[0] === 1 ? "text-custom-orange animate-swipe relative" : "")
            }
          >
            <li
              className={
                "flex items-center cursor-pointer " +
                (stepper[0] === 1 ? "text-custom-orange animate-swipe" : "")
              }
              onClick={() => setStepper([1, stepper[0]])}
            >
              <span
                className={
                  "flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 " +
                  (stepper[0] === 1
                    ? "border-custom-orange"
                    : "border-gray-500")
                }
              >
                1
              </span>
              <span className="hidden sm:block">Age</span>
            </li>
            <div
              className={
                stepper[0] === 1 
                ? " w-8  " +
                  (stepper[1] !== 1 ? "animate-rswiper" : "") +
                  "  pb-1 bg-orange-400 absolute -bottom-2"
                : ""
              }
            ></div>
          </div>
          <svg
            aria-hidden="true"
            className="w-2 h-4 ml-2 sm:ml-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            ></path>
          </svg>
          <div
            className={
              "flex items-center cursor-pointer justify-center " +
              (stepper[0] === 2 ? "text-custom-orange relative" : "")
            }
          >
            <li
              className={
                "flex items-center cursor-pointer " +
                (stepper[0] === 2 ? "text-custom-orange" : "")
              }
              onClick={() => setStepper([2, stepper[0]])}
            >
              <span
                className={
                  "flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 " +
                  (stepper[0] === 2
                    ? "border-custom-orange"
                    : "border-gray-500")
                }
              >
                2
              </span>
              <span className="hidden sm:block">Sex</span>
            </li>
            <div
              className={
                stepper[0] === 2
                ? (stepper[1] < 2
                  ? " w-8 animate-lswipe pb-1 bg-orange-400 absolute -bottom-2"
                  : " w-8 " +
                    (stepper[1] !== 2 &&
                      " " + (stepper[1] !== 2 && "animate-rswiper") + " ") +
                    " pb-1 bg-orange-400 absolute -bottom-2")
                : ""
              }
            ></div>
          </div>
          <svg
            aria-hidden="true"
            className="w-2 h-4 ml-2 sm:ml-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            ></path>
          </svg>
          <li
            className={
              "flex items-center justify-center  cursor-pointer " +
              (stepper[0] === 3 ? "text-custom-orange relative" : "")
            }
            onClick={() => setStepper([3, stepper[0]])}
          >
            <span
              className={
                "flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 " +
                (stepper[0] === 3 ? "border-custom-orange" : "border-gray-500")
              }
            >
              3
            </span>
            <span className="hidden sm:block">Height</span>
            <div
              className={
                stepper[0] === 3 
                ? (stepper[1] < 3
                  ? " w-8 animate-lswipe pb-1 bg-orange-400 absolute -bottom-2"
                  : " w-8  " +
                    (stepper[1] !== 3 && "animate-rswiper") +
                    "  pb-1 bg-orange-400 absolute -bottom-2")
                : ""
              }
            ></div>
          </li>
          <svg
            aria-hidden="true"
            className="w-2 h-4 ml-2 sm:ml-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            ></path>
          </svg>
          <li
            className={
              "flex items-center cursor-pointer justify-center " +
              (stepper[0] === 4 ? "text-custom-orange relative" : "")
            }
            onClick={() => setStepper([4, stepper[0]])}
          >
            <span
              className={
                "flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 " +
                (stepper[0] === 4 ? "border-custom-orange" : "border-gray-500")
              }
            >
              4
            </span>
            <span className="hidden sm:block">Activity</span>
            <div
              className={
                stepper[0] === 4
                ? (stepper[1] < 4
                  ? "w-8 animate-lswipe pb-1 bg-orange-400 absolute -bottom-2"
                  : "w-8  " +
                    (stepper[1] !== 4 && "animate-rswiper") +
                    "  pb-1 bg-orange-400 absolute -bottom-2")
                : ""
              }
            ></div>
          </li>
          <svg
            aria-hidden="true"
            className="w-2 h-4 ml-2 sm:ml-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            ></path>
          </svg>
          <li
            onClick={() => {
              setStepper([5, stepper[0]]);
              CheckValidity(dietInfos);
            }}
            className={
              "flex items-center cursor-pointer justify-center " +
              (stepper[0] === 5 ? "text-custom-orange relative" : "")
            }
          >
            <span
              className={
                "flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 " +
                (stepper[0] === 5 ? "border-custom-orange" : "border-gray-500")
              }
            >
              5
            </span>
            <span className="hidden sm:block">Recap</span>
            <div
              className={
                stepper[0] === 5
                ? (stepper[1] < 5
                  ? " w-8 animate-lswipe pb-1 bg-orange-400 absolute -bottom-2"
                  : " w-8  " +
                    (stepper[1] !== 5 && "animate-rswiper") +
                    "  pb-1 bg-orange-400 absolute -bottom-2")
                : ""
              }
            ></div>
          </li>
        </ol>
      </div>

      {/* -----------------------------------------End stepper[0]---------------------------------------------- */}

      {/* Age Box  */}
      {stepper[0] === 1 && (
        <div 
          tabIndex={0} 
          onKeyDown={(e)=>{
            if (e.key === 'Enter') setStepper([2, stepper[0]])
          }} 
          className="flex flex-col justify-between items-center h-full"
        >
          <b className="font-logo text-3xl text-center my-12 h-full">
            How old are you?
          </b>
          <div className="flex flex-2 mb-6 justify-center h-full">
            <input
              type="number"
              id="large-input"
              name="age"
              value={dietInfos.age}
              onChange={handleChange}
              className="block max-w-xs w-3/4 xs:w-full p-4 text-gray-900 text-5xl xs:text-7xl text-center border border-custom-orange rounded-lg bg-white sm:text-md focus:ring-white focus:border-custom-orange"
              autoFocus
            />
          </div>
          <div className="flex justify-evenly items-end w-full my-12 h-full">
            <button className="invisible h-12 sm:mx-8 w-24 xs:w-40"></button>
            <button
              onClick={() => setStepper([2, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange bg-custom-orange text-white hover:border-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Sex Box  */}
      {stepper[0] === 2 && (
        <div 
          tabIndex={0} 
          onKeyDown={(e)=>{
            if (e.key === 'Enter') setStepper([3, stepper[0]])
          }} 
          className="flex flex-col justify-between items-center h-full"
        >
          <b className="flex-1 font-logo text-3xl text-center my-12 h-full">
            What&apos;s your sex?
          </b>

          <div className="flex flex-wrap items-center flex-2 h-full">
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  value={dietInfos.sex}
                  onChange={() => handleSex("male")}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="male"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Male</div>
                  </div>
                  <IoMdMale size={35} />
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  value={dietInfos.sex}
                  onChange={() => handleSex("female")}
                  className="hidden peer"
                />
                <label
                  htmlFor="female"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-pink-500 peer-checked:text-pink-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  <div className="block">
                    <div className="w-3/4 text-lg font-semibold">Female</div>
                  </div>
                  <IoMdFemale size={35} />
                </label>
              </li>
            </ul>
          </div>

          <div className="flex flex-1 justify-evenly items-end w-full my-12 h-full">
            <button
              onClick={() => setStepper([1, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange text-custom-orange  hover:border-gray-900"
            >
              Back
            </button>
            <button
              onClick={() => setStepper([3, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange bg-custom-orange text-white  hover:border-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Height & Weight Box  */}
      {stepper[0] === 3 && (
        <div 
          tabIndex={0} 
          onKeyDown={(e)=>{
            if (e.key === 'Enter') setStepper([4, stepper[0]])
          }} 
          className="flex flex-col justify-between items-center h-full"
        >
          <div className="flex flex-col justify-center items-centr flex-3 h-full">
            {/* Height Input */}
            <b className="font-logo text-2xl text-center my-4 ">Height</b>
            <div className="flex justify-center">
              <input
                type="number"
                id="large-input"
                name="height"
                value={dietInfos.height}
                onChange={handleChange}
                className="block max-w-xs w-3/4 xs:w-full p-4 text-gray-900 text-xl xs:text-3xl text-center border border-custom-orange rounded-lg bg-white sm:text-md focus:ring-white focus:border-custom-orange"
                autoFocus
              />
            </div>

            {/* Weight Input  */}
            <b className="font-logo text-2xl text-center my-4">Weight</b>
            <div className="flex justify-center">
              <input
                type="number"
                id="large-input"
                name="weight"
                value={dietInfos.weight}
                onChange={handleChange}
                className="block max-w-xs w-3/4 xs:w-full p-4 text-gray-900 text-xl xs:text-3xl text-center border border-custom-orange rounded-lg bg-white sm:text-md focus:ring-white focus:border-custom-orange"
              />
            </div>
          </div>
          <div className="flex flex-1 justify-evenly items-end w-full my-12 h-full">
            <button
              onClick={() => setStepper([2, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange text-custom-orange hover:border-gray-900"
            >
              Back
            </button>
            <button
              onClick={() => setStepper([4, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange bg-custom-orange text-white hover:border-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Activity Box  */}
      {stepper[0] === 4 && (
        <div 
          tabIndex={0} 
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
              setStepper([5, stepper[0]]);
              CheckValidity(dietInfos);
            }
          }} 
          className="flex flex-col justify-around items-center h-full"
        >
          <div className="flex-3 flex flex-col justify-between items-center h-full">

            {/* Activity */}
            <b className="font-logo text-2xl text-center my-6">
              How is your Activity?
            </b>
            <div className="relative h-12 w-60 sm:w-72 min-w-[200px]">
              <select
                name="activity"
                value={dietInfos.activity}
                onChange={handleChange}
                className="
                                peer 
                                h-full w-full
                                px-3 py-2.5 
                                rounded-lg border border-blue-gray-200 border-t-transparent outline outline-0 
                                bg-transparent 
                                font-sans font-normal text-blue-gray-700 text-sm 
                                transition-all 
                                placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 
                                empty:!bg-red-500 
                                focus:border-2 focus:border-custom-orange focus:border-t-transparent focus:outline-0 
                                disabled:border-0 disabled:bg-blue-gray-50
            ">
                <option value="none">-</option>
                <option value="sedentary">Sedentary</option>
                <option value="lightly_active">Lightly Active</option>
                <option value="moderately_active">Moderately Active</option>
                <option value="very_active">Very Active</option>
                <option value="super_active">Super Active</option>
              </select>
              <label
                className="
                                before:content[' '] after:content[' '] pointer-events-none absolute select-none 
                                left-0 -top-1.5 
                                flex h-full w-full 
                                text-[11px] font-normal text-blue-gray-400 leading-tight
                                transition-all 
                                before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all 
                                after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all 
                                peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent 
                                peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-custom-orange peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-custom-orange peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-custom-orange 
                                peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Select your Activity
              </label>
            </div>

            {/* Plan  */}
            <b className="font-logo text-2xl text-center my-6">
              What&apos;s your Plan?
            </b>
            <div className="relative h-16 w-60 sm:w-72 min-w-[200px]">
              <select
                name="plan"
                value={dietInfos.plan}
                onChange={handleChange}
                className="
                                peer 
                                h-full w-full
                                px-3 py-2.5 
                                rounded-lg border border-blue-gray-200 border-t-transparent outline outline-0 
                                bg-transparent 
                                font-sans font-normal text-blue-gray-700 text-sm 
                                transition-all 
                                placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 
                                empty:!bg-red-500 
                                focus:border-2 focus:border-custom-orange focus:border-t-transparent focus:outline-0 
                                disabled:border-0 disabled:bg-blue-gray-50
            ">
                <option value="none">-</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="maintain">Maintain</option>
                <option value="build_muscle">Build Muscle</option>
              </select>
              <label
                className="
                                before:content[' '] after:content[' '] pointer-events-none absolute select-none 
                                left-0 -top-1.5 
                                flex h-full w-full 
                                text-[11px] font-normal text-blue-gray-400 leading-tight
                                transition-all 
                                before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all 
                                after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all 
                                peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent 
                                peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-custom-orange peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-custom-orange peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-custom-orange 
                                peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Select your Plan
              </label>
            </div>
            
          </div>

          <div className="flex justify-evenly items-center w-full my-12">
            <button
              onClick={() => setStepper([3, stepper[0]])}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange text-custom-orange hover:border-gray-900"
            >
              Back
            </button>
            <button
              onClick={() => {
                setStepper([5, stepper[0]]);
                CheckValidity(dietInfos);
              }}
              className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange bg-custom-orange text-white hover:border-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Recap Box  */}
      {stepper[0] === 5 && (
        <div className="flex flex-col justify-between items-center h-full">
          <b className="font-logo text-3xl text-center my-6 z-10">Recap</b>

          <div
            className="flex-2 flex justify-center items-center"
            style={{ height: "204px" }}
          >
            <table className="w-full text-sm text-left text-gray-500">
              <tbody>
                <tr
                  className={
                    "bg-white border-b " +
                    (ageError && "animate-wiggle border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (ageError && "text-red-500 font-black")
                    }
                  >
                    Age
                  </th>
                  <td className="px-6 py-4 truncate">{dietInfos.age || "No Entry"}</td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([1, stepper[0]])}
                    >
                      Edit
                    </b>
                  </td>
                </tr>

                <tr
                  className={
                    "border-b bg-gray-50 " +
                    (sexError && "animate-wiggle border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (sexError && "text-red-500 font-black")
                    }
                  >
                    Sex
                  </th>
                  <td className="px-6 py-4 truncate">
                    {capitalizeFirstLetter(dietInfos.sex) || "No Entry"}
                  </td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([2, stepper[0]])}
                    >
                      Edit
                    </b>
                  </td>
                </tr>

                <tr
                  className={
                    "bg-white border-b " +
                    (heightError && "animate-wiggle border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (heightError && "text-red-500 font-black")
                    }
                  >
                    Height
                  </th>
                  <td className="px-6 py-4 truncate">
                    {dietInfos.height || "No Entry"}
                  </td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([3, stepper[0]])}
                    >
                      Edit
                    </b>
                  </td>
                </tr>

                <tr
                  className={
                    "border-b bg-gray-50 " +
                    (weightError && "animate-wiggle border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (weightError && "text-red-500 font-black")
                    }
                  >
                    Weight
                  </th>
                  <td className="px-6 py-4 truncate">
                    {dietInfos.weight || "No Entry"}
                  </td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([3, stepper[0]])}
                    >
                      Edit
                    </b>
                  </td>
                </tr>

                <tr
                  className={
                    "border-b bg-white " +
                    (activityError && "animate-wiggle border-b border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "text-center px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (activityError && "text-red-500 font-black")
                    }
                  >
                    Activity
                  </th>
                  <td className="px-6 py-4 truncate">{sliceUnderscore(dietInfos.activity) || "No Entry"}</td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([4, stepper[0]])} // Weird Problem when going from 5 to 4 in mobile !!
                    >
                      Edit
                    </b>
                  </td>
                </tr>
                
                <tr
                  className={
                    "bg-gray-50 " +
                    (planError && "animate-wiggle border-b border-red-500")
                  }
                >
                  <th
                    scope="row"
                    className={
                      "text-center px-6 py-4 text-gray-900 whitespace-nowrap " +
                      (planError && "text-red-500 font-black")
                    }
                  >
                    Plan
                  </th>
                  <td className="px-6 py-4 truncate">{sliceUnderscore(dietInfos.plan) || "No Entry"}</td>
                  <td className="px-6 py-4">
                    <b
                      className="font-medium text-custom-orange hover:underline cursor-pointer"
                      onClick={() => setStepper([4, stepper[0]])} // Weird Problem when going from 5 to 4 in mobile !!
                    >
                      Edit
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!isInfosApplied ? (
            <div className="flex justify-evenly items-center w-full my-12">
              <button
                onClick={() => setStepper([4, stepper[0]])}
                className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange text-custom-orange hover:border-gray-900"
              >
                Back
              </button>
              <a href="#DailyNutrients">
                <button
                  onClick={() => handleApply(dietInfos)}
                  className={
                    `
                          h-12 sm:mx-8 w-24 xs:w-40
                          font-bold font-logo text-2xl
                          border-2 border-custom-orange hover:border-gray-900
                          bg-custom-orange text-white
                          ` +
                    ((ageError ||
                      sexError ||
                      heightError ||
                      weightError ||
                      activityError ||
                      planError) &&
                      "cursor-not-allowed")
                  }
                  disabled={
                    ageError ||
                    sexError ||
                    heightError ||
                    weightError ||
                    activityError ||
                    planError
                  }
                >
                  Apply
                </button>
              </a>
            </div>
          ) : (
            <div className="flex justify-evenly items-center w-full my-12">
              <button
                onClick={resetInfos}
                className="h-12 sm:mx-8 w-24 xs:w-40 font-bold font-logo text-2xl border-2 border-custom-orange text-custom-orange hover:border-gray-900"
              >
                Reset
              </button>
              <a href="#DailyNutrients">
                <button
                  onClick={() => handleApply(dietInfos)}
                  className={
                    `h-12 sm:mx-8 w-32 truncate xs:w-48 font-bold font-logo text-2xl border-2 bg-custom-orange text-white hover:border-gray-900 ` +
                    ((ageError ||
                      sexError ||
                      heightError ||
                      weightError ||
                      activityError ||
                      planError) &&
                      "cursor-not-allowed")
                  }
                  disabled={
                    ageError ||
                    sexError ||
                    heightError ||
                    weightError ||
                    activityError ||
                    planError
                  }
                >
                  Re-Calculate
                </button>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DietInfo;
