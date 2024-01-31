import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stylesFibonacci from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<string>();
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const num = e.target.value;
    setNumber(num);
  };

  const getFibonacci = async (n: number) => {
    const arr: number[] = [0, 1];
    setFibonacci([1]);
    for (let i = 2; i < n + 2; i++) {
      await stop();
      arr[i] = arr[i - 2] + arr[i - 1];
      setFibonacci(arr.slice(1, n + 2));
    }
  };

  const stop = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    await getFibonacci(Number(number));
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <main className={stylesFibonacci.main}>
        <form className={stylesFibonacci.form} onSubmit={onFormSubmit}>
          <Input
            type="number"
            min={1}
            max={19}
            isLimitText
            maxLength={2}
            onChange={onClick}
          />
          <Button text="Рассчитать" isLoader={isLoader} />
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
