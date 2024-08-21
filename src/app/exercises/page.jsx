"use client";

import React, { useEffect, useState } from "react";
import "./exercise.css";
import Link from "next/link";
import { getExerciseSectionImageUrl } from "../../lib/images";
import { getAllSections, countSectionExercises } from "../api/v1/excercises";

function page() {
  /// exercise sections only.
  /// properties:
  ///   id
  ///   name
  ///   imageUrl
  const [exerciseSections, setExerciseSections] = useState([]);

  useEffect(() => {
    getAllSections().then((res) => {
      if (res === "error") return;

      let urlPromises = res.map((s) =>
        getExerciseSectionImageUrl(s.id).then((url) => (s.imageUrl = url))
      );

      let countPromises = res.map((s) =>
        countSectionExercises(s.name).then((c) => (s.exerciseCount = c))
      );

      Promise.all([...urlPromises, ...countPromises]).then(() =>
        setExerciseSections(res)
      );
    });
  }, []);

  ///
  ///

  return (
    <>
      <div className="exercises p-[50px] overflow-hidden">
        <p className=" font-extrabold text-2xl lg:text-5xl text-website2">
          Exercises
        </p>
        <div className="exerciese-container  gap-10">
          {exerciseSections?.map((ele, index) => {
            return (
              <React.Fragment key={index}>
                <Link className="w-full" href={`/exercise/${ele.id}`}>
                  {/* <img src={ele.imageUrl} alt="img" /> */}
                  <div
                    style={{
                      backgroundImage: `url(${ele.imageUrl})`,
                    }}
                    className={`exercise relative mt-3 lg:mt-20 h-[400px] shadow-2xl rounded-md bg-repeat-round flex items-center w-full justify-center flex-col cursor-pointer `}
                  >
                    <p className="exercise-title font-bold text-[30px] text-white z-50 w-full text-center ">
                      {ele.name}
                    </p>{" "}
                    <p className=" font-bold text-[20px] mt-3 text-website2  z-50 w-full text-center ">
                      {ele.exerciseCount
                        ? "+" + (ele.exerciseCount - 1) + " Exercises"
                        : ""}
                    </p>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
