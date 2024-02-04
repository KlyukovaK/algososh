import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import stylesSort from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import { TArrSort, TButton } from "../../types/elements";
import { stop } from "../../utils/stop";
import { useForm } from "../../utils/useForm";
import { addArr } from "../../utils/addArr";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [newArr, setNewArr] = useState<Array<TArrSort>>([]);
  const [isLoader, setIsLoader] = useState<TButton>({
    increasing: false,
    descending: false,
    addArr: false,
  });
  const [isIncrease, setIsIncrease] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<TButton>({
    increasing: false,
    descending: false,
    addArr: false,
  });
  const { values, handleChange } = useForm({ radioButton: "1" });

  // создание исходного массива
  const randomArr = () => {
    const length = Math.random() * (17 - 3) + 3;
    const max = 100;
    const numbers = [];
    for (let i = 0; i < length; i++) {
      numbers[i] = Math.round(Math.random() * max);
    }
    setArr(numbers);
  };

  useEffect(() => {
    if (arr) {
      const newArr = addArr(arr);
      setNewArr(newArr);
    }
  }, [arr]);

  //сортировка выбором
  const selectionSort = async (arr: Array<TArrSort>) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].color = ElementStates.Changing;
      await stop(500);
      setNewArr([...arr]);
      for (let j = i + 1; j < length; j++) {
        arr[j].color = ElementStates.Changing;
        setNewArr([...arr]);
        await stop(500);
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
  const bubbleSort = async (arr: Array<TArrSort>) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = arr[j + 1].color = ElementStates.Changing;
        setNewArr([...arr]);
        await stop(500);
        const comparison = isIncrease
          ? arr[j].element < arr[j + 1].element
          : arr[j].element > arr[j + 1].element;
        if (comparison) {
          swap(arr, j, j + 1);
        }
        arr[j + 1].color = ElementStates.Modified;
        arr[j].color = ElementStates.Default;
        await stop(500);
      }
    }
    arr[0].color = ElementStates.Modified;
    setNewArr([...arr]);
  };
  // общая сортировка
  const sort = async () => {
    values.radioButton === "1"
      ? await selectionSort(newArr)
      : await bubbleSort(newArr);
  };

  const onFormIncreaseSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsIncrease(false);
    setIsLoader({ ...isLoader, increasing: true });
    setIsDisabled({ ...isDisabled, descending: true, addArr: true });
    await sort();
    setIsDisabled({ ...isDisabled, descending: false, addArr: false });
    setIsLoader({ ...isLoader, increasing: false });
  };

  const onFormDecreaseSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsIncrease(true);
    setIsDisabled({ ...isDisabled, increasing: true, addArr: true });
    setIsLoader({ ...isLoader, descending: true });
    await sort();
    setIsDisabled({ ...isDisabled, increasing: false, addArr: false });
    setIsLoader({ ...isLoader, descending: false });
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <main className={stylesSort.main}>
        <form className={stylesSort.form}>
          <fieldset className={stylesSort.radioFieldset}>
            <RadioInput
              label="Выбор"
              extraClass="bubble"
              name="radioButton"
              value="1"
              checked={values.radioButton === "1" ? true : false}
              onChange={handleChange}
            />
            <RadioInput
              label="Пузырёк"
              extraClass="bubble"
              name="radioButton"
              value="2"
              checked={values.radioButton === "2" ? true : false}
              onChange={handleChange}
            />
          </fieldset>
          <div className={stylesSort.buttons}>
            <Button
              sorting={Direction.Ascending}
              text="По возрастанию"
              isLoader={isLoader.increasing}
              onClick={onFormIncreaseSubmit}
              disabled={
                arr.length === 0 || isDisabled.increasing ? true : false
              }
            />
            <Button
              sorting={Direction.Descending}
              text="По убыванию"
              isLoader={isLoader.descending}
              onClick={onFormDecreaseSubmit}
              disabled={
                arr.length === 0 || isDisabled.descending ? true : false
              }
            />
          </div>
          <Button
            text="Новый массив"
            isLoader={isLoader.addArr}
            onClick={() => {
              randomArr();
            }}
            disabled={isDisabled.addArr}
          />
        </form>
        <ul className={stylesSort.list}>
          {newArr.map((item) => (
            <li className={stylesSort.column} key={item.key}>
              <Column index={Number(item.element)} state={item.color} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
