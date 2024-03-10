import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrSort } from "../../types/elements";
import { stop } from "../../utils/stop";
import { swap } from "../../utils/swap";

//сортировка выбором
export const selectionSort = async (
  arr: Array<TArrSort>,
  setNewArr: Dispatch<SetStateAction<Array<TArrSort>>>,
  isIncrease: boolean
) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    let maxInd = i;
    arr[maxInd].color = ElementStates.Changing;
    await stop(SHORT_DELAY_IN_MS);
    setNewArr([...arr]);
    for (let j = i + 1; j < length; j++) {
      arr[j].color = ElementStates.Changing;
      setNewArr([...arr]);
      await stop(SHORT_DELAY_IN_MS);
      const comparison = isIncrease 
        ? arr[maxInd].element < arr[j].element
        : arr[maxInd].element > arr[j].element;
      if (comparison) {
        maxInd = j;
      }
      arr[j].color = ElementStates.Default;
      setNewArr([...arr]);
    }
    arr[i].color = ElementStates.Default;
    setNewArr([...arr]);
    swap(arr, maxInd, i);
    arr[i].color = ElementStates.Modified;
    setNewArr([...arr]);
  }
};
// сортировка пузырьком
export const bubbleSort = async (
  arr: Array<TArrSort>,
  setNewArr: Dispatch<SetStateAction<Array<TArrSort>>>,
  isIncrease: boolean
) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].color = arr[j + 1].color = ElementStates.Changing;
      setNewArr([...arr]);
      await stop(SHORT_DELAY_IN_MS);
      const comparison = isIncrease
        ? arr[j].element < arr[j + 1].element
        : arr[j].element > arr[j + 1].element;
      if (comparison) {
        swap(arr, j, j + 1);
      }
      arr[j + 1].color = ElementStates.Modified;
      arr[j].color = ElementStates.Default;
      await stop(SHORT_DELAY_IN_MS);
    }
  }
  arr[0].color = ElementStates.Modified;
  setNewArr([...arr]);
  return arr
};
