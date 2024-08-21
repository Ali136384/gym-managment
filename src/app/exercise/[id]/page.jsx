"use client";
import React, { useEffect, useState } from "react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { useParams } from "next/navigation";

import { getAllExcercisesOfSection } from "../../api/v1/excercises";
import {
  getExerciseSectionImageUrl,
  getExerciseVideoUrl,
} from "../../../lib/images";

function page() {
  const [openArray, setOpenArray] = useState([1]);

  const handleOpenArray = (id) => {
    if (openArray.includes(id)) {
      setOpenArray((prevArray) => prevArray.filter((ele) => ele !== id));
    } else {
      setOpenArray((prevArray) => [...prevArray, id]);
    }
  };

  ///
  ///
  const { id } = useParams();

  const [sectionImageUrl, setSectionImageUrl] = useState("");

  /*
    id: number;
    name: string;
    description: string;
    categoryId: number;
    videoUrl: string
  */
  const [exercises, setExerices] = useState([]);

  useEffect(() => {
    getAllExcercisesOfSection(Number(id)).then((res) => {
      if (res !== "error") {
        // section image
        getExerciseSectionImageUrl(Number(id)).then(setSectionImageUrl);

        // exercise videos
        let promises = res.map((e) =>
          getExerciseVideoUrl(e.id).then((url) => (e.videoUrl = url))
        );

        Promise.allSettled(promises).then(() => {
          setExerices(res);
        });

        console.log(`Exercise URL: ${exercises}`);
        console.log(`Section URL: ${sectionImageUrl}`);
      }
    });
  }, []);
  ///
  ///

  return (
    <>
      <div className="p-[50px]">
        <p className=" font-extrabold text-3xl text-website2">
          Biecips Exercises
        </p>
        <div className="exer-image mt-5 flex gap-10">
          <div className="exer-left-image bg-orange-400 h-[490px] w-[35%] overflow-hidden rounded-xl">
            <img className="h-full" src={sectionImageUrl} alt="" />
          </div>
          <div className="exer-right w-[63%] rounded-xl">
            <div className="exer-exercises flex flex-col gap-6">
              {exercises?.map((ele) => {
                return (
                  <div key={ele.id} onClick={() => handleOpenArray(ele.id)}>
                    <div
                      className={`exer shadow-lg pl-3 rounded-xl overflow-hidden duration-300 ${
                        openArray.includes(ele.id) ? "h-[430px]" : "h-[40px]"
                      } `}
                    >
                      <div className="title flex justify-between items-center ">
                        <p className="font-extrabold text-xl ">{ele.name}</p>
                        <p className="pr-2 w-[50%] flex justify-end ">
                          {openArray.includes(ele.id) ? (
                            <BsArrowUpCircleFill size={23} color="#ed563b" />
                          ) : (
                            <BsArrowDownCircleFill size={23} color="#ed563b" />
                          )}
                        </p>
                      </div>
                      <div className="exer-contrent flex w-full h-[90%] ">
                        <div className="video w-[100%]">
                          <iframe
                            className="w-full h-[360px] my-5 rounded-lg"
                            src={ele.videoUrl}
                            frameborder="0"
                            allowfullscreen
                          ></iframe>
                        </div>
                        <div className="description w-full pl-10 mt-5 font-bold pr-5 h-[90%]">
                          {ele.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
