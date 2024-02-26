import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { queryBuild } from "../Utils.js";
import Rating from "@mui/material/Rating";
import Button from "../Shared/Button.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScaleLoader } from "react-spinners";
import { cartContext } from "../Layout.jsx";

const notifyError = (message) => {
  toast.error(message);
};

const notifySuccess = (message) => {
  toast.success(message);
};
function Products() {
  const { cartValue, setCartValue } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [valueSort, setSortValue] = useState(0);
  const [valueGender, setGenderValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const genderCateg = ["clothes", "watches", "accessories"];
  const [filter, setFilter] = useState({
    gender: null,
    category: null,
    sort: "asc",
  });

  const handleSortChange = (event, newValue) => {
    setSortValue(newValue);
    if (newValue == 0) setFilter({ ...filter, sort: "asc" });
    else setFilter({ ...filter, sort: "desc" });
  };

  const handleGenderChange = (event, newValue) => {
    setGenderValue(newValue);
    if (newValue == 0) setFilter({ ...filter, gender: "male" });
    else setFilter({ ...filter, gender: "female" });
  };

  function handleGender(event) {
    setFilter({ ...filter, gender: event.target.value });
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const baseUrl = "http://localhost:8080/api/products";
  const param = useParams();

  const location = useLocation();
  const querys = new URLSearchParams(location.search);

  useEffect(() => {
    const queryParams = {
      searchKey: param.searchTerm,
      gender: filter.gender,
      category: querys.get("category"),
      sortPrice: filter.sort,
    };
    const apiUrl = baseUrl + queryBuild(queryParams);
    console.log(apiUrl);

    async function fetchData() {
      setLoading((loading) => !loading);
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoading((loading) => !loading);
      setProducts(data);
    }

    fetchData();
  }, [filter]);

  async function handleAddtoCart(event, prodid) {
    const token = localStorage.getItem("token");
    setLoading((loading) => !loading);
    const response = await fetch(
      `http://localhost:8080/api/products/addcart?productId=${prodid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading((loading) => !loading);
    if (response.status == 401) {
      notifyError("You are not logged in.");
      setTimeout(() => {
        window.location.replace("/auth");
      }, 2000);
      return;
    }
    const data = await response.json();
    setCartValue(data.CartSize);
    if (!data.Success) notifyError(data.Message);
    else notifySuccess(data.Message);
  }

  return (
    <div className="h-full">
      <ScaleLoader
        className="justify-center items-center fixed w-full h-full bg-gray-900/70 z-50"
        color="#36d7b7"
        loading={loading}
        cssOverride={{ display: "flex" }}
      />
      <div className="flex p-2 h-full">
        <div className="flex-grow overflow-y-auto">
          <div className="flex justify-between">
            <Tabs
              value={valueSort}
              onChange={handleSortChange}
              aria-label="basic tabs example"
            >
              <Tab label="Price-Low to High" {...a11yProps(0)} />
              <Tab label="Price-High to Low" {...a11yProps(1)} />
            </Tabs>

            {genderCateg?.includes(querys.get("category")) ? (
              <Tabs
                value={valueGender}
                onChange={handleGenderChange}
                aria-label="basic tabs example"
              >
                <Tab label="Gender-Male" {...a11yProps(0)} />
                <Tab label="Gender-Female" {...a11yProps(1)} />
              </Tabs>
            ) : (
              ""
            )}
          </div>
          <div className=" grid grid-cols-1 h-full px-4 sm:grid-cols-4">
            {products?.Data?.map((item) => (
              <div
                key={item.id}
                className="h-[380px] p-4 border-10 border-black transition-all duration-400  hover:shadow-lg"
              >
                <img
                  src={item.photos}
                  className="object-contain w-full h-48 mb-2"
                />
                <p className="text-center text-sm h-20 ">{item.title}</p>
                <Rating
                  name="read-only"
                  value={item.rating}
                  readOnly
                  className=""
                />
                <div className="flex justify-between ">
                  <p className="text-xl w-fit">₹{item.price}</p>
                  <div onClick={(e) => handleAddtoCart(e, item.id)}>
                    <Button
                      text="Add to cart"
                      bgColor="bg-primary"
                      textColor="w-20 sm:w-36 px-1 text-white font-bold hover:scale-[1.05] hover:shadow-xl"
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        className={"text-sm font-semibold w-max"}
        position="bottom-right"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default Products;
