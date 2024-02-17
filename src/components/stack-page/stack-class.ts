interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
  clearElements: () => void;
  changeColor: (item: T) => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.getSize() === 0) {
      return null;
    }
    return this.container[this.getSize() - 1];
  };

  getElements = (): T[] => {
    return this.container;
  };

  clearElements = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  changeColor = (item: T): void => {
    this.container[this.getSize() - 1] = item;
  };
}
