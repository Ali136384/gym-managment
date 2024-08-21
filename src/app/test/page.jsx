// // "use client";
// // import React, { useState } from "react";
// // import Chart from "react-apexcharts";

// // const App = ({ data }) => {
// //   const [options, setOptions] = useState({
// //     chart: {
// //       id: "apexchart-example",
// //     },
// //     xaxis: {
// //       categories: [
// //         "Ocak",
// //         "Subat",
// //         "Mart",
// //         "Nisan",
// //         "Mayis",
// //         "Haziran",
// //         "Temmuz",
// //         "Agostus",
// //         "Eylul",
// //         "Ekim",
// //         "Kasim",
// //         "Aralik",
// //       ],
// //     },
// //   });

// //   const [series, setSeries] = useState([
// //     {
// //       name: "series-1",
// //       data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 132, 21, 2],
// //     },
// //   ]);

// //   return (
// //     <Chart
// //       options={options}
// //       series={series}
// //       type="bar"
// //       width={500}
// //       height={320}
// //     />
// //   );
// // };

// // export default App;
// "use client";
// import React from "react";
// import { nameState } from "./states";
// import { useRecoilState } from "recoil";
// function page() {
//   const [name, setName] = useRecoilState(nameState);
//   console.log(name[10]);

//   return (
//     <>
//       <input
//         onChange={(e) => setName(e.target.value)}
//         type="text"
//         placeholder="Write Your Name !"
//         name=""
//         id=""
//       />
//     </>
//   );
// }

// export default page;

// <div className="shadow-lg h-full m-3 p-4 rounded-lg">
// {/* Start add Product blog */}

