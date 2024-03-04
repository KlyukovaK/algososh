import {
  colorChanging,
  colorModified,
} from "../../src/constants/constantsTest";

describe("string page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/recursion");
  });
  it("button is locked when the input is empty", function () {
    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="button-reverse"]').should("be.disabled");
  });

  it("the string explands correctly", function () {
    const text = "hello";
    cy.get('[data-testid="input"]').type(text).should("have.value", text);
    cy.get('[data-testid="button-reverse"]').click();
    cy.get("[class^=circle_circle]").as("circle");
    const textArr = text.split("");
    for (let i: number = 0; i < Math.round(text.length / 2); i++) {
      cy.get("@circle").eq(i).should("have.css", "border", colorChanging);
      cy.get("@circle")
        .eq(text.length - i - 1)
        .should("have.css", "border", colorChanging);
      cy.get("@circle").eq(i).contains(textArr[i]);
      cy.get("@circle")
        .eq(text.length - i - 1)
        .contains(textArr[text.length - i - 1]);
      cy.wait(300);
      cy.get("@circle").eq(i).should("have.css", "border", colorModified);
      cy.get("@circle")
        .eq(text.length - i - 1)
        .should("have.css", "border", colorModified);
      cy.get("@circle")
        .eq(i)
        .contains(textArr[text.length - i - 1]);
      cy.get("@circle")
        .eq(text.length - i - 1)
        .contains(textArr[i]);
    }
  });
});
