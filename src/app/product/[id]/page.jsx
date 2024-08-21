"use client";
import React, { useEffect, useState } from "react";
import { Slide, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getProductById, getProductsOfCategory } from "../../api/v1/dashboard";
import { BallTriangle } from "react-loader-spinner";
import "../helper.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Carousel from "../../../hooks/Carousel";
import { getProductImageUrls } from "../../../lib/images";

function page() {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProductById(Number(id));
        if (productResponse === "error" || productResponse === "notFound")
          return;

        const productImages = await getProductImageUrls(Number(id));
        setImages(productImages);
        setProduct(productResponse);
        const productsOfCategory = await getProductsOfCategory(
          productResponse.category.name
        );
        if (productsOfCategory !== "error") {
          const productsWithImages = await Promise.all(
            productsOfCategory?.map(async (p) => {
              const imageUrls = await getProductImageUrls(p.id);
              p.images = imageUrls;
              return p;
            })
          );
          setProducts(productsWithImages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="lg:px-20 p-3 lg:pt-10 flex flex-col lg:flex-row justify-between gap-8 h-[550px]">
        <div className="slide-container lg:w-[25%] border-2 p-10 h-[400px]  rounded-md">
          <Carousel data={images} />
        </div>
        <div className="tow flex-1 ">
          <div className="product-name border-2 p-2 rounded-md ">
            <p className="text-center text-4xl">
              <span className="mr-2 font-bold text-website2">
                {product?.name ?? ""}
              </span>
            </p>
          </div>
          <div className="product-name border-2 p-2 rounded-md mt-4 min-h-[270px] max-h-[270px] overflow-y-auto flex flex-col justify-between pb-10">
            <p className="text-center text-black text-[16.5px]">
              {product?.description ?? ""}
            </p>
          </div>
          <div className="price border-2 h-[45px] text-website2  rounded-md mt-2 p-2 flex justify-between hover:bg-orange-600 duration-300 cursor-pointer hover:text-white">
            <a
              target="_blank"
              className="w-full flex justify-between items-center "
              href={`https://wa.me/+905399127498?text=Hello sr how are you ?`}
            >
              <button className="font-bold">Buy Now!</button>
              <span className="">{product?.price ?? 0} TL</span>
            </a>
          </div>
        </div>
      </div>

      <div className="products-has-same-category lg:px-20 p-3">
        <p className="font-bold text-website2 text-center lg:text-start text-2xl mt-10">
          Similar products{" "}
        </p>
      </div>

      {/* Start smilar products */}

      <div className="container-site">
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        {products.length ? (
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {products?.map((ele) => {
              return (
                <>
                  <SwiperSlide
                    key={ele.id}
                    className="product shadow-lg flex flex-col lg:justify-center  rounded-xl lg:min-w-[300px]"
                  >
                    <Link href={`/product/${ele.id}`}>
                      <div className=" flex lg:flex-col flex-wrap min-h-[410px] justify-between">
                        {ele.images?.length && (
                          <img
                            className="w-[220px] self-center"
                            src={ele.images[0]}
                          />
                        )}
                        <div className="flex w-full p-3 items-start min-h-[50px]">
                          <p className="w-[100%] text-sm">
                            <span className=" text-website2 font-bold text-lg mr-1">
                              {ele.marka}
                            </span>{" "}
                            {ele.description.length > 70
                              ? ele.description.slice(0, 70) + "..."
                              : ele.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full p-3">
                          <p className="text-website2">{ele.price} TL</p>
                          <button className="buy-button shadow-md p-2 text-website2 ">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        ) : (
          <div className="flex justify-center items-center my-20">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#ed563b"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>

      {/* End smilar products */}
    </>
  );
}

export default page;
