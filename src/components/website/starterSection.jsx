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

function starterS() {
  const [edited, setEdited] = useState(false);
  const [gymTitle, setGymTitle] = useState("");
  const [generalInfo, setGeneralInfo] = useState(null);

  const [categoreies, setCategories] = useState([]);
  const [allProductCategories, setAllProductCategories] = useState([]);

  const [image, setImage] = useState(null);

  useEffect(() => {
    getHomeGeneralInfo().then((d) => {
      setGeneralInfo(d === "error" || d === "unauthorized" ? null : d);
      setGymTitle(d.title);
    });

    getProductCategories().then((c) => {
      if (c === "error") {
        console.log("error");
      } else {
        setAllProductCategories(c.map((ele) => ele.name));
        console.log(allProductCategories);
        setCategories(c.map((cat) => cat.name));
      }
    });
  }, []);

  //handelUpdatingStarter

  const handelUpdatingStarter = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateHomeGeneralInfo({
          title: gymTitle,
          description: generalInfo?.description,
          starter: generalInfo?.sentence,
          secondSentence: generalInfo?.secondSentence,
          description: generalInfo?.description,
        });
        if (image !== null) {
          var extension = image.name.includes(".")
            ? image.name.substring(
                image.name.lastIndexOf(".") + 1,
                image.name.length
              )
            : "";
          const imagesRef = ref(storage, "images/");

          const allImages = await listAll(imagesRef);

          const gymHomeBackImage = allImages.items.find((i) =>
            i.name.startsWith("gymHomeBackImage")
          );

          if (gymHomeBackImage) {
            const imageRef = ref(storage, `images/${gymHomeBackImage.name}`);
            await deleteObject(imageRef);
          }

          const imageRef = ref(storage, `images/gymHomeBackImage.${extension}`);
          try {
            await uploadBytes(imageRef, image);
          } catch (e) {
            console.log("failed to upload image: " + e);
          }
        }
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // end handelUpdatingStarter

  return (
    <>
      {/* Start starter Blog */}

      <p className="font-bold text-3xl mb-6 ml-10 mt-5 ">Home</p>

      <p className=" font-bold text-center text-xl">Starter Section</p>
      <div
        id="starter"
        className=" border-b-2 pb-12  grid grid-cols-2 gap-7 shadow-lg p-7 rounded-xl "
      >
        <div className="1 flex flex-col">
          <label htmlFor="">Gym title</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="Gym title"
            name="title"
            value={gymTitle}
            onChange={(e) => {
              setGymTitle(e.target.value);
              setEdited(true);
            }}
          />
        </div>
        <div className="2 flex flex-col">
          <label htmlFor="">starter sentence</label>
          <input
            type="text"
            defaultValue="default value"
            placeholder="starter sentence"
            name="starter-center"
            value={generalInfo?.sentence}
            onChange={(e) => {
              setGeneralInfo((g) => {
                return { ...g, sentence: e.target.data };
              });
              setEdited(true);
            }}
          />
        </div>
        <div className="2 flex flex-col">
          <label htmlFor="">second starter sentence</label>
          <input
            type="text"
            defaultValue="default value"
            placeholder="starter sentence"
            name="starter-center"
            value={generalInfo?.secondSentence}
            onChange={(e) => {
              setGeneralInfo((g) => {
                return { ...g, secondSentence: e.target.data };
              });
              setEdited(true);
            }}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="image">Background image</label>
          <input
            type="file"
            className="third border-none bg-white"
            name="image"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setEdited(true);
            }}
          />
        </div>

        <button
          className="h-[35px] mt-[24px] bg-green-700 text-white rounded-xl cursor-pointer"
          disabled={!edited}
          type="submit"
          onClick={handelUpdatingStarter}
        >
          Update
        </button>
      </div>

      {/* End starter Blog */}
    </>
  );
}

export default starterS;
