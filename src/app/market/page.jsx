"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BallTriangle } from "react-loader-spinner";
import Slider from "../../components/website/Slider";
import "./helper.css";
import { getHomeProducts } from "../../app/api/v1/dashboard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
function Market() {
  const cateGories = [
    { id: 1, title: "Proteins", data: [11, 21, 31, 51, 61, 71, 81] },
    { id: 2, title: "Clothes", data: [12, 22, 32, 52, 62, 72, 82] },
    { id: 3, title: "Houses", data: [13, 23, 33, 53, 63, 73, 83] },
    { id: 4, title: "Horses", data: [14, 24, 34, 54, 64, 74, 84] },
    { id: 5, title: "Cars", data: [15, 25, 35, 55, 56, 75, 85] },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getHomeProducts().then((p) => {
      setProducts(p);
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
    console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    <>
      <div className=" overflow-hidden">
        <div
          className={`left w-[20%] mx-2 shadow-xl ml-4 duration-500  mr-10 fixed overflow-y-auto ${
            scrollPosition > 90 ? "-mt-[70px]" : "mt-[20px]"
          }`}
        >
          <div className="filters text-center font-extrabold text-2xl p-4 flex flex-col overflow-y-auto">
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
            <span>filters</span>
          </div>
        </div>
        <div className="parent-market ml-10 px-[100px] w-[100%] ">
          <div className="right  p-4">
            {cateGories.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <div className="slider-market-parnet mt-10">
                    <div className="px-20 flex justify-between items-center">
                      <p className=" text-website2 font-bold text-xl ">
                        {ele.title}
                      </p>
                      <button className=" shadow-lg px-8 py-2 duration-300 hover:bg-orange-600 text-website2 rounded-md hover:text-white">
                        See All
                      </button>
                    </div>
                    <Slider id={ele.id} data={ele.data} />
                  </div>
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