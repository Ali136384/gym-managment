"use client";
import React, { useEffect, useState } from "react";
import {
  getHomeGeneralInfo,
  updateHomeGeneralInfo,
  getProductCategories,
} from "../../app/api/v1/dashboard";

// Firebase

import storage from "../../app/api/v1/firebase";
import { listAll, ref, uploadBytes, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";
import Image from "next/image";
import Input from "../dashboard/Input";
import Button from "./Button";

function CraeteForm({ title }) {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  //handelUpdatingStarter

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };
  // end handelUpdatingStarter

  return (
    <div
      id="starter"
      className=" border-b-2 pb-12 w-[43%] bg-white  gap-7 shadow-lg p-7 rounded-xl "
    >
      <p className=" font-bold text-2xl pb-3">{title}</p>

      <div className="flex flex-col gap-4">
        <label
          className={`h-36 w-full relative flex items-center justify-center mb-4 border-dotted border-2 rounded-lg ${
            isDragging
              ? "border-blue-500 bg-blue-100"
              : "border-border_primery bg-[#a59fa912]"
          }`}
          htmlFor="image"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="content  flex items-center flex-col gap-2">
            {preview ? (
              <div className="h-full w-full">
                <button
                  className=" absolute top-2 left-2 bg-bg_primery text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-bg_secondery"
                  onClick={removeImage}
                  type="button"
                >
                  ✕
                </button>
                <img
                  width={110}
                  src={preview}
                  alt="Preview"
                  className=" object-cover rounded-lg"
                />
              </div>
            ) : (
              <React.Fragment>
                <div className="img">
                  <Image
                    width={35}
                    height={35}
                    src="/imgIcon.png"
                    alt="icon for upload image"
                  />
                </div>
                <div className="sentences flex flex-col gap-1 items-center justify-center">
                  <div className="fiest-sentnce">
                    <p className="font-bold text-sm">Background Image</p>
                  </div>
                  <div className="second-sentnce">
                    <p className="text-xs text-txt_primery">
                      Click to upload{" "}
                      <span className="text-black">or drag and drop</span>
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </label>
        <input
          type="file"
          className="hidden"
          name="image"
          id="image"
          onChange={handleFileChange}
        />
        {image && (
          <div className="mt-2">
            <p className="text-sm">Uploaded File: {image.name}</p>
          </div>
        )}
      </div>

      <Input placeholder="waititing sallum" label={"second starter sentence"} />
      <Input placeholder="waititing sallum" label={"second starter sentence"} />
      <Input placeholder="waititing sallum" label={"second starter sentence"} />
      <Input placeholder="waititing sallum" label={"second starter sentence"} />
      <Button />
    </div>
  );
}

export default CraeteForm;
