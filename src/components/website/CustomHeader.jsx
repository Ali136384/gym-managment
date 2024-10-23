"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";
import { SlBasket } from "react-icons/sl";
import { RiCloseCircleLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import "../website/media.css";
import { sData } from "./data";
function CustomNav() {
  const [gymName, setGymName] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getHomeGeneralInfo().then((i) => {
      if (i === "error" || i === "unauthorized") {
        console.log("first");
      } else {
        // setGenInfo(i);
        const words = i.title.split(" ");
        console.log(words[1]);
        setGymName(words);
      }
    });
  }, []);

  return (
    <>
      <div className={`hidden mobile-header ${menuOpen ? "menu-open" : ""}`}>
        {/* show me on mobile :: message from Ali */}
        <div className="header-content-title">
          <div>
            <span>
              {gymName[0]} <span className="text-website2">{gymName[1]}</span>
            </span>
          </div>
          <p className="relative">
            <GiHamburgerMenu
              className={`menu ${menuOpen ? "go-right" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              size={23}
            />
            <RiCloseCircleLine
              onClick={() => setMenuOpen(!menuOpen)}
              className={`close-menu-icon ${
                menuOpen ? "go-down-take-place" : ""
              }`}
              size={27}
            />
          </p>
        </div>
      </div>
      <div
        className={`linkes lg:hidden absolute top-10 duration-300 px-3 flex w-full h-[70vh] flex-col justify-evenly ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {sData?.map((ele) => {
          return (
            <React.Fragment key={ele.id}>
              <Link
                onClick={() => setMenuOpen(false)}
                href={ele.to}
                className="one-link border-b-2 pb-2 border-orange-500"
              >
                <p className="font-bold text-[20px]">{ele.title}</p>
              </Link>{" "}
            </React.Fragment>
          );
        })}
      </div>
      <div className="lg:flex hidden">
        <div className=" custom-header  flex flex-1 justify-between shadow-xl  h-[60px] items-center px-[200px] py-10">
          <div className="w-[30%]">
            <Link href="/">
              <span className="text-4xl font-bold">
                {gymName[0]} <span className="text-website2">{gymName[1]}</span>
              </span>
            </Link>
          </div>
          <div className="flex flex-1 justify-evenly">
            {sData?.map((ele) => (
              <Link key={ele.id} href={ele.to}>
                <span
                  className={
                    "text-lg font-bold text-black cursor-pointer hover:text-website2 duration-500 scale-[1.04]"
                  }
                >
                  {ele.title}
                </span>
              </Link>
            ))}
          </div>
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
      </div>
    </>
  );
}

export default CustomNav;
