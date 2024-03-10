import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stylesFibonacci from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../utils/useForm";
import { getFibonacci } from "./fibonacci.utils";
import { stop } from "../../utils/stop";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const { values, handleChange } = useForm({ input: "" });

  const getFibonacciElements = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    const arr = await getFibonacci(Number(values.input));
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        await stop(SHORT_DELAY_IN_MS);
        setFibonacci(arr.slice(0, i + 1));
      }
    }
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <main className={stylesFibonacci.main}>
        <form className={stylesFibonacci.form} onSubmit={getFibonacciElements}>
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
            type="submit"
            disabled={
              !values.input || values.input === "0" || Number(values.input) > 19
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
