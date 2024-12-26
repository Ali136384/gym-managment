"use client";
import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { sData as headerData } from "./data";
import Link from "next/link";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(scrollY);
  };

  useEffect(() => {
    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle =
    scrollPosition < 735 ? { backgroundColor: "rgba(250,250,250,0.1)" } : {};

  return (
    <div className="flex flex-1 justify-between ">
      {headerData?.map((ele) => {
        return (
          <React.Fragment key={ele.id}>
            <Link href={ele.to}>
              <span
                className={`text-lg font-bold duration-300 pb-1 hover:text-txt_secondery cursor-pointer hover:text-website2  scale-[1.04]
                  ${scrollPosition > 735 ? "text-black" : "text-white"}
                  `}
              >
                {ele.title}
              </span>
            </Link>
          </React.Fragment>
        );
      })}
      <Link href="/basket">
        <div className="basket flex items-center cursor-pointer">
          <SlBasket
            size={27}
            fontWeight={40}
            color="#e75f11"
            className=" font-extrabold"
          />
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
