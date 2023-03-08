import Image from "next/image";
import Link from "next/link";

function decimalNumber(number) {
  return number.toString().split(".")[0] || number;
}

const DailyNutrients = ({ nutrients, vitamins }) => {
  const { kCalories, proteins, fats, carbs, fiber, sugar, salt } = nutrients;

  return (
    <div
      id="DailyNutrients"
      className="| | col-span-8 mx-4 flex flex-col items-center justify-center sm:col-span-6 sm:col-start-2"
    >
      <h1 className="| my-16 w-full text-center font-title text-5xl">
        Nutrients you need a Day
      </h1>
      <div className="| | flex w-full flex-col items-center justify-center bg-gradient-to-b from-white via-gradient2 to-gradient1 py-4">
        <div className="flex items-center justify-center">
          <div className="| | my-8 flex h-36 w-32 flex-col items-center justify-around rounded bg-custom-orange">
            <a href="https://imgbb.com/">
              <Image
                width={100}
                height={100}
                className="h-16 w-16 rounded-full object-cover"
                src="https://i.ibb.co/SV0pn7f/calories.png"
                alt="calories"
              />
            </a>
            <b className="text-2xl font-bold">Calories</b>
            <small className="text-2xl font-bold text-white">
              {decimalNumber(kCalories)} Kcal
            </small>
          </div>
        </div>
        <div className="| | grid w-full grid-cols-2 justify-items-center sm:grid-cols-3">
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/tpN0zCw/carbs.png"
                alt="carbs"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Carbs</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(carbs)} g
            </p>
          </div>
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/F3Ljsys/proteins.png"
                alt="proteins"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Proteins</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(proteins)} g
            </p>
          </div>
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/R7qRDJx/trans-fats-free.png"
                alt="Fats"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Fats</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(fats)} g
            </p>
          </div>
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/v4r03Nb/sugar.png"
                alt="Sugar"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Sugar</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(sugar)} g
            </p>
          </div>
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/Br75fFj/salt.png"
                alt="Salt"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Salt</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(salt)} g
            </p>
          </div>
          <div className="| | my-3 flex h-24 w-20 flex-col items-center justify-around rounded bg-white md:h-36 md:w-32">
            <a href="https://ibb.co/ZzwQSTR">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
                src="https://i.ibb.co/frvhL9R/fiber.png"
                alt="Fiber"
              />
            </a>
            <b className="text-lg font-bold md:text-2xl">Fiber</b>
            <p className="text-xs font-bold text-custom-orange md:text-xl">
              {decimalNumber(fiber)} g
            </p>
          </div>
        </div>
      </div>
      <Link href="/foodProcess">
        <div
          className="relative mt-6 max-w-xs overflow-hidden rounded-2xl  bg-cover bg-no-repeat "
          style={{ backgroundColor: "#DCF8FF" }}
        >
          <button className="py-4 px-9 font-extrabold">
            What Should I Eat?
          </button>
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition duration-300 ease-in-out hover:opacity-70"></div>
        </div>
      </Link>
    </div>
  );
};

export default DailyNutrients;
