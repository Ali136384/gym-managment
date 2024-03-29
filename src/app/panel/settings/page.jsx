"use client";
import React, { useState, useEffect } from "react";
import {
  changeUserName,
  changeGymName,
  getCurrentUser,
} from "../../api/v1/user";
import { changePassword } from "../../api/v1/auth";
import img from "../images/theme-test.png";
function page() {
  const [oldPass, setOldPassword] = useState();
  const [user, setUser] = useState({});
  const [gymName, setGymName] = useState("");
  const [newPass, setNewPassword] = useState();
  const [confirm, setconfirmPassword] = useState();
  const [hasBorder, setHasBorder] = useState([]);
  const [notFound, setNotFound] = useState(null);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setNotFound(u == null);
      setUser(u);
    });
  }, []);

  const themes = [
    { id: 1, firstColor: "red-400", secondeColor: "green-400" },
    { id: 2, firstColor: "blue-900", secondeColor: "yellow-500" },
    { id: 3, firstColor: "purpule", secondeColor: "black" },
    { id: 4, firstColor: "skyblue", secondeColor: "green" },
    { id: 5, firstColor: "red", secondeColor: "green" },
    { id: 6, firstColor: "red", secondeColor: "green" },
  ];
  return (
    <>
      {notFound || !user ? (
        <>Not Found</>
      ) : (
        <div className="settings ml-[23%] mt-5  mr-4 p-4 rounded-[31px] gap-10">
          <div>
            <div className="card h-full min-h-[300px] bg-white shadow-xl rounded-xl flex flex-col justify-around gap-10 p-5">
              <p className=" font-bold  text-center">General settings</p>
              <input
                onChange={(e) => setOldPassword(e.target.value)}
                className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
                type="text"
                placeholder="old password"
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
                type="text"
                placeholder="new password"
              />
              <input
                onChange={(e) => setconfirmPassword(e.target.value)}
                className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
                type="text"
                placeholder="confirm password"
              />
              <button
                disabled
                onClick={async () => {
                  await changePassword(oldPass, newPass);
                }}
                className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
          <div>
            <div className="card h-[200px] bg-white shadow-xl  rounded-xl flex flex-col gap-5 p-3 justify-between mb-2">
              <p className=" font-bold  text-center">Change Gym name</p>
              <input
                className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
                type="text"
                placeholder="new name"
                onChange={(e) => setGymName(e.target.value)}
                value={gymName}
              />
              <button
                onClick={async () => {
                  await changeGymName(gymName);
                }}
                disabled
                className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer"
              >
                Update
              </button>
            </div>{" "}
            <div className="card h-[200px] bg-white shadow-xl rounded-xl flex flex-col justify-between gap-5 p-3">
              <p className=" font-bold  text-center">Change manager name</p>
              <input
                value={user.name}
                className=" border-2 p-2 rounded-xl shadow-xl hover:scale-[1.03] duration-300"
                type="text"
                placeholder="new name"
              />
              <button className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold cursor-pointer">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start themes */}
      {/* Start themes */}
      {/* Start themes */}
      {/* Start themes */}
    </>
  );
}

export default page;
