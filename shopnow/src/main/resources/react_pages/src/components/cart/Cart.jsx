import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartContext } from "../Layout";
import emptyCart from "../../assets/top_banner/emptyCart.png";
import Checkout from "./Checkout";
import paymentAnimation from "../../assets/lotte/paymentDone.json";
import Lottie from "react-lottie";

const notifyError = (message) => {
  toast.error(message);
};

const notifySuccess = (message) => {
  toast.success(message);
};

function Cart() {
  const { cartValue, setCartValue } = useContext(cartContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [updater, setUpdater] = useState(1);
  const [checkout, setCheckout] = useState();
  const [payment, setPayment] = useState();

  // CHild states
  const [orderAddress, setOrderAddress] = useState("");

  async function donePayement(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    let response = "";

    response = await fetch("http://localhost:8080/api/products/clearcart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setPayment((payment) => !payment);
      notifyError("Payment did not done.");
      setLoading((loading) => !loading);
      setTimeout(() => {
        setLoading((loading) => !loading);
        window.location.href = "/";
      }, 2000);
      return;
    }

    let data = await response.json();
    const oldCart = data.Cart;
    console.log(data);
    const orderData = {
      products: oldCart,
      address: orderAddress,
    };

    response = await fetch("http://localhost:8080/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    data = await response.json();
    setPayment((payment) => !payment);
    notifySuccess("Payment Done.");
    setLoading((loading) => !loading);
    setTimeout(() => {
      setLoading((loading) => !loading);
      window.location.href = "/cart";
    }, 2000);
  }

  function forceUpdate() {
    setUpdater((updater) => updater * -1);
  }

  function handleCheckOut() {
    setCheckout((checkout) => !checkout);
  }

  async function handleAddItem(event, prodid) {
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
      window.location.replace("/auth");
      return;
    }
    const data = await response.json();
    if (data.Success) notifySuccess(data.Message);
    else notifyError(data.Message);
    setCartValue(data.CartSize);
    forceUpdate();
  }

  async function handleRemoveItem(event, prodid) {
    const token = localStorage.getItem("token");
    setLoading((loading) => !loading);
    const response = await fetch(
      `http://localhost:8080/api/products/deletecart?productId=${prodid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading((loading) => !loading);
    if (response.status == 401) {
      window.location.replace("/auth");
      return;
    }
    const data = await response.json();
    if (data.Success) notifySuccess(data.Message);
    else notifyError(data.Message);
    setCartValue(data.CartSize);
    forceUpdate();
  }

  function handleAdrress(event) {
    setOrderAddress(event.target.value);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchCart() {
      setLoading((loading) => !loading);
      const response = await fetch(
        "http://localhost:8080/api/products/getcart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLoading((loading) => !loading);
      if (response.status == 401) {
        window.location.replace("/auth");
        return;
      }
      setCart(data);
      var sum = 0;
      for (let i = 0; i < data?.Products.length; i++) {
        sum += data?.Products[i].price * data?.Quantity[i];
      }
      setAmount(sum);
    }
    fetchCart();
  }, [updater]);

  return (
    <div className="h-full bg-gradient-to-r from-purple-900 to-blue-600/70 flex justify-center w-full ">
      <ScaleLoader
        className="flex fixed w-full h-full bg-gray-950/50 justify-center items-center z-50"
        color="#36d7b7"
        loading={loading}
      />
      {cartValue
        ? !checkout && (
            <div className="flex w-3/4 p-4 gap-4 ">
              <div className="flex flex-col gap-7 w-[60%] bg-white rounded-lg p-10 h-max max-h-full overflow-y-scroll">
                {cart?.Products?.map((item, index) => (
                  <div key={item.id} className="border-b-2 flex pb-2 h-32">
                    <img
                      src={item.photos}
                      className="w-1/2 h-[100%] object-contain"
                    />
                    <div className="flex w-full flex-col">
                      <div className="flex w-full">
                        <div className="text-sm pt-1 w-[90%]">{item.title}</div>
                        <div className="text-sm pt-1 pl-2">₹{item.price}</div>
                      </div>
                      <div className="h-full flex items-center justify-start">
                        <div className="flex items-center gap-2 text-sm">
                          <FaMinus
                            onClick={(e) => handleRemoveItem(e, item.id)}
                            className="cursor-pointer"
                          />
                          <div className="bg-gray-200 px-4 rounded-lg">
                            {cart?.Quantity[index]}
                          </div>
                          <FaPlus
                            onClick={(e) => handleAddItem(e, item.id)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col bg-white w-[40%] max-h-full h-fit rounded-lg p-2">
                {/* Summary */}
                <h1 className="text-3xl mt-2">Order Summary</h1>
                <hr className="bg-gray-200 h-[2px] rounded-lg" />
                <div className="flex flex-col gap-4 overflow-y-auto ">
                  <div className="flex border-b-2 items-center py-2">
                    <div className="font-bold w-full">Title</div>
                    <div className="font-bold px-4">Qty</div>
                    <div className="font-bold">Price</div>
                  </div>
                  {cart?.Products?.map((item, index) => (
                    <div className="flex border-b-2 items-center py-2">
                      <div className="font-bold w-full">{item.title}</div>
                      <div className="font-bold px-4">
                        X{cart?.Quantity[index]}
                      </div>
                      <div className="font-bold">₹{item.price}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end text-2xl font-semibold py-2 ">
                  ₹{amount}
                </div>
                <hr className="bg-gray-200 h-[2px] rounded-lg" />
                <div className="flex justify-end text-xl font-normal">
                  Total Amount
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCheckOut()}
                    className="bg-blue-500 rounded-xl w-[50%] text-white p-2 mt-5 hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )
        : !checkout && (
            <div className="flex w-full h-full justify-center items-center">
              <img src={emptyCart} />
            </div>
          )}

      {checkout && (
        <Checkout handler={donePayement} addressHandler={handleAdrress} />
      )}
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

export default Cart;
