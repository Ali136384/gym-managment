"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import CreateForm from "../../../components/website/CreateForm.jsx";
import {
  getHomeGeneralInfo,
  getAdsInfo,
  updateAdsInfo,
} from "../../api/v1/dashboard.ts";
import storage from "../../api/v1/firebase.ts";
import { listAll, ref, uploadBytes, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";

export default function HomePage() {
  const [edited2, setEdited2] = useState(false);

  const [generalInfo, setGeneralInfo] = useState({
    title: "",
    sentence: "",
    secondSentence: "",
    planDescription: "",
  });

  const [adsTitle, setAdsTitle] = useState("");
  const [adsDescription, setAdsDescription] = useState("");
  const [adsImage, setAdsImage] = useState(null);

  useEffect(() => {
    fetchGeneralInfo();
    fetchAdsInfo();
  }, []);

  const fetchGeneralInfo = async () => {
    const data = await getHomeGeneralInfo();
    if (data !== "error" && data !== "unauthorized") {
      setGeneralInfo(data);
    }
  };

  const fetchAdsInfo = async () => {
    const data = await getAdsInfo();
    if (data !== "error" && data !== "unauthorized") {
      setAdsTitle(data.title);
      setAdsDescription(data.description);
    }
  };

  const handleImageChange = (e) => {
    setAdsImage(e.target.files[0]);
    setEdited2(true);
  };

  const handleTitleChange = (e) => {
    setAdsTitle(e.target.value);
    setEdited2(true);
  };

  const handleDescriptionChange = (e) => {
    setAdsDescription(e.target.value);
    setEdited2(true);
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (result.isConfirmed) {
      const updateResult = await updateAdsInfo({
        title: adsTitle,
        description: adsDescription,
      });

      if (updateResult === "success" && adsImage) {
        try {
          const extension = adsImage.name.includes(".")
            ? adsImage.name.substring(
                adsImage.name.lastIndexOf(".") + 1,
                adsImage.name.length
              )
            : "";
          const imagesRef = ref(storage, "images/");
          const allImages = await listAll(imagesRef);
          const adsBackgroundImage = allImages.items.find((item) =>
            item.name.startsWith("adsBackgroundImage")
          );

          if (adsBackgroundImage) {
            const imageRef = ref(storage, `images/${adsBackgroundImage.name}`);
            await deleteObject(imageRef);
          }

          const imageRef = ref(
            storage,
            `images/adsBackgroundImage.${extension}`
          );
          await uploadBytes(imageRef, adsImage);
          Swal.fire("Saved!", "", "success");
        } catch (error) {
          console.log("failed to upload ads background image: " + error);
        }
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <React.Fragment>
      <div className="events pl-[19%] shadow-md flex justify-center pt-6 gap-[40px] p-3 bg-bg_custom min-h-[90vh]">
        <CreateForm />
        <CreateForm />
      </div>
    </React.Fragment>
  );
}
