import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SortingPage } from "./sorting-page";
import { bubbleSort } from "./sorting.utils";
import { ElementStates } from "../../types/element-states";
import { TArrSort } from "../../types/elements";

const setNewArr = jest.fn();
describe("Sorting-page", () => {
  it("Correctly sorts an empty array", async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );
    const array: Array<TArrSort> = [
      { element: "", color: ElementStates.Default },
    ];
    const newArray = [{ element: "", color: ElementStates.Modified }];
    const result = await bubbleSort(array, setNewArr, true);
    expect(result).toEqual(newArray);
  });
  it("Correctly sorts an array of one element", async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );
    const array = [{ element: 1, color: ElementStates.Default }];
    const newArray = [{ element: 1, color: ElementStates.Modified }];
    const result = await bubbleSort(array, setNewArr, true);
    expect(result).toEqual(newArray);
  });
  it("Correctly sorts an array of multiple elements in ascending order", async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );
    const array = [
      { element: 3, color: ElementStates.Default },
      { element: 1, color: ElementStates.Default },
      { element: 5, color: ElementStates.Default },
    ];
    const newArray = [
      { element: 1, color: ElementStates.Modified },
      { element: 3, color: ElementStates.Modified },
      { element: 5, color: ElementStates.Modified },
    ];
    const result = await bubbleSort(array, setNewArr, false);
    expect(result).toEqual(newArray);
  });
  it("Correctly sorts an array of multiple elements in descending order", async () => {
    render(
      <BrowserRouter>
        <SortingPage />
      </BrowserRouter>
    );
    const array = [
      { element: 3, color: ElementStates.Default },
      { element: 1, color: ElementStates.Default },
      { element: 5, color: ElementStates.Default },
    ];
    const newArray = [
      { element: 5, color: ElementStates.Modified },
      { element: 3, color: ElementStates.Modified },
      { element: 1, color: ElementStates.Modified },
    ];
    const result = await bubbleSort(array, setNewArr, true);
    expect(result).toEqual(newArray);
  });
});
