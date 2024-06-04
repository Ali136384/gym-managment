// 👇 those icons are for the sidebar windows

import { BsCalendar2EventFill } from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

// 👇 this data is for the sidebar

export const windows = [
  {
    id: 1,
    hasDropDown: false,
    to: "/panel",
    title: "Home",
    icon: <FaHome size="23px" color="black" />,
    active: true,
  },
  {
    id: 2,
    hasDropDown: true,
    to: "/panel/website",
    title: "Web sitesi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z" />
        <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z" />
        <path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z" />
      </svg>
    ),
    active: false,
  },
  {
    id: 3,
    hasDropDown: false,
    to: "/panel/add-customer",
    title: "Müşteri oluştur",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path d="M23,22H3a1,1,0,0,1-1-1V1A1,1,0,0,0,0,1V21a3,3,0,0,0,3,3H23a1,1,0,0,0,0-2Z" />
        <path d="M15,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,15,20Z" />
        <path d="M7,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,7,20Z" />
        <path d="M19,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,19,20Z" />
        <path d="M11,20a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0V19A1,1,0,0,0,11,20Z" />
      </svg>
    ),
    active: false,
  },
  {
    id: 4,
    to: "/panel/customers",
    hasDropDown: false,
    active: false,
    title: "Müşteriler",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        height="20"
        width="20"
      >
        <path d="m6.5,5c1.379,0,2.5-1.121,2.5-2.5S7.879,0,6.5,0s-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm3.5,12.502v-5.002c0-.827-.673-1.5-1.5-1.5h-4c-.827,0-1.5.673-1.5,1.5v7.5h6v8h-1v-7h-3v7h-1v-7h-2v-8.5c0-1.379,1.121-2.5,2.5-2.5h4c1.379,0,2.5,1.121,2.5,2.5v3.528c-.382.454-.718.947-1,1.474Zm7.5-2.502c-3.584,0-6.5,2.916-6.5,6.5s2.916,6.5,6.5,6.5,6.5-2.916,6.5-6.5-2.916-6.5-6.5-6.5Zm0,12c-3.032,0-5.5-2.468-5.5-5.5s2.468-5.5,5.5-5.5,5.5,2.468,5.5,5.5-2.468,5.5-5.5,5.5Zm.5-6h2.5v1h-2.5v2.5h-1v-2.5h-2.5v-1h2.5v-2.5h1v2.5Z" />
      </svg>
    ),
  },
  {
    id: 5,
    to: "/panel/add-manager",
    title: "Yönetici Oluştur",
    hasDropDown: false,
    active: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path d="m12,8c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.552,0,1,.448,1,1s-.448,1-1,1-1-.448-1-1,.448-1,1-1Zm-4.412,5.334l1.516-.892c.408.34.882.606,1.396.786v1.771h3v-1.771c.515-.18.988-.446,1.396-.786l1.516.892,1.521-2.587-1.526-.896c.063-.3.094-.576.094-.851s-.03-.551-.094-.851l1.526-.896-1.521-2.587-1.516.892c-.408-.34-.882-.606-1.396-.786V0h-3v1.771c-.515.18-.988.446-1.396.786l-1.516-.892-1.521,2.587,1.526.896c-.063.3-.094.576-.094.851s.03.551.094.851l-1.526.896,1.521,2.587Zm1.169-3.007l-.106-.372c-.103-.361-.15-.665-.15-.955s.048-.594.15-.955l.106-.372-1.32-.775.507-.862,1.305.768.273-.273c.431-.432.984-.743,1.604-.903l.375-.098v-1.528h1v1.528l.375.098c.619.16,1.173.472,1.604.903l.273.273,1.305-.768.507.862-1.32.775.106.372c.103.361.15.665.15.955s-.048.594-.15.955l-.106.372,1.32.775-.507.862-1.305-.768-.273.273c-.431.432-.984.743-1.604.903l-.375.098v1.528h-1v-1.528l-.375-.098c-.619-.16-1.173-.472-1.604-.903l-.273-.273-1.305.768-.507-.862,1.32-.775Zm15.243,14.173v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-3.5c-.827,0-1.5.673-1.5,1.5v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-4c-.827,0-1.5.673-1.5,1.5v2.5h-1v-2.5c0-.827-.673-1.5-1.5-1.5h-3.5c-.827,0-1.5.673-1.5,1.5v2.5H0v-2.5c0-1.379,1.121-2.5,2.5-2.5h3.5c.821,0,1.544.403,2,1.015.456-.612,1.179-1.015,2-1.015h4c.821,0,1.544.403,2,1.015.456-.612,1.179-1.015,2-1.015h3.5c1.379,0,2.5,1.121,2.5,2.5Zm-4.25-3.5c1.379,0,2.5-1.121,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Zm0-4c.827,0,1.5.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5.673-1.5,1.5-1.5Zm-10.25,1.5c0,1.379,1.121,2.5,2.5,2.5s2.5-1.121,2.5-2.5-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5Zm4,0c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5.673-1.5,1.5-1.5,1.5.673,1.5,1.5Zm-11.75,0c0,1.379,1.121,2.5,2.5,2.5s2.5-1.121,2.5-2.5-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5Zm4,0c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5.673-1.5,1.5-1.5,1.5.673,1.5,1.5Zm-4.75-2.311c-.621.771-1,1.745-1,2.811v-8c0-1.654,1.346-3,3-3h2.08c-.047.327-.08.66-.08,1h-2c-1.105,0-2,.895-2,2v5.189Zm23-5.189v8c0-1.065-.379-2.04-1-2.811v-5.189c0-1.105-.895-2-2-2h-2c0-.34-.033-.673-.08-1h2.08c1.654,0,3,1.346,3,3Z" />
      </svg>
    ),
  },
  {
    id: 6,
    to: "/panel/managers",
    title: "Yöneticiler",
    hasDropDown: false,
    active: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="m18,15.991c0,2.065-1.042,3.96-2.788,5.068-.133.084-.212.233-.212.4v1.54c0,.553-.448,1-1,1s-1-.447-1-1v-1.54c0-.855.426-1.637,1.141-2.09,1.164-.738,1.859-2.002,1.859-3.379,0-.98-.359-1.915-1-2.641v.375c0,1.657-1.028,2.983-2.501,3.225-.879.138-1.767-.101-2.439-.672-.674-.572-1.06-1.405-1.06-2.287v-.641c-.641.725-1,1.66-1,2.641,0,1.377.695,2.641,1.86,3.379.714.453,1.14,1.234,1.14,2.09v1.54c0,.553-.448,1-1,1s-1-.447-1-1v-1.54c0-.167-.079-.316-.212-.4-1.746-1.108-2.788-3.003-2.788-5.068,0-1.77.777-3.439,2.133-4.582.522-.44,1.233-.534,1.855-.244.624.29,1.012.896,1.012,1.583v1.243c0,.293.129.571.354.763.228.193.521.274.82.223.486-.08.825-.594.825-1.251v-.979c0-.687.388-1.293,1.012-1.583.621-.288,1.333-.194,1.854.245,1.356,1.143,2.134,2.813,2.134,4.583ZM4.5,3c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm4,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm15.5,2v12c0,2.757-2.243,5-5,5-.552,0-1-.447-1-1s.448-1,1-1c1.654,0,3-1.346,3-3v-8H2v8c0,1.654,1.346,3,3,3,.552,0,1,.447,1,1s-.448,1-1,1c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-2,2v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v2h20Z" />
      </svg>
    ),
  },
  {
    id: 7,
    to: "/panel/events",
    active: false,
    hasDropDown: false,
    title: "Olaylar",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z" />
      </svg>
    ),
  },
];

// 👇 This data is for the dashboard (the one where user manage his website) .

export const headerData = [
  {
    id: 1,
    title: "Home",
    to: "/panel/website",
    active: true,
  },
  {
    id: 2,
    title: "Market ",
    to: "/panel/website/market",
    active: false,
  },
  {
    id: 3,
    title: "Plans",
    to: "/panel/website/plans",
    active: false,
  },
  {
    id: 4,
    title: "Exercises ",
    to: "/panel/website/exercises",
    active: false,
  },
  {
    id: 5,
    title: "Managers",
    to: "/panel/website/managers",
    active: false,
  },
];

// 👇 This data is for the rightSideStats (for filtering the income) + for the chart .

export const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
