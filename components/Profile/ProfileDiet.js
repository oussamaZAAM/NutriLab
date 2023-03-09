import Head from "next/head";
import { useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";


const ProfileDiet = ({dietData, submitDiet, requestState, hideMessage}) => {
    const [dietInfos, setDietInfos] = useState({
      age: dietData.age,
      sex: dietData.sex,
      height: dietData.height,
      weight: dietData.weight,
      activity: dietData.activity,
      plan: dietData.plan
    });

    const [dietErrors, setDietErrors] = useState({
      age: "",
      sex: "",
      height: "",
      weight: "",
      activity: "",
      plan: ""
    });

    // Check on inputted numbers to not include 'e', '-', '+' and '.'
    const handleNumberChange = (e) => {
      const last = e.target.value.slice(-1);
      const rest = e.target.value.slice(0, -1);
      if (last === '0' || last === '1' || last === '2' || last === '3' || last === '4' || last === '5' || last === '6' || last === '7' || last === '8' ||  last === '9') {
        setDietInfos({...dietInfos, [e.target.name]: e.target.value});
      } else {
        setDietInfos({...dietInfos, [e.target.name]: rest});
      }
    }

    // Handle changes in the dietInfos state
    const handleSex = (sex) => {
      setDietInfos({ ...dietInfos, sex: sex });
    }

    const handleChange = (event) => {
      setDietInfos({ ...dietInfos, [event.target.name]: event.target.value });
    }

    const handleSubmit = async() => {
      setDietErrors((prev) => {
        var [age, sex, height, weight, activity, plan] = ["", "", "", "", "", ""];

        if (dietInfos.age < 18 || dietInfos.age > 120) age = "Age must be between 18 and 120!";
        if (dietInfos.height < 80 || dietInfos.height > 300) height = "Height must be between 80cm and 300cm!";
        if (dietInfos.weight < 20 || dietInfos.weight > 220) weight = "Weight must be between 20kg and 220kg!";
        if (dietInfos.activity === 'none') activity = "Please choose an Activity!";
        if (dietInfos.plan === 'none') plan = "Please choose a Plan!";

        return { age, sex, height, weight, activity, plan }
      })
      if ((dietInfos.age < 18 || dietInfos.age > 120) 
       || (dietInfos.height < 80 || dietInfos.height > 300)
       || (dietInfos.weight < 20 || dietInfos.weight > 220)
       || (dietInfos.activity === 'none')
       || (dietInfos.plan === 'none')) {
        void(0);
       } else {
        submitDiet(dietInfos);
        hideMessage();
       }
    }
  return (
    <>
      <Head>
        <title>NutriLab - Profile Diet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>

      <>
        {/* Age  */}
        <div id="dietInformations" className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <input
            id="age"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-custom-orange focus:outline-none focus:ring-0 focus:border-custom-orange peer"
            placeholder=" "
            name='age'
            value={dietInfos.age}
            onChange={handleNumberChange} 
          />
          <label
            htmlFor="age"
            className="absolute hover:cursor-text text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-profile2 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-orange peer-focus:dark:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Age
          </label>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.age}</p>

        {/* Sex  */}
        <div className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <ul className="flex lg:flex-row justify-center items-center">
            <li className="max-w-28 lg:max-w-32 w-full mr-2 ">
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
                className={`
                              inline-flex items-center justify-evenly w-full py-5 px-2 
                              text-gray-500 bg-white hover:bg-gray-100
                              border-gray-200 
                              rounded-lg 
                              group
                              cursor-pointer `+
                          (dietInfos.sex === 'male' && 'border-2 border-blue-500')}
              >
                <IoMdMale size={35} className={`w-1/3 `+(dietInfos.sex === 'male' && 'fill-blue-500 group-hover:fill-blue-600')} />
                <div className={`block `+(dietInfos.sex === 'male' && 'text-blue-500 group-hover:text-blue-600')}>
                  <div className="w-2/3 text-lg font-semibold">Male</div>
                </div>
              </label>
            </li>
            <li className="max-w-28 lg:max-w-32 w-full ml-2 ">
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
                className={`
                              inline-flex items-center justify-evenly w-full py-5 px-2 
                              text-gray-500 bg-white hover:bg-gray-100
                              border-gray-200 
                              rounded-lg 
                              group
                              cursor-pointer `+
                          (dietInfos.sex === 'female' && 'border-2 border-pink-500')}
              >
                <IoMdFemale size={35} className={`w-1/3 `+(dietInfos.sex === 'female' && 'fill-pink-500 group-hover:fill-pink-600')} />
                <div className={`block `+(dietInfos.sex === 'female' && 'text-pink-500 group-hover:text-pink-600')}>
                  <div className="w-2/3 text-lg font-semibold">Female</div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.sex}</p>

        {/* Height  */}
        <div className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <input
            id="height"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-custom-orange focus:outline-none focus:ring-0 focus:border-custom-orange peer"
            placeholder=" "
            name='height'
            value={dietInfos.height}
            onChange={handleNumberChange}
          />
          <label
            htmlFor="height"
            className="absolute hover:cursor-text text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-profile2 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-orange peer-focus:dark:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Height
          </label>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.height}</p>

        {/* Weight  */}
        <div className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <input
            id="weight"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-custom-orange focus:outline-none focus:ring-0 focus:border-custom-orange peer"
            placeholder=" "
            name='weight'
            value={dietInfos.weight}
            onChange={handleNumberChange}
          />
          <label
            htmlFor="weight"
            className="absolute hover:cursor-text text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-profile2 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-orange peer-focus:dark:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Weight
          </label>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.weight}</p>

        {/* Activity  */}
        <div className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <select
            id="activity"
            name="activity"
            value={dietInfos.activity}
            onChange={handleChange}
            className="
                        peer 
                        hover:cursor-pointer 
                        px-2.5 pb-2.5 pt-4 w-full 
                        text-sm text-white 
                        bg-transparent rounded-lg border-2 border-gray-300 
                        appearance-none 
                        dark:text-white dark:border-gray-600 dark:focus:border-custom-orange 
                        focus:outline-none focus:ring-0 focus:border-custom-orange
                      "
          >
            <option className="text-black" value="none" selected>
              -
            </option>
            <option className="text-black" value="sedentary">
              Sedentary
            </option>
            <option className="text-black" value="lightly_active">
              Lightly Active
            </option>
            <option className="text-black" value="moderately_active">
              Moderately Active
            </option>
            <option className="text-black" value="very_active">
              Very Active
            </option>
            <option className="text-black" value="super_active">
              Super Active
            </option>
          </select>
          <label
            htmlFor="activity"
            className="
                        absolute top-2 left-1 z-10
                        text-sm text-white dark:text-gray-400 
                        duration-300 transform -translate-y-4 scale-75 origin-[0]
                        bg-profile2 dark:bg-gray-900 px-2 
                        peer-focus:text-custom-orange
                        peer-focus:px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                      "
          >
            Activity
          </label>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.activity}</p>

        {/* Plan  */}
        <div className="w-full lg:w-2/3 mt-2 mb-1 relative">
          <select
            id="plan"
            name="plan"
            value={dietInfos.plan}
            onChange={handleChange}
            className="
                                            peer
                                            hover:cursor-pointer 
                                            px-2.5 pb-2.5 pt-4 w-full 
                                            text-sm text-white 
                                            bg-transparent rounded-lg border-2 border-gray-300 
                                            appearance-none 
                                            dark:text-white dark:border-gray-600 dark:focus:border-custom-orange 
                                            focus:outline-none focus:ring-0 focus:border-custom-orange peer
                                        "
          >
            <option className="text-black" value="none" selected>
              -
            </option>
            <option className="text-black" value="lose_weight">
              Lose Weight
            </option>
            <option className="text-black" value="maintain">
              Maintain
            </option>
            <option className="text-black" value="build_muscle">
              Build Muscle
            </option>
          </select>
          <label
            htmlFor="plan"
            className="
                                              absolute top-2 left-1 z-10
                                              text-sm text-white dark:text-gray-400
                                              duration-300 transform -translate-y-4 scale-75 origin-[0]
                                              bg-profile2 dark:bg-gray-900 px-2
                                              peer-focus:px-2 peer-focus:text-custom-orange peer-focus:dark:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
                                            "
          >
            Plan
          </label>
        </div>
        <p className="text-xs text-red-600 w-full lg:w-2/3 text-left">{dietErrors.plan}</p>

        {requestState[0] === 0
        && <div className="w-full md:w-2/3 flex items-center max-w-xs p-4 mt-3 text-gray-500 bg-red-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
            <div className="ml-3 text-sm font-normal text-black">{requestState[1]}</div>
        </div>}
        {requestState[0] === 1
        && <div className="w-full md:w-2/3 flex items-center max-w-xs p-4 mt-3 text-gray-500 bg-green-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
            <div className="ml-3 text-sm font-normal text-black">{requestState[1]}</div>
        </div>}

        {/* Submit Button  */}
        <div className="w-full md:w-2/3 my-4">
        <button
            onClick={handleSubmit}
            type="button"
            className={`
                        mr-2 mb-2 rounded-lg border-2 border-[#4B4B4B] 
                        bg-custom-orange px-5 py-2.5 
                        text-sm font-medium text-[#4B4B4B] transition 
                        hover:border-gray-800 hover:text-gray-800 
                        focus:bg-gradient1 focus:border-black focus:text-black
                        dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 `}
          >
            Edit
          </button>
        </div>
      </>
    </>
  );
}

export default ProfileDiet