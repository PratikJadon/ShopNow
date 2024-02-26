import React, { useState } from "react";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Checkout(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");

  const handleCardNumberChange = (event) => {
    const input = event.target.value;
    setCardNumber(input);
    if (!/^\d{16}$/.test(input)) {
      setCardNumberError("Card number must be exactly 16 digits");
    } else {
      setCardNumberError("");
    }
  };

  const handleCvvChange = (event) => {
    const input = event.target.value;
    setCvv(input);
    if (!/^\d{3}$/.test(input)) {
      setCvvError("CVV must be exactly 3 digits");
    } else {
      setCvvError("");
    }
  };

  return (
    <div className="h-full mt-10 w-[50%]">
      <form onSubmit={props.handler}>
        <div className="bg-white p-4  flex flex-col rounded-lg">
          <p className="text-2xl">Shipping Details</p>
          <hr className="border-1 border-black m-2" />
          <div className="py-4">
            <TextField
              onChange={(e) => props.addressHandler(e)}
              required
              className="w-full"
              id="outlined-error-helper-text"
              label="Address"
              defaultValue=""
            />
          </div>
          <p className="text-2xl mt-5">Cart Details</p>
          <hr className="border-1 border-black m-2" />
          <div className="py-2">
            <TextField
              required
              className="w-full"
              id="outlined-error-helper-text"
              label="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              error={!!cardNumberError}
              helperText={cardNumberError}
            />
          </div>
          <div className="flex items-center justify-center gap-2 ">
            <TextField
              required
              className="w-full"
              id="outlined-error-helper-text"
              label="Card Holder"
              defaultValue=""
            />
            <TextField
              required
              id="outlined-error-helper-text"
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
              error={!!cvvError}
              helperText={cvvError}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{
                    textField: { required: true },
                  }}
                  label={"Expiry Date"}
                  views={["month", "year"]}
                  className="w-full required"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex justify-center py-5">
            <button
              type="submit"
              className="bg-blue-400 rounded-md w-[50%] p-3"
            >
              Process to Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
