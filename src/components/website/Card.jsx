"use client";
import React, { useState } from "react";

function Card({ data }) {
  const [objectData, setObjectData] = useState(data);
  const [openCard, setOpenCard] = useState("");

  const updateQuantity = (operation) => {
    setObjectData((prevData) => {
      const newQuantity =
        operation === "increment"
          ? prevData.quantity + 1
          : Math.max(0, prevData.quantity - 1);
      return { ...prevData, quantity: newQuantity };
    });
  };

  return (
    <div
      onMouseEnter={() => setOpenCard(objectData.id)}
      onMouseLeave={() => setOpenCard("")}
      style={{
        width: openCard === objectData.id ? "1300px" : "1100px",
      }}
      className="p-4 bg-[#eee] duration-300 justify-between min-h-[180px] flex items-center rounded-md"
    >
      <div className="left flex items-center gap-4">
        <img
          className="h-[120px] rounded-lg"
          src={objectData.imgUrl}
          alt="Product"
        />
        <div className="info flex flex-col gap-1">
          <p className="title">
            <span className="font-bold">{objectData.title}</span>
          </p>
          <p className="order-number">
            <span className="text-gray-500">{objectData.orderNumber}</span>
          </p>
        </div>
      </div>
      <div className="right flex items-center gap-10">
        <div className="type">
          <span className="font-bold">{objectData.type}</span>
        </div>
        <div className="counter flex items-center gap-4">
          <span
            onClick={() => updateQuantity("decrement")}
            className="cursor-pointer text-3xl select-none"
          >
            -
          </span>
          <span className="h-8 w-8 bg-white border-[3px] border-[#f0f1ff] flex items-center justify-center rounded-full">
            {objectData.quantity}
          </span>
          <span
            onClick={() => updateQuantity("increment")}
            className="cursor-pointer  text-3xl select-none"
          >
            +
          </span>
        </div>
        <div className="price">
          <span className="text-txt_primery font-bold">{objectData.price}</span>
        </div>
      </div>
      <div className="delete cursor-pointer font-bold -z-10 absolute right-[200px] h-16 w-16 flex items-center justify-center bg-gray-200 rounded-full">
        <p>X</p>
      </div>
    </div>
  );
}

export default Card;
