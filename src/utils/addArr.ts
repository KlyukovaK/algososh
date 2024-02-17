import { ElementStates } from "../types/element-states";
import { nanoid } from "nanoid";

export const addArr = (arr: (number | string)[]) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push({
      element: arr[i],
      color: ElementStates.Default,
      key: nanoid(5),
    });
  }
  return newArr;
};
