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
                    col-span-8 my-16 flex w-full
                    flex-col items-center justify-center
                    rounded border-2 border-custom-orange
                    sm:col-span-6 sm:col-start-2"
    >
      <h3 className="| my-16 w-full text-center font-title text-3xl xs:text-4xl sm:text-5xl">
        Check Your Informations
      </h3>
      <div className="flex items-center justify-between">
        <h4 className="| w-full text-center font-title text-2xl xs:text-3xl sm:text-4xl">
          Your Input Infos
        </h4>
        <Link href="/nutrients">
          <RiEditFill
            size={25}
            className="ml-2 transition duration-300 hover:fill-custom-orange"
          />
        </Link>
      </div>
      {localInfos ? (
        <div className="flex-2 my-4 flex items-center justify-center rounded border">
          <table className="w-full text-left text-sm text-gray-500">
            <tbody>
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-gray-900"
                >
                  Age
                </th>
                <td className="truncate px-6 py-4">
                  {localInfos.age || "No Entry"}
                </td>
              </tr>

              <tr className="border-b bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-gray-900"
                >
                  Sex
                </th>
                <td className="truncate px-6 py-4">
                  {(localInfos.sex && capitalizeFirstLetter(localInfos.sex)) ||
                    "No Entry"}
                </td>
              </tr>

              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-gray-900"
                >
                  Height
                </th>
                <td className="truncate px-6 py-4">
                  {localInfos.height || "No Entry"}
                </td>
              </tr>

              <tr className="border-b bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-gray-900"
                >
                  Weight
                </th>
                <td className="truncate px-6 py-4">
                  {localInfos.weight || "No Entry"}
                </td>
              </tr>

              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-900"
                >
                  Activity
                </th>
                <td className="truncate px-6 py-4">
                  {(localInfos.activity &&
                    sliceUnderscore(localInfos.activity)) ||
                    "No Entry"}
                </td>
              </tr>

              <tr className="bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-center text-gray-900"
                >
                  Plan
                </th>
                <td className="truncate px-6 py-4">
                  {(localInfos.plan && sliceUnderscore(localInfos.plan)) ||
                    "No Entry"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-8 flex items-center justify-center rounded border">
          <span>
            <b className="font-paragraph text-sm font-medium">
              It seems you have yet to tell us about you,{" "}
            </b>
            <Link href="/nutrients">
              <b className="font-paragraph text-sm font-black transition duration-300 hover:text-custom-orange hover:underline">
                click here
              </b>
            </Link>
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h4 className="| w-full text-center font-title text-2xl xs:text-3xl sm:text-4xl">
          Your generated Infos
        </h4>
        <Link href="/nutrients">
          <RiEditFill
            size={25}
            className="ml-2 transition duration-300 hover:fill-custom-orange"
          />
        </Link>
      </div>

      {localNutris ? (
        <div className="no-scrollwbar my-8 flex w-11/12 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="bg-gray-700 px-6 py-3 text-white">
                  Calories
                </th>
                <th scope="col" className="bg-gray-800 px-6 py-3 text-white">
                  Proteins
                </th>
                <th scope="col" className="bg-gray-700 px-6 py-3 text-white">
                  Carbs
                </th>
                <th scope="col" className="bg-gray-800 px-6 py-3 text-white">
                  Fats
                </th>
                <th scope="col" className="bg-gray-700 px-6 py-3 text-white">
                  Fiber
                </th>
                <th scope="col" className="bg-gray-800 px-6 py-3 text-white">
                  Salt
                </th>
                <th scope="col" className="bg-gray-700 px-6 py-3 text-white">
                  Sugar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:border-gray-700 border-b border-gray-200">
                <td className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                  {localNutris.kCalories} kCal
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {localNutris.proteins} g
                </td>
                <td className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                  {localNutris.carbs} g
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {localNutris.fats} g
                </td>
                <td className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                  {localNutris.fiber} g
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {localNutris.salt} g
                </td>
                <td className="whitespace-nowrap bg-gray-100 px-6 py-4 font-medium text-gray-900">
                  {localNutris.sugar} g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-8 flex items-center justify-center rounded border">
          <span>
            <b className="font-paragraph text-sm font-medium">
              You haven't yet generated your daily nutrients ,{" "}
            </b>
            <Link href="/nutrients">
              <b className="font-paragraph text-sm font-black transition duration-300 hover:text-custom-orange hover:underline">
                click to apply your infos
              </b>
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