// <div className=" items-center ">
//   <div className="self-center ml-10 relative">
//     <CiSearch size={25} className=" absolute left-1 " />
//     <input
//       onChange={(e) => setFilterValue(e.target.value)}
//       className="border-2 rounded-xl px-7 w-[100%]"
//       type="text"
//       placeholder="Search product by name"
//     />
//   </div>
// </div>
// <div className="prodcuts w-full  flex justify-between px-20 mt-6">
//   <div className={`categories  font-bold rounded-lg `}>
//     <p
//       onClick={() => {
//         activeSection === null ? null : setActiveSection(null);
//       }}
//       className={`font-bold cursor-pointer ${
//         activeSection !== null
//           ? "bg-gray-300 text-black"
//           : "bg-green-700 text-white"
//       }  px-6 py-1   rounded-lg `}
//     >
//       All Products
//     </p>
//   </div>
//   {products?.map((ele, index) => {
//     return (
//       <React.Fragment key={index}>
//         <div
//           onClick={() => {
//             setActiveSection(ele.id);
//           }}
//           className={`categories ${
//             activeSection === ele.id
//               ? "bg-green-700 text-white"
//               : "bg-gray-300 text-black"
//           }  px-6 py-1  font-bold rounded-lg `}
//         >
//           <p className="font-bold cursor-pointer">{ele.cat}</p>
//         </div>
//       </React.Fragment>
//     );
//   })}
// </div>
// {products.map((ele) => {
//   return (
//     <>
//       {activeSection !== null
//         ? ele.data
//             .filter((ele) =>
//               ele.name
//                 .trim()
//                 .toLowerCase()
//                 .includes(filterValue.trim().toLowerCase())
//             )
//             .filter((e) => e.categoryId === activeSection)
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((el, index) => {
//               return (
//                 <React.Fragment key={index}>
//                   <div
//                     className={`shadow-lg px-2 py-2 rounded-lg mt-4 duration-300 overflow-hidden ${
//                       openProducts.includes(el.id)
//                         ? "h-[670px]"
//                         : "h-[45px]"
//                     }`}
//                   >
//                     <div
//                       onClick={() => {
//                         if (openProducts.includes(el.id)) {
//                           setOpenProducts(
//                             openProducts.filter((id) => id !== el.id)
//                           );
//                         } else {
//                           setOpenProducts([...openProducts, el.id]);
//                         }
//                         console.log(el.id);
//                       }}
//                       className="flex justify-between items-center h-[45px]"
//                     >
//                       <p className="font-bold">{el.name}</p>
//                       {openProducts.includes(el.id) ? (
//                         <CiSaveUp1 size={24} />
//                       ) : (
//                         <CiSaveDown1 size={24} />
//                       )}
//                     </div>
//                     <div className="content mt-4">
//                       <div className="product-images flex justify-evenly items-center mb-5 relative">
//                         {/* Product Images */}
//                         {el.images?.map((i) => (
//                           <div className="shadow-lg rounded-lg  p-2 relative">
//                             <img
//                               className="w-[250px] rounded-xl"
//                               src={i.url}
//                               alt=""
//                             />{" "}
//                             {inEditingProduct === el.id && (
//                               <span className="cursor-pointer absolute -top-2 -right-2">
//                                 <TiDelete
//                                   onClick={() => {
//                                     deleteObject(
//                                       ref(
//                                         storage,
//                                         `images/products/${el.id}/${i.obj.name}`
//                                       )
//                                     );
//                                   }}
//                                   size={25}
//                                   color="red"
//                                 />
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         <div className="flex items-center absolute top-0 right-0 gap-4">
//                           {inEditingProduct === el.id ? (
//                             <MdOutlineCancel
//                               color="green"
//                               size={23}
//                               onClick={() =>
//                                 setInEditingProduct(null)
//                               }
//                             />
//                           ) : (
//                             <CiEdit
//                               onClick={() =>
//                                 setInEditingProduct(el.id)
//                               }
//                               color="green"
//                               size={23}
//                             />
//                           )}
//                           <MdDeleteForever
//                             onClick={async () => {
//                               Swal.fire({
//                                 title:
//                                   "Do you want to delete the product?",
//                                 showDenyButton: true,
//                                 showCancelButton: true,
//                                 confirmButtonText: "delete",
//                                 denyButtonText: `Don't delete`,
//                               }).then(async (result) => {
//                                 /* Read more about isConfirmed, isDenied below */
//                                 if (result.isConfirmed) {
//                                   const deleteRes =
//                                     await deleteHomeProductById(
//                                       el.id
//                                     );
//                                   console.log(
//                                     "delete product: " + deleteRes
//                                   );
//                                   Swal.fire(
//                                     "Deleted!",
//                                     "",
//                                     "success"
//                                   );
//                                 } else if (result.isDenied) {
//                                   Swal.fire(
//                                     "Product not deleted",
//                                     "",
//                                     "info"
//                                   );
//                                 }
//                               });
//                             }}
//                             color="red"
//                             size={23}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex  items-center ">
//                         <div className="mb-5">
//                           {inEditingProduct === el.id ? (
//                             <>
//                               <span className="font-bold">
//                                 Marka :{" "}
//                               </span>
//                               <input
//                                 className="border-2 px-2 rounded-xl"
//                                 type="text"
//                                 defaultValue={el.marka}
//                               />
//                             </>
//                           ) : (
//                             <>
//                               <span className="font-bold">
//                                 Marka :{" "}
//                               </span>{" "}
//                               {el.marka}
//                             </>
//                           )}
//                         </div>
//                         <div className="mb-5 ml-5">
//                           {inEditingProduct === el.id ? (
//                             <>
//                               <span className="font-bold">
//                                 Name :{" "}
//                               </span>
//                               <input
//                                 className="border-2 px-2 rounded-xl"
//                                 type="text"
//                                 defaultValue={el.name}
//                               />
//                             </>
//                           ) : (
//                             <></>
//                           )}
//                         </div>
//                       </div>
//                       <div className="mb-5">
//                         {inEditingProduct === el.id ? (
//                           <>
//                             <span className="font-bold">
//                               price :{" "}
//                             </span>
//                             <input
//                               className="border-2 px-2 rounded-xl"
//                               type="text"
//                               defaultValue={el.price}
//                             />
//                             TL
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-bold">
//                               Price :{" "}
//                             </span>{" "}
//                             {el.price} TL
//                           </>
//                         )}
//                       </div>
//                       <div className="">
//                         {inEditingProduct === el.id ? (
//                           <>
//                             <div className="flex">
//                               <p className="font-bold">
//                                 Description :{" "}
//                               </p>
//                               <textarea
//                                 className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
//                                 defaultValue={el.description}
//                               />
//                             </div>
//                             <button
//                               onClick={() => {
//                                 Swal.fire({
//                                   title:
//                                     "Do you want to save the changes?",
//                                   showDenyButton: true,
//                                   showCancelButton: true,
//                                   confirmButtonText: "Save",
//                                   denyButtonText: `Don't save`,
//                                 }).then((result) => {
//                                   if (result.isConfirmed) {
//                                     Swal.fire(
//                                       "Saved!",
//                                       "",
//                                       "success"
//                                     );
//                                   } else if (result.isDenied) {
//                                     Swal.fire(
//                                       "Changes are not saved",
//                                       "",
//                                       "info"
//                                     );
//                                   }
//                                 });
//                               }}
//                               className="bg-green-700 px-2 py-2 rounded-md text-white font-bold mt-3 w-full mx-auto my-0"
//                             >
//                               Submit edits
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <div className="flex">
//                               <p className="font-bold">
//                                 Description :{" "}
//                               </p>
//                               <textarea
//                                 disabled
//                                 className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
//                                 defaultValue={el.description}
//                               />
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })
//         : ele.data
//             .filter((ele) =>
//               ele.name
//                 .trim()
//                 .toLowerCase()
//                 .includes(filterValue.trim().toLowerCase())
//             )
//             .sort((a, b) => a.name.localeCompare(b.name))
//             .map((el, index) => {
//               return (
//                 <React.Fragment key={index}>
//                   <div
//                     className={`shadow-lg px-2 py-2 rounded-lg mt-4 duration-300 overflow-hidden ${
//                       openProducts.includes(el.id)
//                         ? "h-max"
//                         : "h-[45px]"
//                     }`}
//                   >
//                     <div
//                       onClick={() => {
//                         if (openProducts.includes(el.id)) {
//                           setOpenProducts(
//                             openProducts.filter((id) => id !== el.id)
//                           );
//                         } else {
//                           setOpenProducts([...openProducts, el.id]);
//                         }
//                         console.log(el.id);
//                       }}
//                       className="flex justify-between items-center h-[45px]"
//                     >
//                       <p className="font-bold">{el.name}</p>
//                       {openProducts.includes(el.id) ? (
//                         <CiSaveUp1 size={24} />
//                       ) : (
//                         <CiSaveDown1 size={24} />
//                       )}
//                     </div>
//                     <div className="content mt-4">
//                       <div className="product-images flex justify-evenly items-center mb-5 relative">
//                         {el.images?.map((i) => (
//                           <div className="shadow-lg rounded-lg  p-2 relative">
//                             <img
//                               className="w-[250px] rounded-xl"
//                               src={i.url}
//                               alt=""
//                             />{" "}
//                             {inEditingProduct === el.id && (
//                               <span className="cursor-pointer absolute -top-2 -right-2">
//                                 <TiDelete
//                                   onClick={() => {
//                                     deleteObject(
//                                       ref(
//                                         storage,
//                                         `images/products/${el.id}/${i.obj.name}`
//                                       )
//                                     );
//                                   }}
//                                   size={25}
//                                   color="red"
//                                 />
//                               </span>
//                             )}
//                           </div>
//                         ))}

