import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";

const foodInfos = ({ foodData }) => {
  return (
    <div>
      <Head>
        <title>NutriLab - {foodData.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>
      <div className="flex flex-col">
        <div className="m-12">
          <Link href='/food'>
              <div className="
                                flex justify-start items-center max-w-min py-2 px-8
                                border-2 rounded-3xl border-custom-orange
                                space-x-2
                                hover:bg-custom-orange hover:cursor-pointer
                            ">
                  <MdArrowBack className="w-5 h-5"/>
                  <span className="font-bold font-logo">Back</span>
              </div>
          </Link>
        </div>
        <div className="grid grid-cols-12 w-full">
          <div className="flex flex-col col-span-12 xs:col-start-3 xs:col-span-8 sm:col-start-4 sm:col-span-6 xl:col-start-5 xl:col-span-4">
            <div className="flex flex-col justify-center items-center mt- rounded-xl bg-custom-orange">
              <h1 className="text-center text-3xl text-black font-medium font-title m-4">
                {foodData.name}
              </h1>
            </div>
            <div className="my-6 border-b-2 border-black"></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="border-b text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Calories
                  </th>
                  <th scope="col" className="px-6 py-3 text-lg font-black">
                  {foodData.Calories}
                  </th>
                </tr>
              </thead>
              <tbody>
                
                <tr className="bg-white border-b text-black dark:text-white dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Protein
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Protein}</td>
                </tr>

                <tr className="border-b bg-gray-50 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Fat
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Fat}</td>
                </tr>

                <tr className="bg-white border-b text-black dark:text-white dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Carbs
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Carbs}</td>
                </tr>

                <tr className="border-b bg-gray-50 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Fiber
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Fiber}</td>
                </tr>

                <tr className="bg-white border-b text-black dark:text-white dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Sugar
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Sugar}</td>
                </tr>

                <tr className="bg-gray-50 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    Salt
                  </th>
                  <td className="px-6 py-4 font-semibold">{foodData.Salt}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default foodInfos;

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.SERVER}/api/food/${context.params.id}`
  );
  const foodData = await res.json();

  return {
    props: {
      foodData,
    },
  };
};
