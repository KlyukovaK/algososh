import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from "./button";

describe("Button", () => {
  it("The button without text is rendered without errors", () => {
    const button = renderer.create(<Button text="" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("The button with text is rendered without errors", () => {
    const button = renderer.create(<Button text="Text" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("The locked button is rendered without errors", () => {
    const button = renderer.create(<Button text="Text" disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("The button with loader is rendered without errors", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Checking whether the callback is called correctly when the button is clicked", () => {
    const onClick = jest.fn();
    render(<Button text="Text" onClick={onClick}/>)
    const button =screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
