"use client";
import React from "react";
import { useState } from "react";

function ChangePassword() {
  const [oldPass, setOldPassword] = useState();
  const [newPass, setNewPassword] = useState();
  const [confirm, setconfirmPassword] = useState();
  return (
    <>
      <div className="card min-h-[300px] bg-white shadow-xl rounded-[31px]flex flex-col gap-10 p-5">
        <p className=" font-bold  text-center">Change password</p>
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
        <button className=" bg-customRed w-max px-10 py-2 rounded-lg self-center text-white font-bold">
          Submit
        </button>
      </div>
    </>
  );
}

export default ChangePassword;
