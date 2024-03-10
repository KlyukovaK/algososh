import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";
import { BrowserRouter } from "react-router-dom";
import { DELAY_IN_MS } from "../../constants/delays";

describe("String", () => {
  it("The reversed string with an even number of characters is displayed without error", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    //test input
    const input = screen.getByTestId("input");
    const buttonReverse = screen.getByTestId("button-reverse");
    
    expect(input.value).toBe(""); // empty before
    expect(buttonReverse).toBeDisabled();
    fireEvent.change(input, { target: { value: "1234" } });
    expect(input.value).toBe("1234");
    fireEvent.click(buttonReverse);

    await waitFor(
      () => {
        const circle = screen.getAllByTestId("circle");
        expect(circle[0]).toHaveTextContent("4");
        expect(circle[1]).toHaveTextContent("3");
        expect(circle[2]).toHaveTextContent("2");
        expect(circle[3]).toHaveTextContent("1");
      },
      { timeout: DELAY_IN_MS * 4 }
    );
  });

  it("The reversed string with an odd number of characters is displayed without error", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const input = screen.getByTestId("input");
    const buttonReverse = screen.getByTestId("button-reverse");

    expect(input.value).toBe(""); // empty before
    expect(buttonReverse).toBeDisabled();
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe("123");
    fireEvent.click(buttonReverse);

    await waitFor(
      () => {
        const circle = screen.getAllByTestId("circle");
        expect(circle[0]).toHaveTextContent("3");
        expect(circle[1]).toHaveTextContent("2");
        expect(circle[2]).toHaveTextContent("1");
      },
      { timeout: DELAY_IN_MS * 3 }
    );
  });
  it("The reversed string with one character is displayed without error", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const input = screen.getByTestId("input");
    const buttonReverse = screen.getByTestId("button-reverse");

    expect(input.value).toBe(""); // empty before
    expect(buttonReverse).toBeDisabled();
    fireEvent.change(input, { target: { value: "1" } });
    expect(input.value).toBe("1");
    fireEvent.click(buttonReverse);

    await waitFor(
      () => {
        const circle = screen.getAllByTestId("circle");
        expect(circle[0]).toHaveTextContent("1");
      },
      { timeout: DELAY_IN_MS }
    );
  });
  it("The empty string is displayed without error", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );

    const input = screen.getByTestId("input");
    const buttonReverse = screen.getByTestId("button-reverse");

    expect(input.value).toBe(""); // empty
    expect(buttonReverse).toBeDisabled();
  });
});
