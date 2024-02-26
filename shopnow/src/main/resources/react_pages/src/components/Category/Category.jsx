import React from "react";
import Image1 from "../../assets/top_banner/clothModel.png";
import Image2 from "../../assets/top_banner/phone_banner.png";
import Image3 from "../../assets/category/macbook.png";
import Image4 from "../../assets/top_banner/sofa.png";
import Image5 from "../../assets/top_banner/gymModel.png";
import Image6 from "../../assets/top_banner/watch.png";
import Button from "../Shared/Button";

function Category() {
  function handleClick(e, categ) {
    window.location.href = "/products?category=" + categ;
  }
  return (
    <div>
      <div className="py-8">
        <h1 className="container font-semibold text-4xl text-center">
          Top Categories
        </h1>
        <hr className="container border-gray-400 border-y-1 my-2 " />
        <div className="container">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              onClick={(e) => handleClick(e, "clothes")}
              class="py-10 overflow-hidden pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-gray-400">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="z-50 text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    Clothes
                  </p>
                  <button class="bg-primary text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">
                    Browse
                  </button>
                </div>
              </div>
              <img
                src={Image1}
                alt=""
                class="w-[220px] scale-110 absolute -bottom-12 -right-5 top-4"
              />
            </div>
            <div
              onClick={(e) => handleClick(e, "mobile")}
              class="py-10 pl-5 bg-gradient-to-br from-orange-400 to-orange-400/40 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-white">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    Mobile
                  </p>
                  <Button
                    text={"Browse"}
                    bgColor={"bg-white"}
                    textColor={"text-brandYellow"}
                  />
                </div>
              </div>
              <img
                src={Image2}
                alt=""
                class="w-[320px] top-[10px] absolute -right-10 lg:top-[5px] "
              />
            </div>
            <div
              onClick={(e) => handleClick(e, "laptop")}
              class="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-white">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    Laptop
                  </p>
                  <button class="bg-white text-primary cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">
                    Browse
                  </button>
                </div>
              </div>
              <img
                src={Image3}
                alt=""
                class="w-[250px] absolute top-1/2 -translate-y-1/2 -right-0"
              />
            </div>
            <div
              onClick={(e) => handleClick(e, "furniture")}
              class="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-blue-800 to-blue-500/40 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-white">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    Furniture
                  </p>
                  <button class="bg-white text-primary cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">
                    Browse
                  </button>
                </div>
              </div>
              <img
                src={Image4}
                alt=""
                class="w-[250px] absolute top-1/2 -translate-y-1/2 right-10 rotate-6 "
              />
            </div>
            <div
              onClick={(e) => handleClick(e, "gym")}
              class="py-10 pl-5 bg-gradient-to-br from-black to-black/60 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-white">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    GYM
                  </p>
                  <Button
                    text={"Browse"}
                    bgColor={"bg-white"}
                    textColor={"text-brandYellow"}
                  />
                </div>
              </div>
              <img
                src={Image5}
                alt=""
                class="w-[200px] absolute -right-10 -top-4"
              />
            </div>
            <div
              onClick={(e) => handleClick(e, "watches")}
              class="py-10 pl-5 bg-gradient-to-br from-yellow-400 to-yellow-400/60 text-white rounded-3xl relative h-[320px] flex items-end"
            >
              <div>
                <div class="mb-4">
                  <p class="mb-[2px] text-white">Enjoy</p>
                  <p class="text-2xl font-semibold mb-[2px]">With</p>
                  <p class="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                    WATCHES
                  </p>
                  <Button
                    text={"Browse"}
                    bgColor={"bg-white"}
                    textColor={"text-brandYellow"}
                  />
                </div>
              </div>
              <img src={Image6} alt="" class="w-[220px] absolute -right-6 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
