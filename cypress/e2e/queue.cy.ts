/// <reference types="cypress" />

import {
  circleHead,
  circleIndex,
  circleTail,
  classCircle,
  colorChanging,
  colorDefault,
  input,
} from "../../src/constants/constantsTest";

describe("queue page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/queue");
  });
  it("the add button is locked when the input is empty", function () {
    cy.get(input).clear();
    cy.contains("Добавить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
    cy.contains("Удалить").should("be.disabled");
    cy.get(classCircle).as("circle");
    for (let i = 0; i < 7; i++) {
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.get(circleIndex).eq(i).contains(i);
      cy.get("@circle").eq(i).should("have.text", " ");
    }
  });
  it("adding an element to the queue occurs correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el, i) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
      cy.get(classCircle).as("circle");
      i === 0 && cy.get(circleHead).eq(i).contains("head");
      cy.get("@circle").eq(i).should("have.css", "border-color", colorChanging);
      cy.get("@circle").eq(i).contains(el);
      cy.get(circleIndex).eq(i).contains(i);
      cy.get(circleTail).eq(i).contains("tail");
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.wait(400);
    });
  });
  it("the element is removed from the queue correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.wait(400);
    cy.get(classCircle).as("circle");
    cy.contains("Удалить").click();
    cy.get(circleHead).eq(0).contains("head");
    cy.get("@circle").eq(0).should("have.css", "border-color", colorChanging);
    cy.get("@circle").eq(0).should("have.text", " ");
    cy.get(circleHead).eq(0).should("have.text", "");
    cy.get("@circle").eq(1).should("have.css", "border-color", colorChanging);
    cy.get("@circle").eq(0).should("have.css", "border-color", colorDefault);
    cy.get(circleHead).eq(1).contains("head");
    cy.get("@circle").eq(1).should("have.css", "border-color", colorDefault);
  });
  it("queue clearing occurs correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el) => {
      cy.get(input).type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.wait(400);
    cy.get(classCircle).as("circle");
    cy.contains("Очистить").click();
    cy.get(input).clear();
    cy.contains("Добавить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
    cy.contains("Удалить").should("be.disabled");
    for (let i = 0; i < 7; i++) {
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.get(circleIndex).eq(i).contains(i);
      cy.get("@circle").eq(i).should("have.text", " ");
    }
  });
});
