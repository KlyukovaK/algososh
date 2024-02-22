import renderer from "react-test-renderer";
import { Circle } from "./circle";

describe("Circle", () => {
  it("A circle without a letter is displayed without errors", () => {
    const circle = renderer.create(<Circle letter="" />).toJSON();
    expect(circle).toMatchSnapshot();
  });

});