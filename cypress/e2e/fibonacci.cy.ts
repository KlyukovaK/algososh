import { colorDefault } from "../../src/constants/constantsTest";

describe("fibonacci page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/fibonacci");
  });
  it("button is locked when the input is empty", function () {
    cy.get('[name="input"]').clear();
    cy.contains("Рассчитать").should("be.disabled");
  });
  it("numbers are generated correctly", function () {
    cy.get('[name="input"]').type("5");
    cy.contains("Рассчитать").click();
    cy.get("[class^=circle_circle]").as("circle");
    cy.wait(300);
    const numbers = [1, 1, 2, 3, 5, 8];
    for (let i = 0; i < 5; i++) {
      cy.get("@circle").eq(i).should("have.css", "border", colorDefault);
      cy.get("@circle").eq(i).contains(numbers[i]);
    }
  });
});