//                         <div className="flex items-center absolute top-0 right-0 gap-4">
//                           {inEditingProduct === el.id ? (
//                             <MdOutlineCancel
//                               color="green"
//                               size={23}
//                               onClick={() =>
//                                 setInEditingProduct(null)
//                               }
//                             />
//                           ) : (
//                             <CiEdit
//                               onClick={() =>
//                                 setInEditingProduct(el.id)
//                               }
//                               color="green"
//                               size={23}
//                             />
//                           )}
//                           <MdDeleteForever
//                             onClick={async () => {
//                               Swal.fire({
//                                 title:
//                                   "Do you want to delete the product?",
//                                 showDenyButton: true,
//                                 showCancelButton: true,
//                                 confirmButtonText: "delete",
//                                 denyButtonText: `Don't delete`,
//                               }).then(async (result) => {
//                                 /* Read more about isConfirmed, isDenied below */
//                                 if (result.isConfirmed) {
//                                   const deleteRes =
//                                     await deleteHomeProductById(
//                                       el.id
//                                     );
//                                   console.log(
//                                     "delete product: " + deleteRes
//                                   );
//                                   Swal.fire(
//                                     "Deleted!",
//                                     "",
//                                     "success"
//                                   );
//                                 } else if (result.isDenied) {
//                                   Swal.fire(
//                                     "Product not deleted",
//                                     "",
//                                     "info"
//                                   );
//                                 }
//                               });
//                             }}
//                             color="red"
//                             size={23}
//                           />
//                         </div>
//                       </div>
//                       <div className="flex  items-center ">
//                         <div className="mb-5">
//                           {inEditingProduct === el.id ? (
//                             <>
//                               <span className="font-bold">
//                                 Marka :
//                               </span>
//                               <input
//                                 className="border-2 px-2 rounded-xl"
//                                 type="text"
//                                 defaultValue={el.marka}
//                               />
//                             </>
//                           ) : (
//                             <>
//                               <span className="font-bold">
//                                 Marka :
//                               </span>
//                               {el.marka}
//                             </>
//                           )}
//                         </div>
//                         <div className="mb-5 ml-5">
//                           {inEditingProduct === el.id && (
//                             <>
//                               <span className="font-bold">
//                                 Name :{" "}
//                               </span>
//                               <input
//                                 onChange={({ target }) => {
//                                   setEditedProductName(target.value);
//                                   setUserEditedAField(true);
//                                 }}
//                                 className="border-2 px-2 rounded-xl"
//                                 type="text"
//                                 defaultValue={el.name}
//                               />
//                             </>
//                           )}
//                         </div>
//                       </div>
//                       <div className="mb-5">
//                         {inEditingProduct === el.id ? (
//                           <>
//                             <span className="font-bold">
//                               price :{" "}
//                             </span>
//                             <input
//                               onChange={(e) => {
//                                 setEditedProductPrice(
//                                   Number(e.target.value)
//                                 );
//                                 setUserEditedAField(true);
//                               }}
//                               className="border-2 px-2 rounded-xl"
//                               type="text"
//                               defaultValue={el.price}
//                             />
//                             TL
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-bold">
//                               Price :{" "}
//                             </span>{" "}
//                             {el.price} TL
//                           </>
//                         )}
//                       </div>
//                       <div className="">
//                         {inEditingProduct === el.id ? (
//                           <>
//                             <div className="flex">
//                               <p className="font-bold">
//                                 Description :{" "}
//                               </p>
//                               <textarea
//                                 onChange={(e) => {
//                                   setEditedProductDescription(
//                                     e.target.value
//                                   );
//                                   setUserEditedAField(true);
//                                 }}
//                                 className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
//                                 defaultValue={el.description}
//                               />
//                             </div>
//                             <button
//                               onClick={handelEditProduct}
//                               className="bg-green-700 px-2 py-2 rounded-md text-white font-bold mt-3 w-full mx-auto my-0"
//                             >
//                               Submit edits
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <div className="flex">
//                               <p className="font-bold">
//                                 Description :{" "}
//                               </p>
//                               <textarea
//                                 disabled
//                                 className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
//                                 defaultValue={el.description}
//                               />
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}
//     </>
//   );
// })}
// </div>

import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
