"use client";
import React, { useEffect, useState } from "react";
import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";
import { getGymName } from "../../app/api/v1/user";
import Navbar from "./Navbar";
import Link from "next/link";
import storage from "../../app/api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [gymName, setGymName] = useState([]);
  const [genInfo, setGenInfo] = useState(null);
  const [headerImageURL, setHeaderImageURL] = useState(null);
  const [allImages, setAllImages] = useState([]);

  //   Start scrool Value

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  const headerStyle =
    scrollPosition < 735 ? { backgroundColor: "rgba(250,250,250,0.1)" } : {};

  //   End scrool Value

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${headerImageURL})`,
          backgroundRepeat: "round",
        }}
        className="header-parent h-[100vh] bg-emerald-200 z-50"
      >
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
          <div className="mb-40 text-center">
            <p className="text-center mb-2 font-bold text-2xl text-white">
              {genInfo?.sentence ?? ""}
            </p>
            <p className="text-center text-7xl font-extrabold text-white">
              {genInfo?.secondSentence ?? ""}
            </p>
            <a
              href={`https://wa.me/+905399127498?text=Hello, I want to become a member ?`}
            >
              <button className="mt-5 bg-[#ed563b] text-white px-4 text-xl py-4 rounded-sm">
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
