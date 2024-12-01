import React from "react";

function Button({ Func }) {
  return (
    <button
      className="h-[50px] mt-[24px] w-full bg-bg_secondery duration-300 text-white rounded-lg cursor-pointer hover:shadow-lg"
      type="submit"
      onClick={Func}
    >
      Update
    </button>
  );
}

export default Button;
