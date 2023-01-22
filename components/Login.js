import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs";
export default function Login({ setLogin }) {
  return (
    <div className="">
      <div className="px-8 py-6 text-left bg-white shadow-lg ">
        <div className="flex justify-around">
          <button>
            <BsGoogle size="3rem" color="blue" />
          </button>
          <button>
            <BsFacebook size="3rem" color="blue" />
          </button>
          <button>
            <BsTwitter size="3rem" color="blue" />
          </button>
        </div>
        <div className="bg-blue-600 w-full h-1 mt-7 mb-3"></div>
        <h3 className="text-2xl font-bold text-center">Welcome back!</h3>
        <form action="">
          <div className="mt-4">
            <div className="flex flex-row">
              <div className=" basis-1/4 flex items-center">
                <label className="text-center" htmlFor="Name">
                  Name
                </label>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="basis-3/4 w-max px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4 flex flex-row">
              <div className=" basis-1/4 flex items-center">
                <label className=" text-center">Password</label>
              </div>
              <input
                type="password"
                placeholder="Password"
                className=" basis-3/4 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* <span className="text-xs text-red-400">
                Password must be same!
              </span> */}
            <div className="flex">
              <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Login to Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Don't have an account?
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setLogin(false)}
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Navbar />
      <Hero />
      <PickOne reload={() => router.push("/Loading")} ayoub="ayoub" />
      <Footer /> */}
    </div>
  );
}
