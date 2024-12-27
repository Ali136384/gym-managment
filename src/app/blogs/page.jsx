"use client";
import React, { useState } from "react";
import BLogCard from "../../components/website/blogCard";
function page() {
  return (
    <div className="text-center ">
      <p className="font-bold text-3xl mt-10">We provide our blgos</p>
      <p className="text-gray-400 text-xl mt-2">
        you can benefit from our blogs
      </p>

      <div className="blogs mt-10 flex justify-center  flex-wrap gap-6">
        <BLogCard />
        <BLogCard />
        <BLogCard />
        <BLogCard />
        <BLogCard />
        <BLogCard />
      </div>
    </div>
  );
}

export default page;
