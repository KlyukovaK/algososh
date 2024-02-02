import { TArr } from "../types/elements";

// Изменение положения элементов
export const swap = (
  arr: Array<TArr>,
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex].element;
  arr[firstIndex].element = arr[secondIndex].element;
  arr[secondIndex].element = temp;
};
