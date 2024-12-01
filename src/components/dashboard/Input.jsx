import React from "react";

function Input({
  label,
  setValue,
  placeholder,
  type = "text",
  setIsEdited,
  width,
}) {
  return (
    <div className="flex-col flex py-2 ">
      <label className="font-[600] text-sm mb-[5px]">{label}</label>
      <input
        style={{
          width: width ? width : null,
        }}
        className="py-2 px-3 border-[1px] placeholder:text-gray-600 placeholder:text-sm  rounded-[9px] outline-[#5540fb]"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
