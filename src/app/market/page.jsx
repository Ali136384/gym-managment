"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Switch from "react-toggle-switch";
import { CiSearch } from "react-icons/ci";
import BeatLoader from "react-spinners/BeatLoader";
import Slider from "../../components/website/Slider";
import "./market.css";
import {
  getHomeProducts,
  getProductCategories,
  getCategoryProducts,
} from "../../app/api/v1/dashboard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

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
        console.log(cp);
      }
    });

    getProductCategories().then((c) => {
      if (c === "error") {
      } else setCategories(c);
    });
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (filterInputValue === "") {
      setSendedFilterValue("");
    }
  }, [filterInputValue]);

  // useEffect(() => {
  //   const typingTimer = setTimeout(() => {
  //     setShowSpinner(false);
  //   }, 3000);
  //   clearTimeout(typingTimer);
  // }, [filterInputValue]);

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
          {/* <button
              onClick={() => setSendedFilterValue(filterInputValue)}
              className=" text-white bg-orange-500 px-3 py-[5.3px] rounded-r-md "
            >
              Apply
            </button> */}
        </div>
        <div className="parent-market ml-10 px-[100px] w-[100%] ">
          <div className="cat-filters ml-[22%]">
            {/* <p className="text-website2 mt-2 font-bold">
              You can filter by typing name or selecting category !
            </p> */}
            <div
              className={`filter-by-categorie flex overflow-x-auto ${
                categories.length > 8 ? "justify-between" : "justify-center"
              }`}
            >
              {categories.map((ele) => {
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
            {products.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <Slider
                    cat={catFilteringValue}
                    sendedFilterValue={sendedFilterValue}
                    min={min}
                    max={max}
                    id={ele.id}
                    data={ele}
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
