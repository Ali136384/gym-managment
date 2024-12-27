import atom from "recoil";

const basketState = atom({
  default: [],
  key: "basket",
});

export default basketState;
