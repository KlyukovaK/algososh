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

type THeadTaile = {
  head: number;
  tail: number;
};
export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7));
  const [value, setValue] = useState<string>("");
  const [newArr, setNewArr] = useState<Array<TArr>>([]);
  const [headTail, saetHeadTail] = useState<THeadTaile>({
    head: 0,
    tail: 0,
  });

  const onClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setValue(val);
  };

  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: (string | null)[], type: string): void => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i] ? arr[i] : " ",
        color:
          type === "default" ? ElementStates.Default : ElementStates.Changing,
        key: nanoid(5),
        index: i,
      });
    }
    setNewArr(newArr);
  };

  useEffect(() => {
    if (queue.isEmpty()) {
      addArr(queue.getElements(), "default");
    }
  }, [queue.isEmpty]);

  const addElement = async () => {
    addArr(queue.getElements(), "cange");
    const newElement = value;
    queue.enqueue(newElement);
    await stop(500);
    addArr(queue.getElements(), "default");
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    setValue("");
  };

  const deleteElement = async () => {
    queue.dequeue();
    addArr(queue.getElements(), "default");
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    await stop(500);
  };

  const clean = (): void => {
    queue.clearElements();
    saetHeadTail({ head: queue.getHead(), tail: queue.getTail() });
    addArr(queue.getElements(), "default");
    console.log(headTail.head, headTail.tail, queue.isEmpty());
  };

  return (
    <SolutionLayout title="Очередь">
      <main className={styleQueue.main}>
        <form className={styleQueue.form}>
          <div className={styleQueue.addStack}>
            <Input
              type="text"
              isLimitText
              maxLength={4}
              onChange={onClick}
              value={value}
            />
            <Button text="Добавить" onClick={addElement} />
            <Button text="Удалить" onClick={deleteElement} />
          </div>
          <Button text="Очистить" onClick={clean} />
        </form>
        <ul className={styleQueue.list}>
          {newArr.map((item, i) => (
            <li className={styleQueue.circle} key={item.key}>
              <Circle
                letter={item.element}
                index={item.index}
                head={!queue.isEmpty() && headTail.head === i ? "top" : null}
                tail={
                  !queue.isEmpty() && headTail.tail - 1 === i ? "tail" : null
                }
                state={item.color}
              />
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
