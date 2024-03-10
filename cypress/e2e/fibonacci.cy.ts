/// <reference types="cypress" />
import { classCircle, colorDefault, input } from "../../src/constants/constantsTest";

describe("fibonacci page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/fibonacci");
  });
  it("button is locked when the input is empty", function () {
    cy.get(input).clear();
    cy.contains("Рассчитать").should("be.disabled");
  });
  it("numbers are generated correctly", function () {
    cy.get(input).type("5");
    cy.contains("Рассчитать").click();
    cy.get(classCircle).as("circle");
    cy.wait(300);
    const numbers = [1, 1, 2, 3, 5, 8];
    for (let i = 0; i < 5; i++) {
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.get('p[class*="circle_index"]').eq(i).contains(i);
      cy.get("@circle").eq(i).contains(numbers[i]);
    }
  });
});
