"use client";
import Card from "../../components/website/Card.jsx";
import React from "react";

function page() {
  const dummyData = [
    {
      id: 1,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 2,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 3,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 4,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 5,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 6,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 7,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
    {
      id: 8,
      imgUrl:
        "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      title: "Title of product",
      orderNumber: "#order1244",
      type: "Dark Blue",
      quantity: 10,
      price: "$120.00",
    },
  ];

  return (
    <div className="px-[30px] pb-10 mt-[40px] rounded-lg shadow-md mx-10">
      <p className="text-center font-bold text-3xl">Your shopping cart</p>
      <div className="cards flex flex-col gap-4 mt-10">
        {dummyData?.map((data) => {
          return <Card data={data} />;
        })}
      </div>
    </div>
  );
}

export default page;
