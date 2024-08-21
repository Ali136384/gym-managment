"use client";
import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../../api/v1/customer";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DateConvertor from "../../../components/dashboard/DateConvertor";
import Link from "next/link";
import { Mosaic } from "react-loading-indicators";
function page() {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [AllCustomers, setAllCustomers] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [lengs, setlngs] = useState(AllCustomers.length);
  const [daysFilter, setDaysFilter] = useState("");
  const [dayORmonthOryear, setDayORmonthOryear] = useState("days");
  const router = useRouter();
  const [filterObject, setFilterObject] = useState([
    { id: 1, active: true, title: "Başlangıç ​​tarihi" },
    { id: 5, active: false, title: "Biten Müşteriler" },
    { id: 2, active: false, title: "Bitiş tarihi" },
    { id: 3, active: false, title: "Fiyat" },
    { id: 4, active: false, title: "Kalan günler" },
  ]);

  let [openToolTip, setOpenToolTip] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCustomers();
        switch (dayORmonthOryear) {
          case "days":
            setAllCustomers(
              result
                ?.filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) < daysFilter
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          case "months":
            setAllCustomers(
              result
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <
                    daysFilter * 30
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          case "years":
            const filterdDate = setAllCustomers(
              result
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) <
                    daysFilter * 365
                )
                .filter(
                  (ele) =>
                    Math.ceil(
                      (new Date(ele.endsAt) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    ) > 0
                )
                .sort(
                  (a, b) =>
                    Math.ceil(
                      (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    ) -
                    Math.ceil(
                      (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                )
            );
            break;
          default:
            break;
        }
        if (daysFilter === "") setAllCustomers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [daysFilter, dayORmonthOryear]);

  useEffect(() => {
    const getAllCust = async () => {
      const result = await getAllCustomers();

      let sortedResult = [...result];

      const activeFilter = filterObject.find((filter) => filter.active);
      if (activeFilter) {
        switch (activeFilter.title) {
          case "Başlangıç ​​tarihi":
            sortedResult.sort(
              (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
            );
            break;
          case "Biten Müşteriler":
            const todayDateString = new Date().toDateString();
            sortedResult = sortedResult.filter(
              (ele) =>
                new Date(ele.endsAt).toDateString() === todayDateString ||
                Math.ceil(
                  (new Date(ele.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                ) < 0
            );
            break;
          case "Bitiş tarihi":
            sortedResult.sort(
              (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
            );
            break;
          case "Fiyat":
            sortedResult.sort((a, b) => b.bucketPrice - a.bucketPrice);
            break;
          case "Kalan günler":
            sortedResult.sort(
              (a, b) =>
                Math.ceil(
                  (new Date(a.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                ) -
                Math.ceil(
                  (new Date(b.endsAt) - new Date()) / (1000 * 60 * 60 * 24)
                )
            );
            break;
          default:
            break;
        }
      }
      setAllCustomers(sortedResult);
      setlngs(sortedResult.length);
      return sortedResult;
    };

    getAllCust().then((d) => console.log(d));
  }, [filterObject]);
  useEffect(() => {
    const newLength = AllCustomers.filter(
      (el) =>
        el.name.toUpperCase().includes(filterValue.toUpperCase()) ||
        el.name.toUpperCase() === filterValue.toUpperCase() ||
        `${el.name + el.surname}`
          .toUpperCase()
          .replace(/\s/g, "")
          .includes(filterValue.toUpperCase().replace(/\s/g, ""))
    ).length;
    setlngs(newLength);
  }, [filterValue]);
  const handelActive = (id) => {
    const activeSort = filterObject?.map((ele) => ({
      ...ele,
      active: ele.id === id,
    }));
    setFilterObject(activeSort);
  };

  const handleSelectClick = () => {
    setSelectIsOpen((prev) => !prev);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const formatNumber = (e) => {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(e);
  };

  const [sortingSentence, setSortingSentence] = useState("Filtre Seç");

  return (
    <>
      <div className="bg-bg_custom min-h-[100vh] pb-10">
        <div className="search ml-[21%]  flex justify-between items-center flex-row-reverse gap-10 mx-8 pt-8">
          <div className="flex flex-row-reverse gap-2">
            <div className="flex px-1 rounded-md bg-white items-center self-baseline w-[400px]">
              <CiSearch size={30} color="gray" className="mr-2 h-[50px]" />
              <input
                style={{ border: "none" }}
                onChange={(e) => setFilterValue(e.target.value)}
                className="py-2 w-full "
                type="text"
                placeholder="Müşteri Ara"
              />
            </div>
            <div
              className={`bg-white relative overflow-hidden rounded-md px-2 duration-300 py-2 w-[220px] ${
                selectIsOpen ? "h-[230px]" : "h-[50px]"
              }`}
            >
              <div
                onClick={handleSelectClick}
                className="h-[50px] w-full absolute z-50 top-0 "
              ></div>
              <div className="flex justify-around items-center mb-4 mt-[5px] z-50">
                <span>
                  <MdOutlineFilterList size={23} color="gray" />
                </span>
                <p className="text-gray-500">{sortingSentence}</p>
                <span
                  className={` duration-700  ${
                    selectIsOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <MdOutlineKeyboardArrowDown size={23} color="gray" />
                </span>
              </div>
              {filterObject?.map((ele) => {
                return (
                  <React.Fragment key={ele.id}>
                    <p
                      onClick={() => {
                        handelActive(ele.id);
                        setSortingSentence(ele.title);
                      }}
                      className={` px-3 py-1 cursor-pointer duration-300 border-b-2 last:border-0 hover:ml-2 hover:border-border_primery hover:text-txt_primery ${
                        ele.active ? "text-black" : "text-black"
                      }`}
                    >
                      {ele.title}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="filtersOntable  flex items-center self-stretch h-[50px]">
            <p className=" mr-2">Customers registeration End </p>
            <input
              onChange={(e) =>
                e.target.value > 0 && setDaysFilter(e.target.value)
              }
              className="bg-white pl-2 rounded-l-md py-1 w-[150px] ml-1 h-[50px] outline-none"
              type="number"
              placeholder="for example : 7"
            />
            <select
              onChange={(e) => {
                daysFilter.length && setDayORmonthOryear(e.target.value);
              }}
              className="outline-none border-[#eee] h-[50px] rounded-md rounded-bl-none rounded-tl-none border-l-2"
              name=""
              id=""
            >
              <option value="days">days</option>
              <option value="months">monthes</option>
              <option value="years">years</option>
            </select>
          </div>
        </div>

        {AllCustomers.length > 0 ? (
          <div className="ml-[21%] relative w-[77%] mt-5 bg-white p-6 rounded-[9px] mb-5">
            <div className="table w-full border-[1px] border-gray-200 rounded-[9px]">
              <div className="t-head flex w-full  border-b-[1px] p-5">
                <p className="w-[14.2%] text-gray-500">İsim</p>
                <p className="w-[14.2%] text-gray-500">Yaş</p>
                <p className="w-[14.2%] text-gray-500">Cinsiyet</p>
                <p className="w-[14.2%] text-gray-500">Paket</p>
                <p className="w-[14.2%] text-gray-500">Başlangıç ​​tarihi</p>
                <p className="w-[14.2%] text-gray-500">Bitiş tarihi</p>
                <p className="w-[14.2%] text-gray-500">Kalan günler</p>
              </div>
              {AllCustomers.length > 0 &&
                AllCustomers.filter(
                  (el) =>
                    el.name
                      ?.toUpperCase()
                      .includes(filterValue.toUpperCase()) ||
                    el.name?.toUpperCase() === filterValue.toUpperCase() ||
                    `${el.name + el.surname}`
                      .toUpperCase()
                      .replace(/\s/g, "")
                      .includes(filterValue.toUpperCase().replace(/\s/g, ""))
                )
                  .sort((a, b) => {
                    switch (sortingSentence) {
                      case "Name":
                        return a.name.localeCompare(b.name);
                      case "Fiyat":
                        return b.bucketPrice - a.bucketPrice;
                      // We can Add more cases if nedde 👍
                      default:
                        return 0;
                    }
                  })
                  ?.map((e) => {
                    return (
                      <React.Fragment key={e.id}>
                        <Link href={`customer/${e.id}`}>
                          <div className="w-full flex justify-between items-center border-b-2 px-4 py-5">
                            <div className="w-[14.2%]">
                              <div
                                onMouseOut={() => setOpenToolTip(null)}
                                onMouseOver={() => setOpenToolTip(e.id)}
                                className="flex items-center gap-2 relative"
                              >
                                <div
                                  className={`absolute tooltip h-7 w-max px-4 py-2  bg-white shadow-sm text-txt_primery -top-9 -left-5 rounded-md ${
                                    openToolTip === e.id
                                      ? "opacity-90"
                                      : "opacity-0"
                                  } duration-75`}
                                >
                                  <p className="font-bold">
                                    {e.name + " " + e.surname}
                                  </p>
                                </div>
                                {e.gender === "Male" ? (
                                  <img
                                    className="h-[30px] rounded-full"
                                    src="https://w7.pngwing.com/pngs/246/366/png-transparent-computer-icons-avatar-user-profile-man-avatars-logo-monochrome-black-thumbnail.png"
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="h-[30px] rounded-full"
                                    src="https://www.stubai.com/wp-content/uploads/2021/03/computer-icons-user-women-avatar-22ded174b35a982e8fe2343df9c73dde.png"
                                    alt=""
                                  />
                                )}
                                <p>
                                  {(e.name + " " + e.surname).length > 10
                                    ? (e.name + " " + e.surname).slice(0, 8) +
                                      "..."
                                    : e.name + " " + e.surname}
                                </p>
                              </div>
                            </div>
                            <p className="w-[14.2%]">{e.age}</p>
                            <p className="w-[14.2%]">{e.gender}</p>
                            <div className="w-[14.2%] ">
                              <div className="w-[55%] bg-[#ec5c232c] flex items-center justify-center py-2 rounded-[9px]   text-center">
                                <p className="text-txt_secondery font-bold">
                                  {formatNumber(e.bucketPrice)}
                                </p>
                              </div>
                            </div>
                            <p className="w-[14.2%]">
                              {
                                <DateConvertor
                                  date={new Date(e.startedAt).toDateString()}
                                />
                              }
                            </p>
                            <p className="w-[14.2%]">
                              <DateConvertor
                                date={new Date(e.endsAt).toDateString()}
                              />
                            </p>
                            <p className="w-[14.2%]">
                              {Math.ceil(
                                (new Date(e.endsAt) - new Date()) /
                                  (1000 * 60 * 60 * 24)
                              )}
                            </p>
                          </div>
                        </Link>
                      </React.Fragment>
                    );
                  })}
            </div>
          </div>
        ) : (
          <>
            <div className="ml-[55%] mt-[10%]">
              <Mosaic
                color="rgb(251 107 47/ var(--tw-bg-opacity))"
                size="medium"
                text=""
                textColor=""
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default page;
