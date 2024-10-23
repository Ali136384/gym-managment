"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getGymName } from "../../app/api/v1/user";
import { BsHouseDoor } from "react-icons/bs";

import { signout } from "../../app/api/v1/auth";
import { usePathname } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { getAllUsers } from "../../app/api/v1/user";
import { headerData } from "./data";
function SideBar() {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [chooise, setChooise] = useState([]);
  const [openSelect, setOPenSelect] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const filterdArray = Array.from(new Set(chooise));
  const [mobile, setMobile] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [gymName, setGymName] = useState("");
  const [websiteSelect, setWebsiteSelect] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const s = [
    {
      id: 1,
      hasDropDown: false,
      to: "/panel",
      title: "Home",
      icon: (
        <BsHouseDoor
          size="23px"
          color={
            sessionStorage.getItem("activePath") === "/panel"
              ? "white"
              : "black"
          }
        />
      ),
      active: true,
    },
    {
      id: 2,
      hasDropDown: true,
      to: "/panel/website",
      title: "Web sitesi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="20"
          fill={
            sessionStorage.getItem("activePath") === "/panel/website"
              ? "white"
              : "black"
          }
          height="20"
        >
          <path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z" />
          <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z" />
          <path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z" />
        </svg>
      ),
      active: false,
    },
    {
      id: 3,
      hasDropDown: false,
      to: "/panel/add-customer",
      title: "Müşteri oluştur",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          fill={
            sessionStorage.getItem("activePath") === "/panel/add-customer"
              ? "white"
              : "black"
          }
          width="20"
          height="20"
        >
          <path d="M23,22H3a1,1,0,0,1-1-1V1A1,1,0,0,0,0,1V21a3,3,0,0,0,3,3H23a1,1,0,0,0,0-2Z" />
          <path d="M15,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,15,20Z" />
          <path d="M7,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,7,20Z" />
          <path d="M19,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,19,20Z" />
          <path d="M11,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,11,20Z" />
        </svg>
      ),
      active: false,
    },
    {
      id: 4,
      to: "/panel/customers",
      hasDropDown: false,
      active: false,
      title: "Müşteriler",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          fill={
            sessionStorage.getItem("activePath") === "/panel/customers"
              ? "white"
              : "black"
          }
          data-name="Layer 1"
          viewBox="0 0 24 24"
          height="20"
          width="20"
        >
          <path d="m6.5,5c1.379,0,2.5-1.121,2.5-2.5S7.879,0,6.5,0s-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm3.5,12.502v-5.002c0-.827-.673-1.5-1.5-1.5h-4c-.827,0-1.5.673-1.5,1.5v7.5h6v8h-1v-7h-3v7h-1v-7h-2v-8.5c0-1.379,1.121-2.5,2.5-2.5h4c1.379,0,2.5,1.121,2.5,2.5v3.528c-.382.454-.718.947-1,1.474Zm7.5-2.502c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5,6.5-2.916,6.5-6.5-2.916-6.5-6.5-6.5Zm0,12c-3.032,0-5.5-2.468-5.5-5.5s2.468-5.5,5.5-5.5,5.5,2.468,5.5,5.5-2.468,5.5-5.5,5.5Zm.5-6h2.5v1h-2.5v2.5h-1v-2.5h-2.5v-1h2.5v-2.5h1v2.5Z" />
        </svg>
      ),
    },
    {
      id: 5,
      to: "/panel/add-manager",
      title: "Yönetici Oluştur",
      hasDropDown: false,
      active: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          fill={
            sessionStorage.getItem("activePath") === "/panel/add-manager"
              ? "white"
              : "black"
          }
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="m12,8c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm-4.412,5.334l1.516-.892c.408.34.882.606,1.396.786v1.771h3v-1.771c.515-.18.988-.446,1.396-.786l1.516.892,1.521-2.587-1.526-.896c.063-.3.094-.576.094-.851s-.03-.551-.094-.851l1.526-.896-1.521-2.587-1.516.892c-.408-.34-.882-.606-1.396-.786V0h-3v1.771c-.515.18-.988.446-1.396.786l-1.516-.892-1.521,2.587,1.526.896c-.063.3-.094.576-.094.851s.03.551.094.851l-1.526.896,1.521,2.587Zm1.169-3.007l-.106-.372c-.103-.361-.15-.665-.15-.955s.048-.594.15-.955l.106-.372-1.32-.775.507-.862,1.305.768.273-.273c.431-.432.984-.743,1.604-.903l.375-.098v-1.528h1v1.528l.375.098c.619.16,1.173.472,1.604.903l.273.273,1.305-.768.507.862-1.32.775.106.372c.103.361.15.665.15.955s-.048.594-.15.955l-.106.372,1.32.775-.507.862-1.305-.768-.273.273c-.431.432-.984.743-1.604.903l-.375.098v1.528h-1v-1.528l-.375-.098c-.619-.16-1.173-.472-1.604-.903l-.273-.273-1.305.768-.507-.862,1.32-.775Zm15.243,14.173v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-3.5c-.827,0-1.5.673-1.5,1.5v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-4c-.827,0-1.5.673-1.5,1.5v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-3.5c-.827,0-1.5.673-1.5,1.5v2.5H0v-2.5c0-1.379,1.121-2.5,2.5-2.5h3.5c.821,0,1.544.403,2,1.015.456-.612,1.179-1.015,2-1.015h4c.821,0,1.544.403,2,1.015.456-.612,1.179-1.015,2-1.015h3.5c1.379,0,2.5,1.121,2.5,2.5Zm-4.25-3.5c1.379,0,2.5-1.121,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm-10.25,1.5c0,1.379,1.121,2.5,2.5,2.5s2.5-1.121,2.5-2.5-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5Zm4,0c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5.673-1.5,1.5-1.5,1.5.673,1.5,1.5Zm-11.75,0c0,1.379,1.121,2.5,2.5,2.5s2.5-1.121,2.5-2.5-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5Zm4,0c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5.673-1.5,1.5-1.5,1.5.673,1.5,1.5Zm-4.75-2.311c-.621.771-1,1.745-1,2.811v-8c0-1.654,1.346-3,3-3h2.08c-.047.327-.08.66-.08,1h-2c-1.105,0-2,.895-2,2v5.189Zm23-5.189v8c0-1.065-.379-2.04-1-2.811v-5.189c0-1.105-.895-2-2-2h-2c0-.34-.033-.673-.08-1h2.08c1.654,0,3,1.346,3,3Z" />
        </svg>
      ),
    },
    {
      id: 6,
      to: "/panel/managers",
      title: "Yöneticiler",
      hasDropDown: false,
      active: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          fill={
            sessionStorage.getItem("activePath") === "/panel/managers"
              ? "white"
              : "black"
          }
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="m18,15.991c0,2.065-1.042,3.96-2.788,5.068-.133.084-.212.233-.212.4v1.54c0,.553-.448,1-1,1s-1-.447-1-1v-1.54c0-.855.426-1.637,1.141-2.09,1.164-.738,1.859-2.002,1.859-3.379,0-.98-.359-1.915-1-2.641v.375c0,1.657-1.028,2.983-2.501,3.225-.879.138-1.767-.101-2.439-.672-.674-.572-1.06-1.405-1.06-2.287v-.641c-.641.725-1,1.66-1,2.641,0,1.377.695,2.641,1.86,3.379.714.453,1.14,1.234,1.14,2.09v1.54c0,.553-.448,1-1,1s-1-.447-1-1v-1.54c0-.167-.079-.316-.212-.4-1.746-1.108-2.788-3.003-2.788-5.068,0-1.77.777-3.439,2.133-4.582.522-.44,1.233-.534,1.855-.244.624.29,1.012.896,1.012,1.583v1.243c0,.293.129.571.354.763.228.193.521.274.82.223.486-.08.825-.594.825-1.251v-.979c0-.687.388-1.293,1.012-1.583.621-.288,1.333-.194,1.854.245,1.356,1.143,2.134,2.813,2.134,4.583ZM4.5,3c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm4,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm15.5,2v12c0,2.757-2.243,5-5,5-.552,0-1-.447-1-1s.448-1,1-1c1.654,0,3-1.346,3-3v-8H2v8c0,1.654,1.346,3,3,3,.552,0,1,.447,1,1s-.448,1-1,1c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-2,2v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v2h20Z" />
        </svg>
      ),
    },
    {
      id: 7,
      to: "/panel/events",
      active: false,
      hasDropDown: false,
      title: "Olaylar",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          fill={
            sessionStorage.getItem("activePath") === "/panel/events"
              ? "white"
              : "black"
          }
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    console.log(filterdArray);
    console.log(message);
    console.log("Chosen: " + chooise);
    getGymName().then((n) => {
      setGymName(n ?? "Gym");
    });
  }, [chooise]);

  useEffect(() => {
    getAllUsers().then((v) => {
      setDummyData(v ?? []);
      console.log(v);
    });
  }, []);

  useEffect(() => {
    console.log("first");
  }, [s]);

  return (
    <>
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
              {s?.map((ele) => {
                path ? null : sessionStorage.setItem("activePath", s[0].to);
                return (
                  <div className="w-full relative" key={ele.to}>
                    <div
                      onClick={() => {
                        sessionStorage.setItem("activePath", ele.to);
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
              {/* {mobile ? (
                <Link
                  onClick={() => {
                    setShowMessage(false);
                    setMobile(false);
                  }}
                  href="/panel/message-mobile"
                >
                  <div className=" flex  gap-4 text-black items-center  px-2">
                    <BiSolidMessageAdd size="23px" />
                    <p className="text-white">Craete message</p>
                  </div>
                </Link>
              ) : (
                <div
                  className="home flex justify-center gap-4 text-black items-center cursor-pointer "
                  onClick={() => setShowMessage(!showMessage)}
                >
                  <span>
                    <BiSolidMessageAdd size="23px" />
                  </span>{" "}
                  Create message
                </div>
              )} */}
            </div>
            <div className="flex logout mt-[106px] gap-3 items-center ml-4">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={async () => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Logout !",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      signout();
                      setTimeout(() => {
                        router.push("/panel/sign-in");
                      }, 100);
                    }
                  });
                }}
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

        {/* 
        {showMessage ? (
          <div className="create-message flex-1  ml-[2%] rounded-[31px] relative overflow-hidden p-5 flex  gap-[20px] ">
            <div className="first ">
              <p className="text-center font-bold text-[#ffcb00] text-[24px] ">
                Mesaj oluşturmak
              </p>
              <div className="message-box h-[200px] overflow-y-auto ">
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className=" resize-none w-full h-[300px] outline-none p-4 rounded-tl-[31px]"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <div className="choose-how-can-see mt-2">
                <p className="  text-[17px] text-[#ffcb00]">
                  Herkese göndermek için seçin..{" "}
                  <span className="font-bold">Hepsi</span>.
                </p>
                <div
                  onClick={() => setOPenSelect(!openSelect)}
                  className=" w-full text-white  mt-3 bg-customRed py-1 px-2 flex justify-between items-center rounded-[31px] "
                >
                  <span>Mesajı kimler görebilir?</span>
                  {openSelect ? (
                    <LiaChevronCircleUpSolid size={22} />
                  ) : (
                    <CiCircleChevDown size={22} />
                  )}
                </div>
                <div
                  className={
                    openSelect
                      ? "custom-select h-[200px] w-full overflow-y-auto flex flex-wrap justify-center p-2 mt-2 z-[1000] duration-300"
                      : "custom-select opacity-0 h-0 w-full overflow-y-auto flex flex-wrap justify-center p-2 mt-2 z-[1000] duration-300"
                  }
                >
                  <div className="option w-full flex items-center justify-center p-2 m-3">
                    <label
                      className=" text-white text-[17px] mr-1"
                      htmlFor="All"
                    >
                      Hepsi
                    </label>
                    <input
                      onChange={() => {
                        setIsAllChecked(!isAllChecked);
                        chooise[0] = "All";
                        chooise.length = 1;
                        console.log(chooise);
                      }}
                      className=" h-[25px] w-[22px] outline-none border-none"
                      type="checkbox"
                      id="All"
                    />
                  </div>
                  {isAllChecked ? (
                    <p className=" text-[#ffcb00]  duration-300 opacity-90 mx-2 my-2 font-bold">
                      Tüm yöneticiler mesajı alacak
                    </p>
                  ) : (
                    <p className=" text-[#ffcb00] absolute  opacity-0 font-bold ">
                      Tüm yöneticiler mesajı alacak
                    </p>
                  )}
                  {dummyData.map((e) => {
                    return (
                      <>
                        <div
                          key={e.id}
                          className="option w-[45%] flex items-center p-2"
                        >
                          <label
                            className=" text-white text-[17px] mr-1"
                            htmlFor={`${e.id}`}
                          >
                            {e.name}
                          </label>
                          {isAllChecked ? null : (
                            <input
                              onChange={() => {
                                chooise[0] = " ";
                                setChooise((c) => [...c, e.id]);
                              }}
                              className=" h-[25px] w-[22px] outline-none border-none"
                              type="checkbox"
                              id={`${e.id}`}
                            />
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={async () => {
                  const res = await createAnnouncement(
                    message,
                    isAllChecked,
                    filterdArray.slice(1)
                  );
                  console.log(res);
                  console.log("filtered: " + filterdArray);
                }}
                className=" text-green-700 shadow-xl h-max w-max mx-auto my-0 px-10 py-1 bg-[#ffcb00] rounded-[31px] font-bold"
              >
                Göndermek
              </button>
            </div>
            <div
              onClick={() => setShowMessage(!showMessage)}
              className="second self-center w-[100px] -right-16 absolute cursor-pointer"
            >
              <IoIosCloseCircle size={30} color="white" />
            </div>
          </div>
        ) : (
          <div className="create-message w-[1px] bg-red-600 ml-14 rounded-[31px] overflow-hidden duration-900"></div>
        )} */}
      </div>
    </>
  );
}
export default SideBar;
