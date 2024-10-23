"use client";
import React, { useEffect, useState } from "react";
import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";
import { getGymName } from "../../app/api/v1/user";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import Navbar from "./Navbar";
import Link from "next/link";
import storage from "../../app/api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { CiBurger } from "react-icons/ci";
import { sData as headerData } from "./data";
function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [gymName, setGymName] = useState([]);
  const [genInfo, setGenInfo] = useState(null);
  const [headerImageURL, setHeaderImageURL] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  //   Start scrool Value

  const handleScroll = () => {
    setScrollPosition(scrollY);
  };

  const storageRef = ref(storage, "images/");
  useEffect(() => {
    getGymName().then((name) => {
      if (name === "unauthorized" || name === null);
      else setGymName(name);
    });

    listAll(storageRef).then((response) => {
      const item = response.items.find((i) =>
        i.name.startsWith("gymHomeBackImage")
      );
      getDownloadURL(item).then(setHeaderImageURL);
    });

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getHomeGeneralInfo().then((i) => {
      if (i === "error" || i === "unauthorized") {
        console.log("error");
      } else {
        // setGenInfo(i);
        const words = i.title.split(" ");
        console.log(words[1]);
        setGymName(words);
        setGenInfo(i);
        // console.log(i);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(scrollPosition);
  }, [scrollPosition]);

  const headerStyle =
    scrollPosition < 735 ? { backgroundColor: "rgba(250,250,250,0.1)" } : {};

  //   End scrool Value

  // Start mobile open

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${headerImageURL})`,
          backgroundRepeat: "round",
        }}
        className="header-parent overflow-hidden h-[100vh] bg-orange-600 z-50"
      >
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
          {headerData.map((ele) => {
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
        <div
          style={headerStyle}
          className={`header-bar w-full h-20 z-[100] justify-evenly px-[210px] duration-700 flex items-center  ${
            scrollPosition > 735 && "bg-white shadow-lg fixed z-50"
          }`}
        >
          <Link href="/">
            <p
              className={
                scrollPosition > 735
                  ? "text-5xl text-black font-extrabold w-[500px] "
                  : "text-5xl text-white font-extrabold w-[500px] "
              }
            >
              <span>
                {gymName[0]} <span className="text-website2">{gymName[1]}</span>
              </span>

              {/* <span className="text-website2">{genInfo?.title ?? ""}</span> */}
            </p>
          </Link>

          <Navbar />
        </div>
        <div className="content flex items-center justify-center h-full ">
          <div className="desc-content-starter-page mb-40 text-center">
            <p className="text-center mb-2 font-bold text-2xl text-white">
              {genInfo?.sentence ?? ""}
            </p>
            <p className="text-center text-7xl font-extrabold text-white">
              {genInfo?.secondSentence ?? ""}
            </p>
            <a
              href={`https://wa.me/+905399127498?text=Hello, I want to become a member ?`}
            >
              <button className=" self-end mt-[90%] transform  md:mt-5 bg-[#ed563b] text-white px-4 text-xl py-4 rounded-sm">
                BECOME A MEMBER
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
