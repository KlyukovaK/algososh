import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stylesFibonacci from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { stop } from "../../utils/stop";
import { useForm } from "../../utils/useForm";

export const FibonacciPage: React.FC = () => {
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { values, handleChange } = useForm({ input: "" });

  const getFibonacci = async (n: number) => {
    const arr: number[] = [0, 1];
    setFibonacci([1]);
    for (let i = 2; i < n + 2; i++) {
      await stop(500);
      arr[i] = arr[i - 2] + arr[i - 1];
      setFibonacci(arr.slice(1, n + 2));
    }
  };

  const getFibonacciElements = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoader(true);
    await getFibonacci(Number(values.input));
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <main className={stylesFibonacci.main}>
        <form className={stylesFibonacci.form}>
          <Input
            type="number"
            name="input"
            min={1}
            max={19}
            isLimitText
            maxLength={2}
            onChange={handleChange}
            value={values.input}
          />
          <Button
            text="Рассчитать"
            isLoader={isLoader}
            onClick={getFibonacciElements}
            disabled={
              !values.input || values.input === "0" || values.input === "20"
                ? true
                : false
            }
          />
        </form>
        <ul className={stylesFibonacci.list}>
          {fibonacci?.map((item, index) => (
            <li className={stylesFibonacci.circle} key={index}>
              <Circle letter={item} index={index} />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
