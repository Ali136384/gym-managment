"use client";
import React, { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BallTriangle } from "react-loader-spinner";
import { getHomePlans, getPlanParagraph } from "../../app/api/v1/dashboard";
import Link from "next/link";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [paragraph, setParagraph] = useState("");
  useEffect(() => {
    getHomePlans().then((plans) => {
      if (plans === "error" || plans === "unauthorized");
      else {
        for (let i = 0; i < plans.length; i++) {
          plans[i] = { ...plans[i], id: i };
        }
        setPlans(plans);
      }
    });
    getPlanParagraph().then((p) => {
      if (p !== "error") {
        setParagraph(p);
      }
    });
  }, []);

  return (
    <>
      <div className=" py-[100px] overflow-hidden">
        <p className="text-center font-extrabold lg:text-4xl text-xl">
          CHOOSE <span className="text-website2">PLAN</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="mt-10 text-center opacity-60">{paragraph}</p>
        {plans.length ? (
          <div className="plans w-full flex flex-col overflow-hidden gap-14  lg:gap-14 items-start justify-center mt-16 mx-auto my-0 lg:px-[150px] px-[20px]">
            {plans?.map((ele) => {
              return (
                <React.Fragment key={ele.id}>
                  <Link className="w-full" href={`/plan/${ele.id}`}>
                    <div className="plan flex flex-row gap-4 w-full">
                      <CgGym
                        size={60}
                        color="#ed563b"
                        className=" flex items self-center rotate-[125deg]"
                      />
                      <div className="content-of-plan flex flex-col justify-between w-full">
                        <div className=" flex justify-between w-full ">
                          <p className="text-xl font-extrabold">{ele.title}</p>
                          <p className=" font-bold">{ele.duration}</p>
                        </div>
                        <p
                          style={{ overflowWrap: "anywhere" }}
                          className=" opacity-70 py-2"
                        >
                          {ele.description}
                        </p>
                        <div className="flex justify-between w-full">
                          <button className=" self-start text-website2 font-medium ">
                            Register Now
                          </button>
                          <span className="text-website2 font-bold">
                            {ele.price} TL
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center my-20">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#ed563b"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Plans;
