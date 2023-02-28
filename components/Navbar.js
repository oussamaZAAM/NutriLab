import { Fragment, useRef, useState, useEffect, useContext } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { User_data } from "../context/context";

// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "How it works", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
  { name: "Team", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ User }) {
  const { user, setUser } = useContext(User_data);

  const { data: session } = useSession();

  const [open1, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  useEffect(() => {
    // Perform localStorage action
    async function handleUser() {
      await axios
        .get("/api/user")
        .then((user) => setUser(user.data))
        .catch((err) => setUser(undefined));
    }
    handleUser();
  }, []);
  const cancelButtonRef = useRef(null);
  const handleLogout = async (e) => {
    session && signOut();
    user &&
      (await axios
        .get("/api/logout")
        .then(async (response) => {
          setUser(undefined);
        })
        .catch((error) => {
          alert(error);
        }));
    setLogin(true);
  };
  return (
    <div className="grid grid-cols-8 border-b-4 border-custom-orange">
      <Disclosure
        as="nav"
        className="col-start-0 lg:col-start-2 col-span-8 lg:col-span-6 bg-white"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black bg-white hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-start ml-10 sm:items-stretch sm:justify-between sm:ml-0">
                  <Link href="/">
                    <div className="flex flex-shrink-0 items-center rounded-full px-3 py-1 bg-custom-orange">
                      <Image
                        width={1000}
                        height={1000}
                        className="block h-8 w-auto p-1"
                        src="https://i.ibb.co/Z8KdKVg/orange-slice-1.png"
                        alt="logo"
                      />
                      <h1 className="font-bold text-white">NutriLab</h1>
                    </div>
                  </Link>
                  <div className="justify-center items-center hidden sm:ml-6 sm:flex">
                    <div className="flex justify-center items-center space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-black hover:bg-gray-700 hover:text-white hover:scale-x-110 duration-200",
                            "px-3 py-2 rounded-md text-sm font-medium truncate"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  {/* <button onClick={() => (session ? signOut() : signIn())}> */}
                  {!(session || user) && (
                    <button onClick={() => setOpen(true)}>
                      <p className="text-black hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Login
                      </p>
                    </button>
                  )}
                  {!user && (
                    <Transition.Root show={open1} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={() => {
                          setOpen();
                          setTimeout(() => {
                            setLogin(true);
                          }, 200);
                        }}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-0 sm:-translate-y-60 sm:translate-x-60 sm:scale-50"
                              enterTo="opacity-100 translate-y-0 sm:translate-x-0 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {login ? (
                                  <div>
                                    <Login
                                      setLogin={setLogin}
                                      setAuth={setUser}
                                      setOpen={setOpen}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <Register
                                      setLogin={setLogin}
                                      setAuth={setUser}
                                      setOpen={setOpen}
                                    />
                                  </div>
                                )}
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  )}
                  {/* Profile dropdown */}
                  {(session || user) && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={50}
                            height={50}
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:rounded-md"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:rounded-md"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="flex justify-center w-full">
                            <div className="border-b border-gray-300 w-11/12"></div>
                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:text-red-500 cursor-pointer hover:rounded-md hover:bg-red-100"
                                )}
                                onClick={handleLogout}
                              >
                                Log out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
