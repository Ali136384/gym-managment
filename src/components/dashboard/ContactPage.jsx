import React from "react";
import Swal from "sweetalert2";
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";

import { FaWhatsapp } from "react-icons/fa";

import { CiInstagram } from "react-icons/ci";

import { MdOutlineEmail } from "react-icons/md";
export function ContactPage() {
  return (
    <>
      <div className="contact grid grid-cols-2 gap-7 p-4">
        <div className="email flex flex-col relative">
          <label> Email</label>
          <MdOutlineEmail
            size={19}
            color="black"
            className=" absolute right-3 top-[33px] "
          />
          <input type="text" placeholder=" Email" />
        </div>{" "}
        <div className="whatsapp flex flex-col relative">
          <label> WhatsApp Number</label>
          <FaWhatsapp
            size={19}
            color="black"
            className=" absolute right-3 top-[33px] "
          />

          <input type="text" placeholder="WhatsApp Number" />
        </div>{" "}
        <div className="faceBook flex flex-col relative">
          <label> Facebook</label>
          <CiFacebook
            size={20}
            color="black"
            className=" absolute right-3 top-[33px] "
          />
          <input type="text" placeholder="Facebook" />
        </div>{" "}
        <div className="Ig flex flex-col relative">
          <label> Instagram</label>
          <CiInstagram
            size={20}
            color="black"
            className=" absolute right-3 top-[33px] "
          />

          <input type="text" placeholder="Instagram" />
        </div>{" "}
        <div className="X flex flex-col relative">
          <label> X (Twitter)</label>
          <RiTwitterXFill
            size={19}
            color="black"
            className=" absolute right-3 top-[33px] "
          />

          <input type="text" placeholder="X (Twitter)" />
        </div>{" "}
        <button
          onClick={() => {
            Swal.fire({
              title: `Do you want to save the Product?
                      You will be able to edit the product from Products page.
                      `,
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                // setProductDesc("");
                // setProductMarka("");
                // setProductPrice("");
                // setProductTitle("");
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }}
          className={`bg-[#eee] duration-500 hover:bg-green-600 hover:text-white h-[40px] self-end rounded-[31px] text-green-500 text-[23px] shadow-2xl `}
        >
          Create
        </button>
      </div>
    </>
  );
}
