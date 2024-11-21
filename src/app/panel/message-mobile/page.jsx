"use client";
import React, { useState } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import { LiaChevronCircleUpSolid } from "react-icons/lia";

function page() {
  const [openSelect, setOPenSelect] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);

  return (
    <>
      <div className="cont min-h-[600px]">
        <div className="create-message flex-1 rounded-[31px] z-50  p-5 flex flex-col gap-[20px] shadow-md bg-customRed mt-[100px] m-2 min-h-[550px]">
          <p className="text-center font-bold text-[#ffcb00] text-[24px] ">
            Create message
          </p>
          <div className="message-box h-[200px] overflow-y-auto ">
            <textarea
              className=" resize-none w-full h-[300px] outline-none p-4 rounded-tl-[31px]"
              placeholder="Write your message"
            ></textarea>
          </div>
          <div className="choose-how-can-see mt-2">
            <p className="  text-[17px] text-[#ffcb00]">
              To send it to everyone choose
              <span className="font-bold">All</span>.
            </p>
            <div
              onClick={() => setOPenSelect(!openSelect)}
              className=" w-full text-white  mt-3 bg-customRed py-1 px-2 flex justify-between items-center rounded-[31px] "
            >
              <span>Who Can see The message</span>
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
                <label className=" text-white text-[17px] mr-1" htmlFor="All">
                  All
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
                  All managers will recive the message
                </p>
              ) : (
                <p className=" text-[#ffcb00] absolute  opacity-0 font-bold ">
                  All managers will recive the message
                </p>
              )}
              {/* {dummyData?.map((e) => {
                return (
                  <>
                    <div className="option w-[45%] flex items-center p-2">
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
                            setChooise([...chooise, e.id]);
                          }}
                          className=" h-[25px] w-[22px] outline-none border-none"
                          type="checkbox"
                          id={`${e.id}`}
                        />
                      )}
                    </div>
                  </>
                );
              })} */}
            </div>
          </div>
          <button className=" text-green-700 shadow-xl h-max w-max mx-auto my-0 px-10 py-1 bg-[#ffcb00] rounded-[31px] font-bold mt-[30px]">
            Submit
          </button>
          {/* <div className="how-can-see-list p-2 w-full bg-customRed mt-5 rounded-[18px] h-auto overflow-y-auto">
              <span className=" flex justify-center text-[#ffcb00] font-bold mb-2">
                Who can see the message ?
              </span>
              <div className="members-can-see flex flex-wrap">
                {filterdArray.map((ele) => {
                  return (
                    <>
                      {ele != "" ? (
                        <p className="h-[30px] can-see w-max  m-2 p-1 bg-gray-100 rounded-lg relative ">
                          {ele}
                          <span
                            onClick={() => {
                              const indexToremove = filterdArray.indexOf(ele);
                              filterdArray.splice(indexToremove, 1);
                              setChooise(filterdArray);
                            }}
                            className="remove"
                          ></span>
                        </p>
                      ) : null}
                    </>
                  );
                })}
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
}

export default page;
