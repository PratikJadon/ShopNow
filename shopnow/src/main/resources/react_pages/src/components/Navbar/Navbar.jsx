import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { DarkMode } from "./DarkMode";
import { LuLogOut } from "react-icons/lu";
import { cartContext } from "../Layout";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
];

const Navbar = () => {
  const { cartValue } = useContext(cartContext);
  function handleSubmit(e) {
    e.preventDefault();
    window.location.replace(
      `/products/${document.getElementById("search").value}`
    );
  }

  const contextType = cartContext;

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links Section */}

          <div className="flex gap-4 items-center">
            <a
              href="/"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              ShopNow
            </a>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                      href={data.link}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navbar Right Section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar Section */}
            <form onSubmit={handleSubmit}>
              <div className="relative group hidden sm:block">
                <input
                  id="search"
                  type="text"
                  placeholder="Search"
                  className="search-bar"
                />
                <IoMdSearch className="text-xl text-gray-600   group-hover:text-primary dark:text-gray-400  absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
              </div>
            </form>
            {/* Order-button section */}
            <button
              onClick={() => {
                window.location.href = "/cart";
              }}
              className="relative p-3"
            >
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {cartValue}
              </div>
            </button>
            {/* Dark Mode Section */}
            <div>{/* <DarkMode /> */}</div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.replace("/auth");
              }}
            >
              <LuLogOut className="text-xl font-bold text-black dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
