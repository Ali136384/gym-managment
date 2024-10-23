"use client";
import { useEffect } from "react";
// 👇 those icons are for the sidebar  s
import { FaHome, FaClipboardList } from "react-icons/fa";

// 👇 this data is for the sidebar

import React from "react";

export default function data() {
  return <div>data</div>;
}

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
