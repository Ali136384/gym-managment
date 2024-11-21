"use client";
import React, { useEffect, useState } from "react";
import Chart from "../../components/dashboard/Chart";
import Stats_top from "../../components/dashboard/StatsTop";
import MoneyStats from "../../components/dashboard/RightSideStats";
import {
  getUsersLeftChartData,
  getUsersCreatedChartData,
} from "../../app/api/v1/user";

function page() {
  const [left, setLeft] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [created, setCreated] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getUsersLeftChartData().then((l) => {
      if (l === "error" || l === "unauthorized") {
      } else setLeft(l);
      console.log(l);
    });

    getUsersCreatedChartData().then((u) => {
      if (u === "error" || u === "unauthorized") {
      } else {
        console.log(u);
        setCreated(u);
      }
      console.log(u);
    });
  }, []);

  return (
    <React.Fragment>
      {/* { path.includes("panel") && ( */}
      <div className="overflow-hidden bg-[#eee] min-h-[100vh] pb-10">
        <div className="home-content flex w-[77%] flex-col pt-6 ml-[330px] ">
          <Stats_top />

          <div className="info-stats flex mt-[50px] gap-[10px]  h-auto w-full ">
            <div className="left-main w-[70%] flex flex-col gap-2 rounded-md">
              <div className="left-1  bg-white p-2 rounded-md">
                <Chart title={"Added customers"} data={created} />
              </div>
              <div className="left-2 w-full mt-2  bg-white p-2 rounded-md">
                <Chart title={"Left customers"} data={left} />
              </div>
            </div>
            <MoneyStats />
          </div>
        </div>
      </div>
      {/* )} */}
    </React.Fragment>
  );
}

export default page;
