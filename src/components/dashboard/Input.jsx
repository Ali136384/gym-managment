import React from "react";

function Input({ label, setValue, placeholder, type = "text", setIsEdited }) {
  return (
    <div className="flex-col flex">
      <label className="font-bold text-sm mb-[5px]">{label}</label>
      <input
        className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb]"
        onChange={(e) => {
          setValue(e.target.value);
          setIsEdited(true);
        }}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
