/* eslint-disable react/prop-types */
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Button({ title, Func, mt, center, to, wFull = false }) {
  return (
    <Link
      href={"/blogs/blog"}
      onClick={Func}
      style={{
        marginTop: mt ? mt : null,
        alignSelf: center ? "center" : null,
        width: wFull ? "100%" : null,
      }}
      className={`button hover:shadow-lg shadow-primary z-[999] duration-300 flex items-center justify-center self-end gap-2 rounded-[5px] cursor-pointer bg-bg_primery h-[40px] w-full lg:w-[121px]`}
    >
      <span className={`text-white font-bold `}>{title}</span>
      <span>
        <FontAwesomeIcon color="white" icon={faArrowRight} />
      </span>
    </Link>
  );
}

export default Button;
