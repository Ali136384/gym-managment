"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image.js";
import Input from "./dashboard/Input";

export default function HomePage({ children }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      const [removedImage] = updatedImages.splice(index, 1);
      if (removedImage.preview) {
        setTimeout(() => URL.revokeObjectURL(removedImage.preview), 0);
      }
      return updatedImages;
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return (
    <React.Fragment>
      <div className="events shadow-md pt-6 gap-[40px] p-3 bg-bg_custom min-h-[90vh]">
        <div className="emptyPage ml-[21.5%] bg-white min-h-[100vh] w-[78%] rounded-lg p-7">
          <div className="header flex justify-between items-center">
            <div className="title font-bold text-lg">Create Product</div>
            <div className="buttons flex gap-4">
              <div className="cancel-button cursor-pointer border-border_secondery border-2 w-[85px] h-[40px] text-txt_secondery font-[600] text-sm flex items-center justify-center rounded-md">
                Cancel
              </div>
              <div className="create-button cursor-pointer min-w-max border-border_secondery bg-bg_secondery text-white font-[600] text-sm border-2 w-[140px] h-[40px] flex items-center justify-center rounded-md">
                Create Product
              </div>
            </div>
          </div>
          <div className="content mt-5">
            <div className="upload-image">
              <div className="flex w-full   gap-4">
                <label
                  className={`h-36 w-[20%] relative flex items-center justify-center mb-4 border-dotted border-2 rounded-lg ${
                    isDragging
                      ? "border-blue-500 bg-blue-100"
                      : "border-border_primery bg-[#a59fa912]"
                  }`}
                  htmlFor="image"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="content flex items-center flex-col gap-2">
                    <div className="img">
                      <Image
                        width={35}
                        height={35}
                        src="/imgIcon.png"
                        alt="icon for upload image"
                      />
                    </div>
                    <div className="sentences flex flex-col gap-1 items-center justify-center">
                      <div className="first-sentence">
                        <p className="font-bold text-sm">Background Images</p>
                      </div>
                      <div className="second-sentence">
                        <p className="text-xs text-txt_primery">
                          Click to upload{" "}
                          <span className="text-black">or drag and drop</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
                <input
                  multiple
                  type="file"
                  className="hidden"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                />
                <div className="previews flex flex-row flex-wrap gap-10 ">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        className="absolute top-2 left-2 bg-bg_primery text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-bg_secondery"
                        onClick={() => removeImage(index)}
                        type="button"
                      >
                        ✕
                      </button>
                      <img
                        src={image.preview}
                        className="h-32 w-32 object-cover rounded-lg shadow-lg p-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-content w-full grid grid-cols-2 mt-5 gap-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
