/// <reference types="cypress" />

import {
  circleHead,
  circleIndex,
  classCircle,
  colorChanging,
  colorDefault,
  input,
} from "../../src/constants/constantsTest";

describe("stack page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/stack");
  });
  it("the add button is locked when the input is empty", function () {
    cy.get(input).clear();
    cy.contains("Добавить").should("be.disabled");
  });
  it("adding an element to the stack occurs correctly", function () {
    const test = ["1", "2", "3", "5", "8"];
    test.forEach((el, i) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
      cy.get(classCircle).as("circle");
      cy.get("@circle").eq(i).contains(el);
      cy.get(circleHead).eq(i).contains("top");
      cy.get(circleIndex).eq(i).contains(i);
      cy.get("@circle").eq(i).should("have.css", "border-color", colorChanging);
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.wait(400);
    });
  });
  it("the element is removed correctly", function () {
    const test = ["1", "2", "3"];
    test.forEach((el) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.wait(400);
    cy.get(classCircle).as("circle");
    cy.contains("Удалить").click();
    cy.get("@circle")
      .eq(test.length - 1)
      .should("have.css", "border-color", colorChanging);
    cy.get("@circle")
      .eq(test.length - 1)
      .contains(test[test.length - 1]);
    cy.wait(300);
    cy.get(circleHead)
      .eq(test.length - 2)
      .contains("top");
  });
  it("stack clearing occurs correctly", function () {
    const test = ["1", "2", "3"];
    test.forEach((el) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.contains("Очистить").click();
    cy.get(input).clear();
    cy.contains("Добавить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
    cy.contains("Удалить").should("be.disabled");
    cy.get(classCircle).should("not.exist");
  });
});
