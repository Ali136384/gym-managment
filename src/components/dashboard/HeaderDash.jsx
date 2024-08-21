import Link from "next/link";
import React from "react";
import { headerData } from "./data";
function HeaderDash() {
  return (
    <>
      <div className="header-dashboard flex items-center px-8 h-[50px] bg-green-600 mb-5 justify-around">
        {headerData?.map((ele) => {
          return (
            <>
              <Link href={ele.to} className="font-bold text-white text-[20px]">
                {ele.title}
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}

export default HeaderDash;
