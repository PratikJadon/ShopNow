import React from "react";

function AdminDashboard() {
  window.location.replace("http://127.0.0.1:5500/adminDashboard.html");
  return (
    <div className="h-full bg-gradient-to-br from-gray-800 to-gray-400/40">
      <div className="h-full flex justify-center items-center">
        <div className=" flex flex-col items-center bg-white h-[80%] w-[40%] rounded-lg shadow-lg p-4 px-6">
          <div className="w-full flex gap-10">
            <p className="text-xl py-2">Product Title</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              id="title"
              placeholder="Product Title"
            />
          </div>
          <div>
            <p className="text-xl py-2">Product Image Url</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              id="photos"
              placeholder="Product Image Url"
            />
          </div>
          <div>
            <p className="text-xl py-2">Product Price</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              id="price"
              type="number"
              placeholder="Product Image Url"
            />
          </div>
          <div>
            <p className="text-xl py-2">Product Quantity</p>
            <input
              className="p-2 rounded-lg bg-gray-100"
              id="quantity"
              type="number"
              placeholder="Product Image Url"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
