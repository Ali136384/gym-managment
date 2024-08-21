// {/* <div className="bg-bg_custom h-[100vh]">
//   <div className="search ml-[21%]   flex justify-between items-center flex-row-reverse gap-10 mx-8 pt-8">
//     <div className="flex px-1 rounded-xl bg-white items-center self-baseline w-[400px]">
//       <CiSearch size={30} color="gray" className="mr-2 h-[50px]" />
//       <input
//         style={{ border: "none" }}
//         onChange={(e) => setFilterValue(e.target.value)}
//         className="py-2 w-full "
//         type="text"
//         placeholder="Search Customer"
//       />
//     </div>
//     <div
//       className={`bg-white overflow-hidden rounded-md px-2 duration-300 py-2 w-[220px] ${
//         selectIsOpen ? "h-[230px]" : "h-[50px]"
//       }`}
//     >
//       <div className="flex justify-around items-center mb-4 mt-[5px] z-50">
//         <span>
//           <MdOutlineFilterList size={23} color="gray" />
//         </span>
//         <p className="text-gray-500">Sort by price</p>
//         <span onClick={handleSelectClick}>
//           <MdOutlineKeyboardArrowDown size={23} color="gray" />
//         </span>
//       </div>
//       {filterObject?.map((ele) => {
//         return (
//           <React.Fragment key={ele.id}>
//             <p
//               onClick={() => handelActive(ele.id)}
//               className={` px-3 py-1 cursor-pointer duration-300 border-b-2 last:border-0 hover:ml-2 hover:border-border_primery hover:text-txt_primery ${
//                 ele.active ? "text-black" : "text-black"
//               }`}
//             >
//               {ele.title}
//             </p>
//           </React.Fragment>
//         );
//       })}
//     </div>
//     {/* <div className="filtersOntable mt-5 flex gap-3 items-center">
//       <p className="font-bold">Customers registeration will end in :</p>
//       <input
//         onChange={(e) => setDaysFilter(e.target.value)}
//         className="shadow-md px-2 py-1 w-[150px]"
//         type="number"
//         placeholder="for example : 7"
//       />
//       <select
//         onChange={(e) => {
//           daysFilter.length && setDayORmonthOryear(e.target.value);
//         }}
//         className="outline-none border-[#eee]"
//         name=""
//         id=""
//       >
//         <option value="days">days</option>
//         <option value="months">monthes</option>
//         <option value="years">years</option>
//       </select>
//     </div> */}
//   </div>
//   <div className="ml-[21%] relative  w-[77%] mt-5 bg-white p-6 rounded-[5px] overflow-hidden mb-5 ">
//     <table className="w-full ">
//       <div className="flex justify-between border-2 border-gray-500 px-5 py-2">
//         <div className="border-b-2 ">
//           <p className="pb-6">Name</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 ?.map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td className=" relative">
//                           {`${
//                             ele.name.length > 8
//                               ? ele.name?.slice(0, 8)
//                               : ele.name?.toUpperCase()
//                           } ` +
//                             `${
//                               ele.surname.length > 8
//                                 ? ele.surname?.toUpperCase().slice(0, 8) + "..."
//                                 : ele.surname?.toUpperCase()
//                             }`}
//                         </td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>
//         <div className="absolute w-[95.8%] h-1 top-[77px] right-6 bg-red-800">
//           {" "}
//         </div>
//         <div>
//           <p className="pb-6">Age</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 ?.map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>{ele.age}</td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>
//         <div className="absolute w-[95.8%] h-1 top-[137px] right-6 bg-[#eee]">
//           {" "}
//         </div>
//         <div>
//           <p className="pb-6">Gender</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 ?.map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>{ele.gender}</td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>
//         <div>
//           <div className="absolute w-[95.8%] h-[1px] top-[137px] right-6 bg-[#eee]">
//             {" "}
//           </div>
//           <p className="pb-6">Package</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 ?.map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>{ele.bucketPrice} TL</td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>
//         <div>
//           <p className="pb-6">Paid</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 ?.map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>{ele.paymentAmount} TL</td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>{" "}
//         <div>
//           <p className="pb-6">Should Pay</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 .map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>{ele.bucketPrice - ele.paymentAmount} TL</td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>{" "}
//         <div>
//           <p className="pb-6">Start Date</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 .map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>
//                           {
//                             <DateConvertor
//                               date={new Date(ele.startedAt).toDateString()}
//                             />
//                           }
//                         </td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>{" "}
//         <div>
//           <p className="pb-6">End Date</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 .map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>
//                           {
//                             <DateConvertor
//                               date={new Date(ele.endsAt).toDateString()}
//                             />
//                           }
//                         </td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>{" "}
//         <div>
//           <p className="pb-6">Days Left</p>
//           {AllCustomers.length > 0
//             ? AllCustomers?.filter(
//                 (el) =>
//                   el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//                   el.name?.toUpperCase() === filterValue.toUpperCase() ||
//                   `${el.name + el.surname}`
//                     .toUpperCase()
//                     .replace(/\s/g, "")
//                     .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//               )
//                 .sort((a, b) => a.name.localeCompare(b.name))
//                 .map((ele, index) => {
//                   console.log(ele.createdAt.getMonth());
//                   return (
//                     <>
//                       <tr
//                         key={ele.id}
//                         onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                         className={`h-[90px] flex justify-between mt-4`}
//                       >
//                         <td>
//                           {Math.ceil(
//                             (new Date(ele.endsAt) - new Date()) /
//                               (1000 * 60 * 60 * 24)
//                           )}
//                         </td>
//                       </tr>
//                     </>
//                   );
//                 })
//             : // <p>No customers</p>
//               null}
//         </div>
//       </div>
//       <div></div>
//     </table>
//   </div>
// </div>;

