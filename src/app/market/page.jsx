"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import BeatLoader from "react-spinners/BeatLoader";
import Slider from "../../components/website/Slider";
import "./market.css";
import {
  getProductCategories,
  getCategoryProducts,
} from "../../app/api/v1/dashboard";

import storage from "../api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Market() {
  const [categories, setCategories] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [products, setProducts] = useState([]);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99999999);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [sendedFilterValue, setSendedFilterValue] = useState("");
  const [catFilteringValue, setCatFilteringValue] = useState("All");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    getCategoryProducts().then((cp) => {
      if (cp === "error") {
      } else {
        setProducts(cp);
      }
    });

    getProductCategories().then(setCategories);
  }, []);

  const handleScroll = () => {
    setScrollPosition( .scrollY);
  };

  useEffect(() => {
     .addEventListener("scroll", handleScroll);

    return () => {
       .removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (filterInputValue === "") {
      setSendedFilterValue("");
    }
  }, [filterInputValue]);

  return (
    <>
      <div className=" overflow-hidden">
        <div
          className={`left w-[20%] mx-2 shadow-xl ml-4 duration-500  mr-10 fixed overflow-y-auto ${
            scrollPosition > 90 ? "-mt-[70px]" : "mt-[20px]"
          }`}
        >
          <div className="filters text-center p-2 flex flex-col overflow-y-auto h-[190px] mt-0 ">
            <span className="text-website2 font-bold text-2xl mb-3">
              filter by money
            </span>
            <div className="min-max my-5">
              <label htmlFor="">min</label>
              <input
                onChange={(e) => setMin(e.target.value)}
                type="number"
                className="border-2 w-[20%] ml-2 rounded-full px-2"
              />
              <span className="text-website2"> TL</span> -
              <label htmlFor=""> max</label>
              <input
                onChange={(e) => setMax(e.target.value)}
                type="number"
                className="border-2 w-[20%] ml-2 rounded-full px-2"
              />{" "}
              <span className="text-website2">TL</span>
            </div>
            <span className="text-sm text-website2 font-bold">
              When you input range filter will work outomatically.{" "}
            </span>
          </div>
        </div>
        <div className="input ml-[36%] relative border-2 w-[40%] flex justify-between px-1 py-1 rounded-lg mt-4 ">
          <div className="1 flex">
            <div className="3">
              <CiSearch size={27} className="" />
            </div>
            <div className="2">
              <input
                onChange={(e) => {
                  e.target.value ? "" && setSendedFilterValue("") : null;
                  setSendedFilterValue(e.target.value);
                  setFilterInputValue(e.target.value);
                  setShowSpinner(true);
                  setTimeout(() => {
                    setShowSpinner(false);
                  }, 2000);
                }}
                type="text"
                className="pl-2"
                placeholder="xxxxxxxx"
              />
            </div>
          </div>
          <div className="2">
            <BeatLoader
              color="orange"
              loading={showSpinner}
              size={8}
              speedMultiplier={1}
            />
          </div>
        </div>
        <div className="parent-market ml-10 px-[100px] w-[100%] ">
          <div className="cat-filters ml-[22%]">
            <div
              className={`filter-by-categorie flex overflow-x-auto ${
                categories.length > 8 ? "justify-between" : "justify-center"
              }`}
            >
              {categories?.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <div
                      onClick={async () => {
                        setCatFilteringValue(ele.name);
                      }}
                      className="category mr-7 my-7 bg-orange-500 px-4 py-2 rounded-lg text-white font-bold cursor-pointer"
                    >
                      {ele.name}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="right p-4 ml-[12%] mt-4">
            {products?.map((product) => {
              return (
                <React.Fragment key={product.id}>
                  <Slider
                    cat={catFilteringValue}
                    sendedFilterValue={sendedFilterValue}
                    min={min}
                    max={max}
                    id={product.id}
                    data={product}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Market;
