"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getGymName } from "../../app/api/v1/user";
import { tabs } from "../dashboard/data.js";
import { usePathname } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import Link from "next/link";
import { getAllUsers } from "../../app/api/v1/user";
import { headerData } from "./data";
import { Logout } from "../../Functions/Fuctions.jsx";
function SideBar() {
  const path = usePathname();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [chooise, setChooise] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [data, setData] = useState([]);
  const [gymName, setGymName] = useState("");
  const [websiteSelect, setWebsiteSelect] = useState(false);

  useEffect(() => {
    getGymName().then((n) => {
      setGymName(n ?? "Gym");
    });
  }, [chooise]);

  useEffect(() => {
    console.log("tabs", tabs);
    getAllUsers().then((v) => {
      setData(v ?? []);
    });
  }, []);

  return (
    <React.Fragment>
      <div
        className={
          showMessage
            ? `sidebar ${
                mobile && `open-sidebar  `
              } w-[820px] h-[100vh] fixed top-0 left-0 flex  bg-white rounded-tr-[31px]  p-[25px] duration-500 z-[100]`
            : `sidebar ${
                mobile && `open-sidebar`
              } w-[290px] h-[100vh] fixed top-0 left-0  bg-white  p-[15px] duration-500 z-[100]`
        }
      >
        <div className="show-mobile w-full justify-between hidden items-center">
          {mobile ? (
            <div className="flex items-center justify-between w-auto">
              <IoIosCloseCircleOutline
                className=" flex justify-center items-center text-[30px] text-white ml-2 w-auto"
                onClick={() => setMobile(!mobile)}
              />
            </div>
          ) : (
            <RxHamburgerMenu
              onClick={() => setMobile(!mobile)}
              className=" flex justify-center items-center text-[30px] text-white ml-2"
            />
          )}
        </div>
        <div className="mt-[30px]">
          <div className="flex  justify-between  items-center mb-5 mx-4">
            <Link className=" text-center" href="/panel">
              <h1 className="gym-tit font-bold text-[23px] text-center text-[#5540fb]">
                {gymName.length ? gymName : "name"}
              </h1>
            </Link>
          </div>
          <div className="top-content flex flex-col  mx-4 ">
            <div className=" h-[60vh] mt-[40px] w-full  flex flex-col items-start self-center gap-[15px] ">
              {tabs?.map((ele) => {
                path ? null : window?.sessionStorage.setItem("activePath", tabs[0].to);
                return (
                  <div className="w-full relative" key={ele.to}>
                    <div
                      onClick={() => {
                        window?.sessionStorage.setItem("activePath", ele.to);
                        window?.sessionStorage.setItem("activePath", ele.to);
                        ele.title === "Web sitesi" &&
                          setWebsiteSelect(!websiteSelect);
                      }}
                      className={`${
                        path === ele.to ? "bg-[#5540fb]" : "bg-white"
                      } ${
                        ele.title === "Web sitesi" && "bg-[#5540fb]"
                      } w-full py-[8px] rounded-md duration-500`}
                    >
                      <Link
                        className="h-full"
                        onClick={() => {
                          setShowMessage(false);
                          setMobile(false);
                        }}
                        href={ele.to}
                      >
                        <div className="home flex gap-2 text-black px-2">
                          <span
                            className={`${
                              path === ele.to ? "text-green-500" : "text-black"
                            } `}
                          >
                            {ele.icon}
                          </span>
                          <div className="flex justify-between w-full items-center">
                            <p
                              className={`${
                                path === ele.to ? " text-white" : "text-black"
                              } `}
                            >
                              {ele.title}
                            </p>
                            {ele.hasDropDown && (
                              <IoChevronDown
                                className={` duration-300 ${
                                  websiteSelect ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                    {ele.title === "Web sitesi" && (
                      <div
                        className={`bg-[#9520fd0a] overflow-hidden w-full  flex justify-between flex-col duration-300 ${
                          websiteSelect ? "h-[220px] p-4" : "h-0 p-0 "
                        } rounded-md`}
                      >
                        {headerData?.map((ele) => {
                          return (
                            <>
                              <Link href={ele.to}>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`h-[7px] w-[7px] ${
                                      path === ele.to
                                        ? "bg-[#5540fb]"
                                        : "bg-gray-400"
                                    } rounded-full`}
                                  ></span>
                                  <p
                                    className={`
                                    ${
                                      path === ele.to
                                        ? "text-[#5540fb]"
                                        : " text-gray-500"
                                    }`}
                                  >
                                    {ele.title}
                                  </p>
                                </div>
                              </Link>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex logout mt-[106px] gap-3 items-center ml-4">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => Logout(router)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <title>11-arrow</title>
                    <path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z" />
                    <path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z" />
                  </svg>
                </div>

                <button className="text-black bg-inherit font-bold border-none">
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SideBar;
