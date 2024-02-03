import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleQueue from "./queue-page.module.css";
import { TArr } from "../../types/elements";
import { stop } from "../../utils/stop";
import { Queue } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { useForm } from "../../utils/useForm";

type THeadTaile = {
  head: number;
  tail: number;
};
export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [newArr, setNewArr] = useState<Array<TArr>>([]);
  const [headTail, saetHeadTail] = useState<THeadTaile>({
    head: 0,
    tail: 0,
  });
  const [isChangeColor, setChangeColor] = useState<{
    head: boolean;
    tail: boolean;
  }>({ head: false, tail: false });
  const { values, handleChange, setValues } = useForm({ input: "" });

  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: (string | null)[]): void => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i] ? arr[i] : " ",
        color: ElementStates.Default,
        key: nanoid(5),
        index: i,
      });
    }
    setNewArr(newArr);
  };

  useEffect(() => {
    if (queue.isEmpty()) {
      addArr(queue.getElements());
    }
  }, [queue.isEmpty]);

  const addElement = async () => {
    addArr(queue.getElements());
    setChangeColor({ head: false, tail: true });
    const newElement = values.input;
    queue.enqueue(newElement);
    await stop(500);
    addArr(queue.getElements());
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    setChangeColor({ head: false, tail: false });
    setValues({ input: "" });
  };

  const deleteElement = async () => {
    setChangeColor({ head: true, tail: false });
    await stop(500);
    queue.dequeue();
    addArr(queue.getElements());
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    await stop(500);
    setChangeColor({ head: false, tail: false });
  };

  const clean = (): void => {
    queue.clearElements();
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    addArr(queue.getElements());
    console.log(headTail.head, headTail.tail, queue.isEmpty());
  };

  return (
    <SolutionLayout title="Очередь">
      <main className={styleQueue.main}>
        <form className={styleQueue.form}>
          <div className={styleQueue.addStack}>
            <Input
              type="text"
              name="input"
              placeholder = "Введите значение"
              isLimitText
              maxLength={4}
              onChange={handleChange}
              value={values.input}
            />
            <Button
              text="Добавить"
              onClick={addElement}
              disabled={!values.input ? true : false}
            />
            <Button
              text="Удалить"
              onClick={deleteElement}
              disabled={queue.isEmpty() ? true : false}
            />
          </div>
          <Button
            text="Очистить"
            onClick={clean}
            disabled={queue.isEmpty() ? true : false}
          />
        </form>
        <ul className={styleQueue.list}>
          {newArr.map((item, i) => (
            <li className={styleQueue.circle} key={item.key}>
              <Circle
                letter={item.element}
                index={item.index}
                head={!queue.isEmpty() && headTail.head === i ? "head" : null}
                tail={
                  !queue.isEmpty() && headTail.tail - 1 === i ? "tail" : null
                }
                state={
                  (isChangeColor.tail && headTail.tail === i) ||
                  (isChangeColor.head && headTail.head === i)
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
