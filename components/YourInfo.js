import { RiEditFill } from "react-icons/ri";
import Link from "next/link";

export default function YourInfo({ localInfos, localNutris }) {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function sliceUnderscore(string) {
    const splitted = string.split("_");
    const capitalized = splitted.map((string) => capitalizeFirstLetter(string));
    return capitalized.join(" ");
  }
  return (
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
                  {(localInfos.sex && capitalizeFirstLetter(localInfos.sex)) ||
                    "No Entry"}
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
                  {(localInfos.activity &&
                    sliceUnderscore(localInfos.activity)) ||
                    "No Entry"}
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
                  {(localInfos.plan && sliceUnderscore(localInfos.plan)) ||
                    "No Entry"}
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
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3 text-white bg-gray-700">
                  Calories
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-800">
                  Proteins
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-700">
                  Carbs
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-800">
                  Fats
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-700">
                  Fiber
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-800">
                  Salt
                </th>
                <th scope="col" className="px-6 py-3 text-white bg-gray-700">
                  Sugar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                  {localNutris.kCalories} kCal
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {localNutris.proteins} g
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                  {localNutris.carbs} g
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {localNutris.fats} g
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
                  {localNutris.fiber} g
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {localNutris.salt} g
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100">
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
  );
}
