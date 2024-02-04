import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styleList from "./list-page.module.css";
import { useForm } from "../../utils/useForm";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list-class";
import { TArrList } from "../../types/elements";
import { stop } from "../../utils/stop";
type TButtons = {
  addInHeadButton: boolean;
  addInTailButton: boolean;
  deleteInHeadButton: boolean;
  deleteInTailButton: boolean;
  addByIndexButton: boolean;
  deleteByIndexButton: boolean;
};
export const ListPage: React.FC = () => {
  const newlist = new LinkedList<TArrList>();
  const [list] = useState<LinkedList<TArrList>>(newlist);
  const [elements, setElements] = useState<Array<TArrList>>([]);
  const { values, handleChange, setValues } = useForm({
    elementInput: "",
    indexInput: "",
  });
  const initialButtons = {
    addInHeadButton: false,
    addInTailButton: false,
    deleteInHeadButton: false,
    deleteInTailButton: false,
    addByIndexButton: false,
    deleteByIndexButton: false,
  };
  const [isLoader, setIsLoader] = useState<TButtons>(initialButtons);
  const [isDisabled, setIsDisabled] = useState<TButtons>(initialButtons);

  const newElement: TArrList = {
    element: values.elementInput,
    head: null,
    tail: null,
    color: ElementStates.Modified,
  };

  const SmallCircle = (
    element: string | null | undefined
  ): string | React.ReactElement | null => {
    if (element) {
      return <Circle letter={element} isSmall state={ElementStates.Changing} />;
    }
    return null;
  };
  // Добавление новых элементов со своим цветом и ключем из массива
  const addArr = (arr: (string | null)[], element: string | null) => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({
        element: arr[i],
        color: ElementStates.Default,
        head: SmallCircle(element),
        tail: SmallCircle(element),
      });
    }
    return newArr;
  };

  const getElementsFromList = () => {
    const el: Array<TArrList> = [];
    list.toArray().map((item) => el.push(item.value));
    setElements([...el]);
  };
  // создание исходного списка
  useEffect(() => {
    if (list.getSize() === 0) {
      const length = Math.random() * (4 - 1) + 1;
      const max = 100;
      const numbers = [];
      for (let i = 0; i < length; i++) {
        numbers[i] = Math.round(Math.random() * max).toString();
      }
      const newArr = addArr(numbers, null);
      newArr.forEach((el) => {
        list.append(el);
      });
      getElementsFromList();
    }
  });
  // изменение конечного цвета
  const changeColorDefault = (): void => {
    for (let i = 0; i < list.getSize(); i++) {
      list.toArray()[i].value.color = ElementStates.Default;
      getElementsFromList();
    }
  };

  const oldElementHead = (i: number, state: string) => {
    elements[i] = {
      element: elements[i].element,
      head: SmallCircle(values.elementInput),
      tail: null,
      color: state === "one" ? ElementStates.Default : ElementStates.Changing,
    };
  };

  const deleteOldElement = (i: number, state: string, head: string | null) => {
    elements[i] = {
      element: "",
      head: head ? "head" : null,
      tail: SmallCircle(String(elements[i].element)),
      color: state === "one" ? ElementStates.Default : ElementStates.Changing,
    };
  };

  // добавление елемента в head
  const addElementHead = async () => {
    setIsLoader({ ...isLoader, addInHeadButton: true });
    setIsDisabled({
      addInHeadButton: false,
      addInTailButton: true,
      deleteInHeadButton: true,
      deleteInTailButton: true,
      addByIndexButton: true,
      deleteByIndexButton: true,
    });
    oldElementHead(0, "one");
    await stop(500);
    list.prepend(newElement);
    getElementsFromList();
    await stop(500);
    changeColorDefault();
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
    setValues({ elementInput: "", indexInput: "" });
  };
  // добавление елемента в tail
  const addElementTail = async () => {
    setIsLoader({ ...isLoader, addInTailButton: true });
    setIsDisabled({
      addInHeadButton: true,
      addInTailButton: false,
      deleteInHeadButton: true,
      deleteInTailButton: true,
      addByIndexButton: true,
      deleteByIndexButton: true,
    });
    const finalEl = elements.length - 1;
    oldElementHead(finalEl, "one");
    await stop(500);
    list.append(newElement);
    getElementsFromList();
    await stop(500);
    changeColorDefault();
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
    setValues({ elementInput: "", indexInput: "" });
  };

  // удаление елемента в head
  const deleteElementHead = async () => {
    setIsLoader({ ...isLoader, deleteInHeadButton: true });
    setIsDisabled({
      addInHeadButton: true,
      addInTailButton: true,
      deleteInHeadButton: false,
      deleteInTailButton: true,
      addByIndexButton: true,
      deleteByIndexButton: true,
    });
    deleteOldElement(0, "one", "head");
    await stop(500);
    list.deleteHead();
    getElementsFromList();
    await stop(500);
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
  };
  // удаление елемента в tail
  const deleteElementTail = async () => {
    setIsLoader({ ...isLoader, deleteInTailButton: true });
    setIsDisabled({
      addInHeadButton: true,
      addInTailButton: true,
      deleteInHeadButton: true,
      deleteInTailButton: false,
      addByIndexButton: true,
      deleteByIndexButton: true,
    });
    const finalEl = elements.length - 1;
    deleteOldElement(finalEl, "one", null);
    await stop(500);
    list.deleteTail();
    getElementsFromList();
    await stop(500);
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
  };

  // добавление елемента по индексу
  const addElementByIndex = async () => {
    setIsLoader({ ...isLoader, addByIndexButton: true });
    setIsDisabled({
      addInHeadButton: true,
      addInTailButton: true,
      deleteInHeadButton: true,
      deleteInTailButton: true,
      addByIndexButton: false,
      deleteByIndexButton: true,
    });
    for (let i = 0; i <= Number(values.indexInput); i++) {
      oldElementHead(i, "many");
      if (i > 0 && i - 1 === 0) {
        elements[i - 1].head = "head";
      } else if (i > 0) {
        elements[i - 1].head = "";
      }
      setElements([...elements]);
      await stop(500);
    }
    await stop(500);
    list.addByIndex(newElement, Number(values.indexInput));
    getElementsFromList();
    await stop(500);
    changeColorDefault();
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
    setValues({ elementInput: "", indexInput: "" });
  };

  // удаление елемента по индексу
  const deleteByIndex = async () => {
    setIsLoader({ ...isLoader, deleteByIndexButton: true });
    setIsDisabled({
      addInHeadButton: true,
      addInTailButton: true,
      deleteInHeadButton: true,
      deleteInTailButton: true,
      addByIndexButton: true,
      deleteByIndexButton: false,
    });
    for (let i = 0; i <= Number(values.indexInput); i++) {
      elements[i].color = ElementStates.Changing;
      if (i === Number(values.indexInput)) {
        deleteOldElement(i, "many", null);
      }
      setElements([...elements]);
      await stop(500);
    }
    list.deleteByIndex(Number(values.indexInput));
    getElementsFromList();
    await stop(500);
    changeColorDefault();
    setIsLoader(initialButtons);
    setIsDisabled(initialButtons);
    setValues({ elementInput: "", indexInput: "" });
  };

  return (
    <SolutionLayout title="Связный список">
      <main className={styleList.main}>
        <form className={styleList.form}>
          <div className={styleList.buttonsList}>
            <Input
              type="text"
              placeholder="Введите значение"
              name="elementInput"
              isLimitText
              maxLength={4}
              onChange={handleChange}
              value={values.elementInput}
            />
            <Button
              text="Добавить в head"
              onClick={addElementHead}
              isLoader={isLoader.addInHeadButton}
              disabled={
                !values.elementInput || isDisabled.addInHeadButton
                  ? true
                  : false
              }
            />
            <Button
              text="Добавить в tail"
              isLoader={isLoader.addInTailButton}
              onClick={addElementTail}
              disabled={
                !values.elementInput || isDisabled.addInTailButton
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить из head"
              onClick={deleteElementHead}
              isLoader={isLoader.deleteInHeadButton}
              disabled={
                list.getSize() === 0 || isDisabled.deleteInHeadButton
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить из tail"
              onClick={deleteElementTail}
              isLoader={isLoader.deleteInTailButton}
              disabled={
                list.getSize() === 0 || isDisabled.deleteInTailButton
                  ? true
                  : false
              }
            />
          </div>
          <div className={styleList.buttonsIndex}>
            <Input
              type="number"
              placeholder="Введите индекс"
              name="indexInput"
              isLimitText={false}
              onChange={handleChange}
              value={values.indexInput}
            />
            <Button
              text="Добавить по индексу"
              onClick={addElementByIndex}
              isLoader={isLoader.addByIndexButton}
              disabled={
                !values.indexInput ||
                !values.elementInput ||
                Number(values.indexInput) > list.getSize() ||
                isDisabled.addByIndexButton
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить по индексу"
              onClick={deleteByIndex}
              isLoader={isLoader.deleteByIndexButton}
              disabled={
                !values.indexInput ||
                list.getSize() === 0 ||
                Number(values.indexInput) > list.getSize() ||
                isDisabled.deleteByIndexButton
                  ? true
                  : false
              }
            />
          </div>
        </form>
        <ul className={styleList.list}>
          {elements.map((item, i) => (
            <li className={styleList.circle} key={i}>
              <Circle
                letter={item.element}
                index={i}
                head={item.head === null && i === 0 ? "head" : item.head}
                tail={
                  item.tail === null && i === elements.length - 1
                    ? " tail"
                    : item.tail
                }
                state={item.color}
              />
              {i !== elements.length - 1 && <ArrowIcon />}
            </li>
          ))}
        </ul>
      </main>
    </SolutionLayout>
  );
};
