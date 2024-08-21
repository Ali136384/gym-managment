import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./helper.css";

import storage from "../../app/api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

function Slider({ data, id, min, max, sendedFilterValue, cat }) {
  const [sections, setSections] = useState(data);

  useEffect(() => {
    console.log("product id: " + id);

    async function setImages() {
      for (let product of data.data) {
        product.images = [];

        const response = await listAll(
          ref(storage, `images/products/${product.id}`)
        );
        const urls = await Promise.all(
          response?.items.map((i) => getDownloadURL(i))
        );
        product.images = urls;
      }
    }

    setImages().then(() => setSections((prev) => prev));
  }, []);

  return (
    <>
      {cat === "All" ? (
        <>
          <div className="px-20 flex justify-between items-center">
            <p className="text-website2 font-bold text-xl ">{data.cat}</p>
            <Link href={`/market/${data.cat}`}>
              <button className="shadow-lg px-8 py-2 duration-300 hover:bg-orange-600 text-website2 rounded-md hover:text-white">
                See All
              </button>
            </Link>
          </div>
          {sections.data.filter((ele) => ele.price > min && ele.price < max)
            .length ? (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
            >
              {sections.data
                ?.filter(
                  (ele) =>
                    ele.price > min &&
                    ele.price < max &&
                    (ele.marka
                      .toUpperCase()
                      .includes(sendedFilterValue.toUpperCase()) ||
                      ele.description
                        .toUpperCase()
                        .includes(sendedFilterValue.toUpperCase()))
                )
                ?.map((ele) => (
                  <React.Fragment key={id}>
                    <SwiperSlide className="product shadow-lg flex flex-col  rounded-xl min-w-[250px]">
                      <Link href={`/product/${ele.id}`}>
                        <div className="flex flex-col">
                          {ele.images?.length > 0 ? (
                            <img
                              className="w-full self-center h-[240px] p-[20px]"
                              src={ele.images[0]}
                            />
                          ) : (
                            <>
                              <img
                                className="w-full self-center h-[240px] p-[20px]"
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUVFxcaFxcYFxgaGBoYFxgXFxoXGhcYHSggGholGxcXIjEiJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrLSsrKzcrKystKysrKysrLS0rKysrLS0rLSsrKystKysrKysrKysrKysrKysrKysrK//AABEIARMAtwMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAApEAACAgEBBwQDAQEAAAAAAAAAAQIR8CESMUFRYXGBkbHh8aHB0QMT/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9FZlFUaOHktRKzZxiawQ1EpPNApxWcitnOGaAi4ATGOfRSWpTTzNQoCZIVXrzzwaMHDosziBnWfbDZ6GqgTQEr/FK3rrnYao0SG0Bi30XqEm9DWgkgMlmWLZXXw1n2aqImuYGey+v4IcX86ehs0txLigMXEJxXH2N2iZRQHNKGMDZwzO4BEJDitSo5ljUtXoFFcv2FDopLPsBemdykug1nAqOahS9yuufgqKGteQEeBLM4GopegE14zqPY5fqmNIrZ5gZqJWyWq5bxuO4CK0EX6hQENGck8f8NxVlhGPQTNHFk6ATsg0U4Z9AwMf+efAGrEBjFFVm8UUXsBQo58BGPD9lR8dc4FbICKTCr4C1z2ApPNTRVmaEJ9S4oAa6+tDS8dgrMRWzmgEIMyi6QWAtQSGmMBMSZdCoDNpgy66iAmiJLPg1ZPgDNruDRpRLiBlsdBGuz0AIwiU4kxiaVyzyFJRzQvZHAaQEvrnYM7+Bo0hACV/maRQ7HGgJYF0FEEqIDGgJsdDFsZ8AKhtDE2UTYmW0LOIE5zExsS6AIL5FUyWmAmA0ARzLozREwj1NIRQUJDSzUtR6DoAQ6HEaQCGmVFDj+CBMKGmMCaBIdAkAqHQ0h1zAklxNKBrx5AzoGXQmwM5IKzUaQICXHkKSKbzGJsolugG81GEYwjWKzVGUUXtBVWCTFFWXu0ApFIiMioogdFpE2NAJKimFgAPUaz4EsofgADx7gs+ygIYPN5QmBGzlg0U83iYEPOHuI0ebyWgJa6CopxEyjNxy/gZQAYJFEKJUdQL4D5foSGs5gaxiDJiVZA0NCQ84gFMKGh+Ao2RiCwirJbAVgCG2CY2gM2wstx5EtAKQm81GgoBJibBklDvmIEAHNAtN5/DOK6GuegFWUkTErMZBaBCiin6gMIiKoKbBiUh0EHANNwqziDAsVAABXILBoWZQBYeAEA5Ii80GyG+V5xAomUWGdQ2iiKzcMsQHPAqsxEJFLtj4gNaGqZmjSLIKVD0JTBvPgCr7jsm+Q9oB7QyUCAbYtroArAtMbZKYNeQKTz4CQqGAiWxrNw2BF8dwm8+UOSJfqAnmo1+iHLgUgBoB/kCjniikhUC0AsuJG1oVBkFUNMEgaAA2hDQFpCJKaABNij+RgMaJopMB0MVhEAoUimDAjMRDzcaN5ZLAhoKHJCaApsATz7EUc6KT0ISKT7AWitoiL/hSAuwRO0VFAAZnMdDogIlMlsakACKQmBJS9BUNtAOKK7EJlIBkyQ4sTAlsVCYWUGzQmDYmAOQE3XMAjDb7BtEOuZVhVrzRon6GWbtDWGUBSRdkMpAU2CkJiApvwCfNgxWQWmxWJocWBQLkJsTAdjIliE5AXtBuIi9d4n09ih2FgmTN5mgAxN8hDoBgS2ARyp+pUZGcXmcBRbsK6IlNmKfMtSA1QRzgZx7lJXvApMuLMnX2VFgapjshA2BVgxCsDRPPsmwYZwAGxX0BiAYcBdB1m4CWDZLzUE81CHJivPojZyxUBd6gT5ADjUs+i16mMZGiYGsXa5DoiLLcgqx13zoZ7TGuAFRNIyMyu/ADRSsakZbXAcZgajUrM1IqMgKsGQ3jDaAf4Bi05Euf46hFJjbMdpPr7Ap9gNNpcfb5J2s5kPnn5Jk3vz3A0b4kORLutXncUdeH5/YFpgS5UARxx9DVMyiUpFVspDTMr+io49ANLKTJTGn4IKT4DUuvAmxQjmICnIcWNVwQNgOxqRDZDbA0Uw28xGV5qN2BptchSfqJMmQFRYN9s7E9Psd8P2A9qyZY/oaWXeItvPgCIxCszgG0JvqVAvyIlzGBxKXIcHn7IT7lpgaxKujKLGmFaRl4GmZotvrRBrFl32MrLjLuUUn0G2Q5eRL8gVIkUpEW+/qQaX2LvM4GUWWmUXZD+wvyEpdAiqSJUu5lebvYUXn2BrtjTMlyv8AY0+dgXZPqSmK8xZQD2uoGcn6ABx/5yz7s1jI5YyNFIDosaziY7Q4yA6Et44vLoyTys9TVMDRMecSIhf2BpYKRGcxgNyrP6RKTJcqI2gN4yK2uphEpSeMC3m8G/gaZM+QCcBOQyZMB5u/o1mIylK9wAabXP2FfUzbM3Phn4CNW+QGLYAckX7/AMKg9V2AANXubH/n+mMANv8AIcJewAFaMUXu7jAC/wDR0nWcCJ6egABlN/l/0mejaQAEWnrnI14eggAcHoXLh1oAAhrWuBhtaXx+RAASk16fwHnoxAAf6P2M4vVgAEy3AABH/9k="
                                alt=""
                              />
                            </>
                          )}
                          <div className="w-full p-3 ">
                            <p className="w-[100%] text-sm h-[60px]">
                              <span className=" text-website2 font-bold text-lg mr-1 leading-3">
                                <span className="mr-2">{ele.marka}</span>
                                <span
                                  style={{ overflowWrap: "anywhere" }}
                                  className="text-black opacity-80 text-[14px] "
                                >
                                  {ele.description?.length > 52
                                    ? ele.description.slice(0, 52) + "..."
                                    : ele.description}
                                </span>
                              </span>{" "}
                            </p>
                          </div>
                          <div className="flex justify-between items-center w-full p-3">
                            <p className="text-website2 font-bold">
                              {ele.price} TL
                            </p>
                            <button className="buy-button shadow-md p-2 text-website2 ">
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </React.Fragment>
                ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center my-20 text-website2 font-extrabold">
              No elements found
            </div>
          )}
        </>
      ) : (
        sections.cat === cat && (
          <>
            <div className="px-20 flex justify-between items-center">
              <p className="text-website2 font-bold text-xl ">{data.cat}</p>
              <Link href={`/market/${cat}`}>
                <button className="shadow-lg px-8 py-2 duration-300 hover:bg-orange-600 text-website2 rounded-md hover:text-white">
                  See All
                </button>
              </Link>
            </div>
            {sections.data.filter((ele) => ele.price > min && ele.price < max)
              .length ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log("slide change")}
              >
                {sections.data
                  ?.filter(
                    (ele) =>
                      ele.price > min &&
                      ele.price < max &&
                      (ele.marka
                        .toUpperCase()
                        .includes(sendedFilterValue.toUpperCase()) ||
                        ele.description
                          .toUpperCase()
                          .includes(sendedFilterValue.toUpperCase()))
                  )
                 ?.map((ele) => (
                    <React.Fragment key={id}>
                      <SwiperSlide className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[250px]">
                        <Link href={`/product/${ele.id}`}>
                          <div className="flex flex-col">
                            {ele.images?.length && (
                              <img
                                className="w-full self-center p-[30px]"
                                src={ele.images[0]}
                                alt=""
                              />
                            )}

                            <div className="flex w-full p-3 items-center">
                              <p className="w-[100%] text-sm h-[60px]">
                                <span className=" text-website2 font-bold text-lg mr-1 leading-3">
                                  <span className="mr-2">{ele.marka}</span>
                                  <span className="text-black opacity-80 text-[14px] ">
                                    {ele.description?.length > 52
                                      ? ele.description.slice(0, 52) + "..."
                                      : ele.description}
                                  </span>
                                </span>{" "}
                              </p>
                            </div>
                            <div className="flex justify-between items-center w-full p-3">
                              <p className="text-website2 font-bold">
                                {ele.price} TL
                              </p>
                              <button className="buy-button shadow-md p-2 text-website2 ">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </React.Fragment>
                  ))}
              </Swiper>
            ) : (
              <div className="flex justify-center items-center my-20 text-website2 font-extrabold">
                No elements found
              </div>
            )}
          </>
        )
      )}
    </>
  );
}
export default Slider;
