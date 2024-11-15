"use client";
import React, { useEffect, useState } from "react";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiSaveDown1 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import {
  createTrainer,
  replaceTrainerById,
  deleteTrainerbyId,
  getTrainers,
} from "../../../api/v1/tariner";
import { getTrainerImageUrl, uploadTrainerImage } from "../../../../lib/images";
function page() {
  const [ManagerInEditing, setManagerInEditing] = useState();
  const [openManagers, setOpenManagers] = useState([]);

  let editedManager = null;
  let editedManagerImage = null;

  const [newManager, setNewManager] = useState({
    id: 0,
    job: "",
    name: "",
    description: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [newManagerImage, setNewManagerImage] = useState(null);

  const [managers, setManagers] = useState([]);

  function updateEditedManagerState(event) {
    let key = event.target.name;
    let value = event.target.value;

    editedManager[key] = value;
  }

  async function updateManager() {
    if (!editedManager) return;

    const result = await replaceTrainerById(editedManager.id, editedManager);

    if (result || !editedManagerImage) return;

    await uploadTrainerImage(editedManager.id, editedManagerImage);
  }

  function updateNewManagerState(event) {
    const key = event.target.name;
    const value = event.target.value;

    setNewManager((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function createManager() {
    const result = await createTrainer(newManager);

    if (typeof result === "number" && newManagerImage) {
      await uploadTrainerImage(result, newManagerImage);
    }
  }

  useEffect(() => {
    // Get all trainers
    getTrainers().then(async (response) => {
      if (response !== "error") {
        for (let manager of response) {
          manager.image = await getTrainerImageUrl(manager.id);
        }
        setManagers(response);
        console.log(response);
      }
    });
  }, []);

  return (
    <div className=" m-4 ml-[20%] p-4 rounded-xl">
      <p className="font-bold text-3xl mb-6 ">Managers</p>
      <div className="flex gap-4">
        <div className="create shadow-lg w-[40%] h-max p-3 rounded-lg">
          <p className="font-bold text-center py-3">Create manager</p>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Image</label>
            <input
              className=""
              type="file"
              placeholder="job title"
              onChange={({ target }) =>
                setNewManagerImage(target.files.length ? target.files[0] : null)
              }
            />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Job title</label>
            <input
              className="px-2"
              type="text"
              placeholder="job title"
              name="job"
              onChange={updateNewManagerState}
            />
          </div>{" "}
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Name</label>
            <input
              className="px-2"
              type="text"
              placeholder="Name"
              name="name"
              onChange={updateNewManagerState}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-bold text-md mb-1">Description</label>
            <input
              className="px-2"
              type="text"
              placeholder="Description"
              name="description"
              onChange={updateNewManagerState}
            />
          </div>
          <p className="mt-4 font-bold py-2 border-y-2">
            Social media accounts
          </p>
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Instagram</label>
            <CiInstagram
              color="#C13584"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input
              className="px-2"
              type="text"
              placeholder="Instagram"
              name="instagram"
              onChange={updateNewManagerState}
            />
          </div>{" "}
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Facebook</label>
            <CiFacebook
              color="#1877f2"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input
              className="px-2"
              type="text"
              placeholder="Facebook"
              name="facebook"
              onChange={updateNewManagerState}
            />
          </div>
          <div className="flex flex-col mt-2 relative">
            <label className="font-bold text-md mb-1">Twitter(X)</label>
            <FaXTwitter
              color="#1da1f2"
              size={19}
              className="absolute bottom-1 right-2"
            />
            <input
              className="px-2"
              type="text"
              placeholder="Twitter(X)"
              name="twitter"
              onChange={updateNewManagerState}
            />
          </div>
          <button
            onClick={createManager}
            className="px-4 py-2 rounded-xl bg-green-700 text-white font-bold w-full mt-4"
          >
            Create manager
          </button>
        </div>

        {/* Display Managers */}

        <div className="managers shadow-lg w-[60%] ">
          {managers?.map((ele) => {
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
                    <p className="font-bold">{ele.name}</p>
                    <p>
                      <CiSaveDown1 size={22} />
                    </p>
                  </div>
                  <div className="content mt-10 flex gap-5 relative pt-4">
                    <div className="w-[50%]">
                      {ManagerInEditing && (
                        <>
                          <div className="mb-10 ml-3">
                            <label className="font-bold mb-2">
                              Upload new image :
                            </label>
                            <input
                              type="file"
                              onChange={({ target }) =>
                                (editedManagerImage = target.files.length
                                  ? target.files[0]
                                  : null)
                              }
                            />
                          </div>
                        </>
                      )}
                      <img className="w-[74%]" src={ele.image} alt="" />
                    </div>
                    <div className="w-[50%]">
                      <div>
                        <label className="font-bold" htmlFor="">
                          Name :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.name}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                          name="name"
                          onChange={updateEditedManagerState}
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Job title :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.job}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                          name="job"
                          onChange={updateEditedManagerState}
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Instagram :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.instagram}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                          name="instagram"
                          onChange={updateEditedManagerState}
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Facebook :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.facebook}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                          name="facebook"
                          onChange={updateEditedManagerState}
                        />
                      </div>{" "}
                      <div className="mt-5">
                        <label className="font-bold" htmlFor="">
                          Twitter :{" "}
                        </label>
                        <input
                          disabled={ManagerInEditing === ele.id ? false : true}
                          defaultValue={ele.twitter}
                          className={`px-2 duration-300 ${
                            ManagerInEditing === ele.id && "py-1"
                          }`}
                          type="text"
                          placeholder="name"
                          name="twitter"
                          onChange={updateEditedManagerState}
                        />
                      </div>
                    </div>
                    <div className="flex absolute -top-8 right-4 mb-4 gap-2">
                      {ManagerInEditing === ele.id ? (
                        <MdOutlineCancel
                          size={23}
                          color="green"
                          onClick={() => {
                            setManagerInEditing(null);
                            editedManager = null;
                          }}
                        />
                      ) : (
                        <CiEdit
                          onClick={() => {
                            setManagerInEditing(ele.id);
                            editedManager = ele;
                          }}
                          size={23}
                          color="green"
                        />
                      )}
                      <MdDeleteForever
                        // onClick={() => {
                        //   Swal.fire({
                        //     title: "Do you want to delete the trainer?",
                        //     showDenyButton: true,
                        //     showCancelButton: true,
                        //     confirmButtonText: "delete",
                        //     denyButtonText: `Don't delete`,
                        //   }).then(async (result) => {
                        //     /* Read more about isConfirmed, isDenied below */
                        //     if (result.isConfirmed) {
                        //       if (!(await deleteTrainerbyId(ele.id)))
                        //         Swal.fire("deleted!", "", "success");
                        //       else
                        //         await Swal.fire(
                        //           "Failed to delete",
                        //           "",
                        //           "error"
                        //         );
                        //     } else if (result.isDenied) {
                        //       await Swal.fire(
                        //         "Trainer not deleted",
                        //         "",
                        //         "info"
                        //       );
                        //     }
                        //   });
                        // }}
                        size={23}
                        color="red"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold">Description : </p>
                    <textarea
                      disabled={ManagerInEditing ? false : true}
                      defaultValue={ele.description}
                      className="resize-none outline-none w-full border-2 px-2 mt-2 h-[200px]"
                      name="description"
                      onChange={updateEditedManagerState}
                    />

                    {ManagerInEditing === ele.id && (
                      <>
                        <button
                          onClick={updateManager}
                          className="px-3 py-1 bg-green-700  text-white font-bold w-full "
                        >
                          Submit edits
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
