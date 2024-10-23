"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsOfCategory } from "../../api/v1/dashboard";
import "swiper/css";
import "swiper/css/navigation";
import BeatLoader from "react-spinners/BeatLoader";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import "../market.css";

import { getProductImageUrls } from "../../../lib/images";

function page({}) {
  const params = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchingValue, setSearhingValue] = useState("");
  useEffect(() => {
    console.log(params);

    getProductsOfCategory(params.cat ?? "").then((c) => {
      if (c !== "error") {
        const promises = c.map((product) => {
          const promise = getProductImageUrls(product.id).then(
            (urls) => (product.images = urls)
          );
          return promise;
        });

        Promise.all(promises).then(() => setProducts(c));
      }
    });
  }, []);

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99999999);

  const handleScroll = () => {
    setScrollPosition(scrollY);
  };

  useEffect(() => {
    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteringSpinner = (e) => {
    setSearhingValue(e.target.value);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 200);
  };

  return (
    <>
      <div className="filters-father flex items-center mx-10">
        <div className="by-money w-[300px] mt-5 flex px ml-5 rounded-lg shadow-lg">
          <div className="min-max flex justify-center">
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
        </div>
        <div className="input w-[53%] relative border-2 mx-auto flex flex-row justify-between rounded-lg mt-4 ">
          <div className="1 flex w-[95%]">
            <div className="3">
              <CiSearch size={27} className="" />
            </div>
            <div className="2 w-full">
              <input
                onChange={() => filteringSpinner(e)}
                type="text"
                className="pl-2 w-full"
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
      </div>
      <div className="cards flex p-10 gap-8 flex-wrap mt-10">
        {products
          ?.filter((ele) => ele.price > min && ele.price < max)
          .filter(
            (ele) =>
              ele.description
                .toUpperCase()
                .includes(searchingValue.toUpperCase()) ||
              ele.marka.toUpperCase().includes(searchingValue.toUpperCase())
          )
          .map((ele) => {
            return (
              <>
                <div className="product-card w-[23%] shadow-lg">
                  <Link href={`/product/${ele.id}`}>
                    <div className=" flex flex-col min-h-[280px]">
                      {ele.images?.length && (
                        <img
                          className="w-[220px] self-center"
                          src={ele.images[0]}
                          alt=""
                        />
                      )}
                      <div className="flex w-full p-3 items-center">
                        <p className="w-[100%] min-h-[71px] text-sm mt-2">
                          <span className=" text-website2 font-bold text-lg mr-1">
                            {ele.marka}
                          </span>{" "}
                          {ele.description.length > 70
                            ? ele.description.slice(0, 70) + "..."
                            : ele.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full p-3">
                        <p className="text-website2">{ele.price} TL</p>
                        <button className="buy-button shadow-md p-2 text-website2 ">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default page;
