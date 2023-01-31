import Navbar from "../components/Navbar";
import isAuthenticated from "./api/Auth";
import getCookie from "next-cookies";
import { User_data } from "../context/context";
import { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
// import HowItsBuilt from "../components/HowItsBuilt";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";
export default function Home({ currentUser }) {
  const { user, setUser } = useContext(User_data);
  useEffect(() => {
    // currentUser === false && localStorage.removeItem("user");
    // localStorage.removeItem("dietInfos");
  }, []);
  return (
    <div>
      <Head>
        <title>NutriLab</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/yhHmPr0/orange-slice.png" />
      </Head>
      {/* <Register /> */}
      <Navbar User={user} />
      <div className="mx-auto w-full">
        <div className="flex justify-center items-center bg-gradient-to-b from-gradient1 via-gradient2 to-transparent">
          <div className="flex flex-1 flex-col justify-center items-center m-4 sm:m-12 lg:m-28 space-y-8">
            <h1 className="font-title text-7xl sm:text-8xl w-full mt-4">
              What do we do
            </h1>
            <div className="flex sm:hidden flex-1 justify-center items-center">
              <a href="https://ibb.co/xCyZnfh">
                <img
                  className="rounded-lg object-cover h-80 w-96"
                  src="https://i.ibb.co/QbZ0WC9/science1.jpg"
                  alt="science1"
                />
              </a>
            </div>
            <p className="text-md text-left font-paragraph indent-2">
              Proin id cursus sem. Suspendisse eu ligula a tellus euismod
              cursus. Donec ut neque lorem. Sed ac aliquam erat. Vestibulum
              neque magna, congue a volutpat at, porttitor at ligula. Donec ut
              neque lorem. Sed ac aliquam erat. Vestibulum neque magna, congue a
              volutpat at, porttitor at ligula.
            </p>
            <div className="flex justify-end items-center w-full">
              <Link href="/nutrients">
                <div
                  className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs  rounded-2xl "
                  style={{ backgroundColor: "#DCF8FF" }}
                >
                  <button className="py-4 px-9 font-extrabold">Start</button>
                  <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-70"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex flex-1 justify-center items-center my-28 mx-12">
            <a href="https://ibb.co/xCyZnfh">
              <img
                className="rounded-lg object-cover h-64 md:h-80 w-72 md:w-96"
                src="https://i.ibb.co/QbZ0WC9/science1.jpg"
                alt="science1"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-8 my-40">
          <div className="flex flex-col justify-center items-center | xm:col-start-2 col-span-8 xm:col-span-6 | space-y-8">
            <div
              className={
                "flex justify-center items-center h-80 max-w-6xl w-full rounded-2xl " +
                styles.dropshadow
              }
            >
              <div className="flex flex-1 flex-col justify-start item-start h-full mt-8">
                <b className="font-black text-4xl xs:text-5xl m-4">
                  Customized Nutrients
                </b>
                <p className="font-paragraph m-4">
                  Donec ut neque lorem. Sed ac aliquam erat. Vestibulum neque
                  magna, congue a volutpat at, porttitor at ligula.
                </p>
              </div>
              <div
                className={
                  "hidden xs:block rounded-tr-2xl rounded-br-2xl " +
                  styles.polygon1
                }
              ></div>
            </div>

            <div
              className={
                "flex justify-center items-center h-80 max-w-6xl w-full rounded-2xl " +
                styles.dropshadow
              }
            >
              <div
                className={
                  "hidden xs:block rounded-tl-2xl rounded-bl-2xl " +
                  styles.polygon2
                }
              ></div>
              <div className="flex flex-1 flex-col justify-start item-start h-full mt-8">
                <b className="font-black text-4xl xs:text-5xl m-4">
                  Food Generated
                </b>
                <p className="font-paragraph m-4">
                  Neque lorem. Sed ac aliquam erat. Vestibulum neque magna,
                  congue a
                </p>
              </div>
            </div>

            <div
              className={
                "flex justify-center items-center h-80 max-w-6xl w-full rounded-2xl " +
                styles.dropshadow
              }
            >
              <div className="flex flex-1 flex-col justify-start item-start h-full mt-8">
                <b className="font-black text-4xl xs:text-5xl m-4">
                  Suggested Meals
                </b>
                <p className="font-paragraph m-4">
                  Volutpat at, porttitor at ligula.
                </p>
              </div>
              <div
                className={
                  "hidden xs:block rounded-tr-2xl rounded-br-2xl " +
                  styles.polygon3
                }
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8">
          <div
            className={
              "flex flex-col justify-center items-center | md:col-start-2 col-span-8 md:col-span-6 | rounded-xl | " +
              styles.dropshadow
            }
          >
            <b className="text-4xl font-title text-center my-16">
              The Tools for Your Goals
            </b>
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="flex flex-1 flex-col justify-start items-center m-4 xm:m-8 xl:m-16 h-full">
                <a href="https://imgbb.com/">
                  <img
                    className="w-32 h-32 rounded-xl drop-shadow-md my-8"
                    src="https://i.ibb.co/0c2vhFr/nutrients.png"
                    alt="nutrients"
                  />
                </a>
                <p className="text-center font-paragraph max-w-xs">
                  Vestibulum neque magna, congue a volutpat at, porttitor at
                  ligula.
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-start items-center m-4 xm:m-8 xl:m-16 h-full">
                <a href="https://imgbb.com/">
                  <img
                    className="w-32 h-32 rounded-xl drop-shadow-md my-8"
                    src="https://i.ibb.co/pJKG4T7/balanced-diet.png"
                    alt="balanced-diet"
                  />
                </a>
                <p className="text-center font-paragraph max-w-xs">
                  Donec ut neque lorem. Sed ac aliquam erat. Vestibulum neque
                  magna, congue a volutpat at, porttitor at ligula. Donec ut
                  neque lorem
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-start items-center m-4 xm:m-8 xl:m-16 h-full">
                <a href="https://imgbb.com/">
                  <img
                    className="w-32 h-32 rounded-xl drop-shadow-md my-8"
                    src="https://i.ibb.co/s5dkt00/recommended-food.png"
                    alt="recommended-food"
                  />
                </a>
                <p className="text-center font-paragraph max-w-xs">
                  Donec ut neque lorem. Sed ac aliquam erat. Vestibulum neque
                  magna, congue a volutpat at, porttitor at ligula. Donec ut
                  neque lorem
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <HowItsBuilt /> */}

        <Footer />
      </div>
    </div>
  );
}
Home.getInitialProps = async (context) => {
  const { NutriLab } = getCookie(context);
  const user = isAuthenticated(NutriLab);
  if (!user) {
    return { currentUser: false };
  }

  return { currentUser: user };
};
