"use client";
import Link from "next/link";
import React from "react";
import MapsComponent from "./GoogleMaps";
import { windowsData as data } from "./data";
function Footer() {
  return (
    <div className="lg:h-[350px] w-full bg-neutral-900 lg:p-14 p-4 mt-28">
      <div className="maps lg:grid lg:grid-cols-2 gap-9 flex  flex-col-reverse items-center">
        <div className="1 overflow-hidden flex justify-center items-center rounded-xl w-[300px]  lg:w-[600px] h-[286px]">
          <MapsComponent height={"400px"} width={"600px"} />
        </div>
        <div className="flex  w-full">
          <div className="2 flex-1 ">
            <p className="text-white flex flex-col gap-5">
              {data?.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <Link
                      href={ele.to}
                      className="w-full text-white font-bold border-l-2 pl-3 hover:text-website2 duration-300 hover:border-b-2 hover:pb-2 cursor-pointer border-r-2  "
                    >
                      <span key={ele.id}>{ele.title}</span>
                    </Link>
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
