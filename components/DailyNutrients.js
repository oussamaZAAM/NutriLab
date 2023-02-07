import Image from "next/image";
import Link from "next/link";

function decimalNumber (number) {
    return number.toString().split(".")[0] || number
}

const DailyNutrients = ({nutrients, vitamins}) => {
  
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
                fill
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
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/tpN0zCw/carbs.png"
                alt="carbs"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Carbs</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(carbs)} g</p>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/F3Ljsys/proteins.png"
                alt="proteins"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Proteins</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(proteins)} g</p>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/R7qRDJx/trans-fats-free.png"
                alt="Fats"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Fats</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(fats)} g</p>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/v4r03Nb/sugar.png"
                alt="Sugar"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Sugar</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(sugar)} g</p>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/Br75fFj/salt.png"
                alt="Salt"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Salt</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(salt)} g</p>
          </div>
          <div className="flex flex-col justify-around items-center | h-24 md:h-36 w-20 md:w-32 my-3 | bg-white rounded">
            <a href="https://ibb.co/ZzwQSTR">
              <img
                fill
                className="h-12 md:h-16 w-12 md:w-16 object-cover rounded-full"
                src="https://i.ibb.co/frvhL9R/fiber.png"
                alt="Fiber"
              />
            </a>
            <b className="font-bold text-lg md:text-2xl">Fiber</b>
            <p className="font-bold text-xs md:text-xl text-custom-orange">{decimalNumber(fiber)} g</p>
          </div>
        </div>
      </div>
      <Link href="/food">
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs  rounded-2xl mt-6 "
          style={{ backgroundColor: "#DCF8FF" }}
        >
          <button className="py-4 px-9 font-extrabold">What Should I Eat?</button>
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-70"></div>
        </div>
      </Link>
    </div>
  );
};

export default DailyNutrients;
