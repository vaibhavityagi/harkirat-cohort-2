import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countState", //unique ID that helps identify each atom
  default: 0, //default value
});

// selectors are used for derived data
export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom); // dependecies
    return count % 2;
  },
});
