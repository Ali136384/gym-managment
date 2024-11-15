"use client";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import "./plans.css";
import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

import {
  addPlan,
  getHomePlans,
  deletePlanById,
  replacePlan,
} from "../../../api/v1/dashboard";
import { uploadPlanImage, getPlanImageUrl } from "../../../../lib/images";

function page() {
  // Mohamed's Changes
  //

  // This is what a single plan looks like
  const [plans, setPlans] = useState([
    {
      id: 0,

      title: "",
      description: "",
      price: 0,
      duration: "",
      features: [""],
      imageURL: "",

      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    },
  ]);

  useEffect(() => {
    getHomePlans().then((response) => {
      if (response === "error") return;

      // Get image URLs then setPlans
      Promise.allSettled(
        response?.map((p) =>
          getPlanImageUrl(p.id).then((url) => (p.imageURL = url))
        )
      ).then(() => setPlans(response));
    });
  });

  async function createPlan({
    title, // string
    description, // string
    price, // number
    duration, // string
    features, // array of strings
  }) {
    await addPlan(arguments[0]);
  }

  async function deletePlan(id) {
    await deletePlanById(id);
  }

  async function uploadImage(id, image) {
    await uploadPlanImage(id, image);
  }

  /**
   *
   * @param {number} id
   * @param {{ title: string, description: string, price: number, duration: string, features: string[] }} data
   */
  async function updatePlan(id, data) {
    await replacePlan(id, data);
  }

  //
  // End of Mohamed's Changes

  const [PlanInEditing, setPlanInEditing] = useState();
  const [openManagers, setOpenManagers] = useState([]);
  const [userEditedAField, setUserEditedAField] = useState(false);

  return (
    <div className=" m-4 ml-[22%] p-4 rounded-xl">
      <p className="font-bold text-3xl mb-6 ">Plans</p>
      <div className="flex gap-4 ">
        <div className="create shadow-lg w-[40%] h-max p-3 rounded-lg">
          <p className="font-bold text-center py-3">Create Plan</p>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Image</label>
            <input className="" type="file" placeholder="job title" />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Name</label>
            <input className="px-2" type="text" placeholder="job title" />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Description</label>
            <textarea
              className="px-2 resize-none outline-none h-[200px] border-2 rounded-xl"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Price</label>
            <input className="px-2" type="text" placeholder="Price" />
          </div>
          <button className="px-4 py-2 rounded-xl bg-green-700 text-white font-bold w-full mt-4">
            Create Plan
          </button>
        </div>
        <div className="managers shadow-lg w-[60%] ">
          {plans?.map((ele) => {
            return (
              <>
                <div
                  className={`manager mx-3 mt-4 pb-6 shadow-md duration-300 overflow-hidden relative ${
                    openManagers.includes(ele.id) ? "h-max" : "h-[55px]"
                  }`}
                >
                  <div
                    onClick={() => {
                      if (openManagers.includes(ele.id)) {
                        setOpenManagers(
                          openManagers.filter((id) => id !== ele.id)
                        );
                      } else {
                        setOpenManagers([...openManagers, ele.id]);
                      }
                    }}
                    className="header flex items-center justify-between px-2 h-[55px]"
                  >
                    <p className="font-bold">{ele.title}</p>
                    <p>
                      <CiSaveDown1 size={22} />
                    </p>
                  </div>
                  <div className="content mt-10 flex gap-5 relative pt-4">
                    <div className="w-[50%]">
                      {PlanInEditing && (
                        <>
                          <div className="flex flex-col">
                            <label className="font-bold mb-1" htmlFor="">
                              Upload new Image :
                            </label>
                            <input type="file" className="mb-4" />
                          </div>
                        </>
                      )}
                      <img
                        className="w-[100%] max-h-[300px]"
                        src={ele.image}
                        alt=""
                      />
                    </div>
                    <div className="w-[50%]">
                      <div>
                        <label className="font-bold" htmlFor="">
                          Name :{" "}
                        </label>
                        <input
                          onChange={() => setUserEditedAField(true)}
                          disabled={PlanInEditing === ele.id ? false : true}
                          defaultValue={ele.title}
                          className={`px-2 duration-300 ${
                            PlanInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Price :{" "}
                        </label>
                        <input
                          onChange={() => setUserEditedAField(true)}
                          disabled={PlanInEditing === ele.id ? false : true}
                          defaultValue={ele.price}
                          className={`px-2 duration-300 ${
                            PlanInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Features :{" "}
                        </label>
                        <div>
                          {ele.features?.map((ele) => {
                            return (
                              <>
                                <div className="flex ">
                                  <input
                                    onChange={() => setUserEditedAField(true)}
                                    disabled={PlanInEditing ? false : true}
                                    defaultValue={ele}
                                    className="bg-gray-100 border-2 px-3 py-1 w-full mb-3"
                                  />
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>{" "}
                    </div>
                    <div className="flex absolute -top-8 right-0 mb-4 gap-2">
                      {PlanInEditing === ele.id ? (
                        <MdOutlineCancel
                          color="green"
                          size={23}
                          onClick={() => {
                            userEditedAField
                              ? Swal.fire({
                                  title: "Do you want to ignore the changes?",
                                  showDenyButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: "Ignore",
                                  denyButtonText: `Apply `,
                                }).then((result) => {
                                  /* Read more about isConfirmed, isDenied below */
                                  if (result.isConfirmed) {
                                    Swal.fire(
                                      "Changes will not be applied !",
                                      "",
                                      "error"
                                    );
                                  } else if (result.isDenied) {
                                    Swal.fire(
                                      "Changes are Saved !",
                                      "",
                                      "success"
                                    );
                                    setPlanInEditing(null);
                                  }
                                })
                              : setPlanInEditing(null);
                          }}
                        />
                      ) : (
                        <CiEdit
                          onClick={() => {
                            setPlanInEditing(ele.id);
                          }}
                          size={23}
                          color="green"
                        />
                      )}
                      <MdDeleteForever
                        onClick={() => {
                          Swal.fire({
                            title: "Do you want to delete the plan?",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "delete",
                            denyButtonText: `Don't delete`,
                          }).then(async (result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              Swal.fire("Deleted!", "", "success");
                              await deletePlan(Number(ele.id));
                            } else if (result.isDenied) {
                              Swal.fire("Plan not deleted", "", "info");
                            }
                          });
                        }}
                        size={23}
                        color="red"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold">Description : </p>
                    <textarea
                      onChange={() => setUserEditedAField(true)}
                      disabled={PlanInEditing ? false : true}
                      defaultValue={ele.description}
                      className="resize-none outline-none w-full border-2 px-2 mt-2 h-[200px] overflow-y-auto py-2"
                    />

                    {PlanInEditing && (
                      <>
                        <button className="w-full mt-3 bg-green-700 font-bold text-white rounded-xl px-3 py-1">
                          Submit edits !
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
