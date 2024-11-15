import { signout } from "../app/api/v1/auth";
import Swal from "sweetalert2";

export const Logout = async (router) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout !",
  }).then((result) => {
    if (result.isConfirmed) {
      signout();
      setTimeout(() => {
        router.push("/panel/sign-in");
      }, 100);
    }
  });
};
