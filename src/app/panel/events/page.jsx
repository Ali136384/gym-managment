"use client";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../api/v1/events";
import Link from "next/link";
import DateConverter from "../../../components/dashboard/DateConvertor";
import { IoPersonAddOutline } from "react-icons/io5";
import { Router } from "react-router-dom";

function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvents();
        setAllEvents(events);
        console.log(events);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setFetchError("unauthorized");
        } else {
          setFetchError("error");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="events pl-[20%]  shadow-md  p-3 flex flex-col bg-bg_custom min-h-[100vh]">
      {fetchError ? (
        <div>{fetchError === "unauthorized" ? "Unauthorized" : "Error"}</div>
      ) : (
        <>
          <div className=" bg-white rounded-md w-[96%] ml-8 mr-4">
            {allEvents
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              ?.map((event) => {
                return (
                  <div key={event.id}>
                    <EventItem key={event.id} event={event} />
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

function EventItem({ event }) {
  return (
    <>
      <div className="flex justify-between mx-5 py-5 border-b-2">
        <div className="flex gap-3 items-center">
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-md ${
              event.event === "create"
                ? "bg-[#edebff]"
                : event.event === "delete"
                ? "bg-[#ffeaea]"
                : event.event === "update"
                ? "bg-yellow-300"
                : ""
            }`}
          >
            <IoPersonAddOutline />
          </div>
          <div>
            <p className="mb-[1px]">
              {event.event === "create"
                ? "Created Customer"
                : event.event === "delete"
                ? "Deleted Customer"
                : event.event === "update"
                ? "Updated Customer"
                : ""}
            </p>
            <span className="text-sm opacity-75">
              <DateConverter date={new Date(event.date).toDateString()} />

              <span className="ml-2 opacity-85 text-sm">
                ({new Date(event.date).getHours().toString().padStart(2, "0")}:
                {new Date(event.date).getMinutes().toString().padStart(2, "0")})
              </span>
            </span>
          </div>
        </div>
        <div>
          <Link href={`/panel/customer/${event.id}`}>
            <button className="border-[1px] duration-700 hover:text-white hover:shadow-sm hover:bg-bg_secondery border-border_secondery py-3 px-7 rounded-md text-txt_secondery font-bold">
              Details
            </button>
          </Link>
        </div>
      </div>
    </>
    // <div className="added-event ml-2 flex justify-between items-center px-4 py-8 border-b-2">
    //   <div className="event-info flex gap-2 flex-1 mx-4">
    //     <span
    //       className={`h-[25px] w-[25px] rounded-full ${eventColor} block`}
    //     />
    //     <div className="flex justify-between w-full">
    //       <p className="details-about-user">
    //         {event.event + "d"} {event.target}
    //       </p>
    //       <Link
    //         href={`/panel/${
    //           event.target === "customer" ? "customer" : "manager"
    //         }/${event.id}`}
    //         className={`details ${eventColor} cursor-pointer px-3 py-1 rounded-2xl text-white`}
    //       >
    //         Details
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="date">
    //     <span className="font-bold">
    //       <DateConverter date={new Date(event.date).toDateString()} />
    //       <span className="ml-2">
    //         {new Date(event.date).getHours().toString().padStart(2, "0")}:
    //         {new Date(event.date).getMinutes().toString().padStart(2, "0")}
    //       </span>
    //     </span>
    //   </div>
    // </div>
  );
}

export default EventsPage;
