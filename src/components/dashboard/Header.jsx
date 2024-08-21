"use client";
import { CiSettings } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../app/api/v1/events";
import DateConverter from "./DateConvertor";

function Header() {
  const router = useRouter();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getAllEvents();
        if (events === "unauthorized") {
          setFetchError("unauthorized");
        } else if (events === "error") {
          setFetchError("error");
        } else {
          setAllEvents(events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setFetchError("error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (fetchError === "unauthorized") {
    return <p>Please log in to view notifications.</p>;
  }

  if (fetchError === "error") {
    return (
      <p>There was an error fetching notifications. Please try again later.</p>
    );
  }

  return (
    <div className="flex justify-between items-center pl-[22%] bg-[#eeeeee] pr-6 pt-6">
      <div>
        <p className=" font-bold text-2xl">Hoş geldiniz</p>
        <p className=" opacity-60">Spor salonunuzu yönetin</p>
      </div>
      <div className="flex gap-3">
        <p className="h-[30px] bg-white items-center flex w-[30px] justify-center rounded-md cursor-pointer">
          <CiSettings
            onClick={() => router.push("/panel/settings")}
            size={23}
          />
        </p>
        <div className="relative">
          <p
            className={`h-[30px] relative duration-300 ${
              notificationsOpen ? "bg-bg_primery" : "bg-white"
            } items-center flex w-[30px] justify-center rounded-md`}
          >
            <HiOutlineBellAlert
              color={notificationsOpen ? "white" : "black"}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              size={23}
            />
            <span className="absolute top-0 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </p>
          <div
            className={`absolute w-[350px] duration-500 overflow-y-scroll gap-3 ${
              notificationsOpen ? "h-[450px] opacity-100" : "h-0 opacity-0"
            } bg-white rounded-md p-3 right-5 top-[74px] shadow-md z-50`}
          >
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <div>
                {allEvents?.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col gap-2 border-b-2 pb-4"
                  >
                    <div className="flex justify-between">
                      <p className="font-bold">{event.event}d</p>
                      <div className="flex flex-row-reverse items-center">
                        <p className="opacity-60 text-sm">
                          (
                          {new Date(event.date)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}
                          :
                          {new Date(event.date)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}
                          )
                        </p>
                        <p className="opacity-60 text-sm mr-[3px]">
                          <DateConverter
                            date={new Date(event.date).toDateString()}
                          />
                        </p>
                      </div>
                    </div>
                    <p className="opacity-60 text-sm mb-1">
                      {event.event === "create" && "Customer created"}
                      {event.event === "delete" && "Customer deleted"}
                      {event.event === "update" && "Customer updated"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
