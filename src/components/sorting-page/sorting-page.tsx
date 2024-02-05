import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import stylesSort from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { TArrSort, TButton } from "../../types/elements";
import { useForm } from "../../utils/useForm";
import { addArr } from "../../utils/addArr";
import { bubbleSort, selectionSort } from "./sorting.utils";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [newArr, setNewArr] = useState<Array<TArrSort>>([]);
  const [isLoader, setIsLoader] = useState<TButton>({
    increasing: false,
    descending: false,
    addArr: false,
  });
  const [isIncrease, setIsIncrease] = useState(false);
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

  // общая сортировка
  const sort = async () => {
    values.radioButton === "1"
      ? await selectionSort(newArr, setNewArr, isIncrease)
      : await bubbleSort(newArr, setNewArr, isIncrease);
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
              checked={values.radioButton === "1"}
              onChange={handleChange}
            />
            <RadioInput
              label="Пузырёк"
              extraClass="bubble"
              name="radioButton"
              value="2"
              checked={values.radioButton === "2"}
              onChange={handleChange}
            />
          </fieldset>
          <div className={stylesSort.buttons}>
            <Button
              sorting={Direction.Ascending}
              text="По возрастанию"
              isLoader={isLoader.increasing}
              onClick={onFormIncreaseSubmit}
              disabled={arr.length === 0 || isDisabled.increasing}
            />
            <Button
              sorting={Direction.Descending}
              text="По убыванию"
              isLoader={isLoader.descending}
              onClick={onFormDecreaseSubmit}
              disabled={arr.length === 0 || isDisabled.descending}
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
