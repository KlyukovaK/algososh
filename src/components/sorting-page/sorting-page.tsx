import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import stylesSort from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import { TArr } from "../../types/elements";
import { nanoid } from "nanoid";
import { stop } from "../../utils/stop";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [newArr, setNewArr] = useState<Array<TArr>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isIncrease, setIsIncrease] = useState<boolean>(false);
  const [value, setValue] = useState<string>("1");

  const chengeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
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
  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: number[]): void => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i],
        color: ElementStates.Default,
        key: nanoid(5),
      });
    }
    setNewArr(newArr);
  };

  useEffect(() => {
    if (arr) {
      addArr(arr);
    }
  }, [arr]);
  //сортировка выбором
  const selectionSort = async (arr: Array<TArr>) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].color = ElementStates.Changing;
      await stop(1000);
      setNewArr([...arr]);
      for (let j = i + 1; j < length; j++) {
        arr[j].color = ElementStates.Changing;
        setNewArr([...arr]);
        await stop(1000);
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
  const bubbleSort = async (arr: Array<TArr>) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = arr[j + 1].color = ElementStates.Changing;
        setNewArr([...arr]);
        await stop(1000);
        const comparison = isIncrease
          ? arr[j].element < arr[j + 1].element
          : arr[j].element > arr[j + 1].element;
        if (comparison) {
          swap(arr, j, j + 1);
        }
        arr[j + 1].color = ElementStates.Modified;
        arr[j].color = ElementStates.Default;
        await stop(1000);
      }
    }
    arr[0].color = ElementStates.Modified;
    setNewArr([...arr]);
  };
  // общая сортировка
  const sort = async () => {
    value === "1" ? await selectionSort(newArr) : await bubbleSort(newArr);
  };

  const onFormIncreaseSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsIncrease(true);
    setIsLoader(true);
    await sort();
    setIsLoader(false);
  };
  const onFormDecreaseSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsIncrease(false);
    setIsLoader(true);
    await sort();
    setIsLoader(false);
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <main className={stylesSort.main}>
        <form className={stylesSort.form}>
          <fieldset className={stylesSort.radioFieldset}>
            <RadioInput
              label="Выбор"
              extraClass="bubble"
              value="1"
              checked={value === "1" ? true : false}
              onChange={chengeValue}
            />
            <RadioInput
              label="Пузырёк"
              extraClass="bubble"
              value="2"
              checked={value === "2" ? true : false}
              onChange={chengeValue}
            />
          </fieldset>
          <div className={stylesSort.buttons}>
            <Button
              sorting={Direction.Ascending}
              text="По возрастанию"
              isLoader={isLoader}
              onClick={onFormIncreaseSubmit}
            />
            <Button
              sorting={Direction.Descending}
              text="По убыванию"
              isLoader={isLoader}
              onClick={onFormDecreaseSubmit}
            />
          </div>
          <Button
            text="Новый массив"
            isLoader={isLoader}
            onClick={() => {
              randomArr();
            }}
          />
        </form>
        <ul className={stylesSort.list}>
          {newArr.map((item) => (
            <li className={stylesSort.column} key={item.key}>
              <Column index={item.element} state={item.color} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
