import renderer from "react-test-renderer";
import { Button } from "./button";

describe("button", () => {
  it("A button without text is rendered without errors", () => {
    const button = renderer.create(<Button text="" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("A button with text is rendered without errors", () => {
    const button = renderer.create(<Button text="Text" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("The locked button is rendered without errors", () => {
    const button = renderer.create(<Button text="Text" disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("A button with loader is rendered without errors", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
});
