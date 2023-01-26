import React from "react";

function decimalNumber (number) {
    return number.toString().split(".")[0]
}

const DailyNutrients = ({nutrients}) => {
  console.log(nutrients)
    const {kCalories, proteins, fats, carbs, fiber, sugar, salt} = nutrients;
  return (
    <div className="flex flex-col justify-center items-center | sm:col-start-2 col-span-8 sm:col-span-6 | mx-4">
      <h1 className="font-title text-5xl text-center | w-full my-16">
        Nutrients you need a Day
      </h1>
      <div className="flex flex-col justify-center items-center | w-full py-4 | bg-gradient-to-b from-white via-gradient2 to-gradient1">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-around items-center | h-36 w-32 | bg-custom-orange rounded my-8">
            <a href="https://imgbb.com/">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src="https://i.ibb.co/SV0pn7f/calories.png"
                alt="calories"
              />
            </a>
            <b className="font-bold text-2xl">Calories</b>
            <small className="font-bold text-2xl text-white">{decimalNumber(kCalories)} Kcal</small>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 | w-full | justify-items-center">
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/tpN0zCw/carbs.png"
                alt="carbs"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Carbs</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(carbs[0])+' - '+decimalNumber(carbs[1])} g</font-bold>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/F3Ljsys/proteins.png"
                alt="proteins"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Proteins</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(proteins[0])+' - '+decimalNumber(proteins[1])} g</font-bold>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/R7qRDJx/trans-fats-free.png"
                alt="Fats"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Fats</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(fats[0])+' - '+decimalNumber(fats[1])} g</font-bold>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/v4r03Nb/sugar.png"
                alt="Sugar"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Sugar</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(sugar)} g</font-bold>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/Br75fFj/salt.png"
                alt="Salt"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Salt</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(salt)} g</font-bold>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/frvhL9R/fiber.png"
                alt="Fiber"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Fiber</b>
            <font-bold className="text-2xl text-custom-orange">{decimalNumber(fiber)} g</font-bold>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyNutrients;