// <table className="w-full ">
//   <div className="flex justify-between border-2 border-gray-500 px-5 py-2">
//     <div className="border-b-2 ">
//       <p className="pb-6">Name</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td className=" relative">
//                       {`${
//                         ele.name.length > 8
//                           ? ele.name?.slice(0, 8)
//                           : ele.name?.toUpperCase()
//                       } ` +
//                         `${
//                           ele.surname.length > 8
//                             ? ele.surname?.toUpperCase().slice(0, 8) + "..."
//                             : ele.surname?.toUpperCase()
//                         }`}
//                     </td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>
//     <div className="absolute w-[95.8%] h-1 top-[77px] right-6 bg-red-800">
//       {" "}
//     </div>
//     <div>
//       <p className="pb-6">Age</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>{ele.age}</td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>
//     <div className="absolute w-[95.8%] h-1 top-[137px] right-6 bg-[#eee]">
//       {" "}
//     </div>
//     <div>
//       <p className="pb-6">Gender</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>{ele.gender}</td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>
//     <div>
//       <div className="absolute w-[95.8%] h-[1px] top-[137px] right-6 bg-[#eee]">
//         {" "}
//       </div>
//       <p className="pb-6">Package</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>{ele.bucketPrice} TL</td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>
//     <div>
//       <p className="pb-6">Paid</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>{ele.paymentAmount} TL</td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>{" "}
//     <div>
//       <p className="pb-6">Should Pay</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>{ele.bucketPrice - ele.paymentAmount} TL</td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>{" "}
//     <div>
//       <p className="pb-6">Start Date</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>
//                       {
//                         <DateConvertor
//                           date={new Date(ele.startedAt).toDateString()}
//                         />
//                       }
//                     </td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>{" "}
//     <div>
//       <p className="pb-6">End Date</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               console.log(ele.createdAt.getMonth());
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td>
//                       {
//                         <DateConvertor
//                           date={new Date(ele.endsAt).toDateString()}
//                         />
//                       }
//                     </td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>{" "}
//     <div>
//       <p className="pb-6">Days Left</p>
//       {AllCustomers.length > 0
//         ? AllCustomers?.filter(
//             (el) =>
//               el.name?.toUpperCase().includes(filterValue.toUpperCase()) ||
//               el.name?.toUpperCase() === filterValue.toUpperCase() ||
//               `${el.name + el.surname}`
//                 .toUpperCase()
//                 .replace(/\s/g, "")
//                 .includes(filterValue.toUpperCase().replace(/\s/g, ""))
//           )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((ele, index) => {
//               return (
//                 <>
//                   <tr
//                     key={ele.id}
//                     onClick={() => router.push(`/panel/customer/${ele.id}`)}
//                     className={`h-[90px] flex justify-between mt-4`}
//                   >
//                     <td></td>
//                   </tr>
//                 </>
//               );
//             })
//         : // <p>No customers</p>
//           null}
//     </div>
//   </div>
//   <div></div>
// </table>;

