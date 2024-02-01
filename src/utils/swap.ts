import { TArrString } from "../types/elements";

// Изменение положения элементов
export const swap = (
  arr: Array<TArrString>,
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex].element;
  arr[firstIndex].element = arr[secondIndex].element;
  arr[secondIndex].element = temp;
};
