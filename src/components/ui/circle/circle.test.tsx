import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle", () => {
  it("The circle without a letter is displayed without errors", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with a letter is displayed without errors", () => {
    const circle = renderer.create(<Circle letter="A" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with a head is displayed without errors", () => {
    const circle = renderer.create(<Circle head="head" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with react-element in head is displayed without errors", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with a tail is displayed without errors", () => {
    const circle = renderer.create(<Circle tail="tail" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with react-element in tail is displayed without errors", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with a index is displayed without errors", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle with prop isSmall is displayed without errors", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle in the default state is displayed without errors", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle in the changing state is displayed without errors", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("The circle in the modified state is displayed without errors", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
