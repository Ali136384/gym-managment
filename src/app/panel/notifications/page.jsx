"use client";
import { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import {
  getAllAnnouncments,
  markAsRead,
  getCurrentUserId,
} from "../../api/v1/user";
import DateConverter from "../../../components/dashboard/DateConvertor";

function Page() {
  const [height400, setHeight400] = useState([]);
  const [messages, setMessages] = useState([]);
  const [changed, setChanged] = useState(0);
  useEffect(() => {
    console.log(height400);
    getAllAnnouncments().then((v) => {
      const sortedArray = v.sort((a, b) => new Date(b.sent) - new Date(a.sent));
      setMessages(sortedArray ?? []);
      console.log(v);
    });
  }, [height400, changed]);

  async function readMessage(id, email) {
    const res = await markAsRead(id, email);
    console.log("mark as read: " + res);
  }

  return (
    <>
      {messages ? (
        <div className="notification ml-[26%] mt-10 shadow-xl rounded-[31px] m-4 min-h-[600px] overflow-hidden">
          {messages
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
            ?.map((ele, index) => (
              <div
                key={ele.id}
                className={
                  height400.includes(ele.id)
                    ? "message flex border-b-2 py-4  h-auto  px-8 duration-500 bg-white z-[20]"
                    : "message flex border-b-2 py-4 h-[100px] px-8 duration-500 bg-white z-[10] "
                }
              >
                <div className="message flex w-[88%] items-center">
                  {ele.read ? null : (
                    <span
                      onClick={async () => {
                        const res = await readMessage(
                          ele.id,
                          await getCurrentUserId()
                        );
                        setMessages([...messages, { ...ele, read: true }]);
                        setChanged(changed + 1);
                        console.log("mark as read: " + res);
                      }}
                      hidden={ele.read}
                      className="mark-as-read  w-[188px] mr-2 h-[35px] font-bold  flex justify-center mb-0 ml-0 bg-green-700 px-2 py-1  cursor-pointer text-white shadow-lg rounded-2xl "
                    >
                      mark as read
                    </span>
                  )}

                  <p className="p-4 cursor-pointer w-[70%] break-words">
                    {ele.text.length > 150 &&
                    height400.includes(ele.id) === false
                      ? ele.text.slice(0, 150) + " ..."
                      : ele.text}
                  </p>
                </div>
                <div className="icons flex flex-1 justify-between">
                  <div className=" w-full mt-[14px] opacity-50 mr-4 flex">
                    <span className=" mr-3">
                      {
                        <DateConverter
                          date={new Date(ele.sent).toDateString()}
                        />
                      }
                    </span>
                    <span>{new Date(ele.sent).getHours()}</span>
                    <span>:</span>
                    <span> {new Date(ele.sent).getMinutes()}</span>
                  </div>
                  <p>
                    {height400.includes(ele.id) ? (
                      <CiSaveUp1
                        className="opacity-70  mt-[14px] cursor-pointer"
                        onClick={() => {
                          const ind = height400.indexOf(ele.id);
                          height400[ind] = " ";
                          setHeight400([...height400]);
                        }}
                        size={24}
                      />
                    ) : (
                      <CiSaveDown1
                        className="opacity-70 mt-[14px]  cursor-pointer"
                        size={24}
                        onClick={() => {
                          setHeight400([...height400, ele.id]);
                        }}
                      />
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <>Nothing</>
      )}
    </>
  );
}

export default Page;