// // import { CiSettings } from "react-icons/ci";
// // import { HiOutlineBellAlert } from "react-icons/hi2";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { getAllEvents } from "../../app/api/v1/events";

// // function Header() {
// //   const router = useRouter();
// //   const [notificationsOpen, setNotificationsOpen] = useState(false);

// //   const [allEvents, setAllEvents] = useState([]);
// //   const [fetchError, setFetchError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const events = await getAllEvents();
// //         events.length && setAllEvents(events);
// //       } catch (error) {
// //         if (error.response && error.response.status === 401) {
// //           setFetchError("unauthorized");
// //         } else {
// //           setFetchError("error");
// //         }
// //       }
// //     };
// //     fetchData();
// //   }, []);
// //   return (
// //     <div className="flex justify-between items-center pl-[22%] bg-[#eeeeee] pr-6 pt-6">
// //       <div>
// //         <p className=" font-bold text-2xl">Hoş geldiniz</p>
// //         <p className=" opacity-60">Spor salonunuzu yönetin</p>
// //       </div>
// //       <div className="flex gap-3">
// //         <p className="h-[30px] bg-white items-center flex w-[30px] justify-center rounded-md cursor-pointer">
// //           <CiSettings
// //             onClick={() => router.push("/panel/settings")}
// //             size={23}
// //           />
// //         </p>
// //         <div className=" relativea">
// //           <p
// //             className={`h-[30px] relative duration-300 ${
// //               notificationsOpen ? "bg-bg_primery" : "bg-white"
// //             } items-center flex w-[30px] justify-center rounded-md`}
// //           >
// //             <HiOutlineBellAlert
// //               color={notificationsOpen ? "white" : "black"}
// //               onClick={() => setNotificationsOpen(!notificationsOpen)}
// //               size={23}
// //             />
// //             <span className="absolute top-0 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
// //           </p>
// //           <div
// //             className={`absolute w-[350px] duration-500 overflow-y-scroll gap-3 ${
// //               notificationsOpen ? "h-[450px] opacity-100" : "h-0 opacity-0"
// //             } bg-white rounded-md p-3 right-5 top-[74px] shadow-md z-50`}
// //           >
// //             <div className=" flex flex-col gap-4">
// //               {allEvents?.length ? (
// //                 allEvents?.map((ele) => {
// //                   return (
// //                     <>
// //                       <div className="flex flex-col gap-2 border-b-2 pb-4">
// //                         <div className="flex justify-between">
// //                           <p className="font-bold ">{ele?.id}</p>
// //                           <p className="opacity-60">date of event</p>
// //                         </div>
// //                         <p className="opacity-60 text-sm mb-1">
// //                           Description of event
// //                         </p>
// //                       </div>
// //                     </>
// //                   );
// //                 })
// //               ) : (
// //                 <>
// //                   <div>
// //                     <p>Loading ...</p>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Header; */}
import React from "react";

function blank() {
  return <div>blank</div>;
}

export default blank;
