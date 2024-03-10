/// <reference types="cypress" />

import {
  circleContent,
  circleHead,
  circleSmall,
  circleTail,
  classCircle,
  colorChanging,
  colorDefault,
  colorModified,
} from "../../src/constants/constantsTest";

describe("list page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/list");
  });
  it("the add button is locked when the input is empty", function () {
    cy.get('[name="elementInput"]').clear();
    cy.get('[name="indexInput"]').clear();
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
    cy.get(circleHead).first().contains("head");
    cy.get(circleTail).last().contains("tail");
  });
  it("rendering of the default list works correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    for (let i = 0; i < 6; i++) {
      cy.get("@circle").eq(i).should("not.be.undefined");
      cy.get(circleHead).first().contains("head");
      cy.get(circleTail).last().contains("tail");
    }
  });
  it("the element is added to head correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').type("5");
    cy.get(circleHead).first().contains("head");
    cy.contains("Добавить в head").click();
    cy.get(circleSmall)
      .should("have.css", "border-color", colorChanging)
      .contains("5");
    cy.get(circleSmall).should("not.exist");
    cy.get(circleHead).first().contains("head");
    cy.get("@circle")
      .first()
      .should("have.css", "border-color", colorModified)
      .contains("5");
    cy.get("@circle").first().should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').clear();
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
  });
  it("the element is added to tail correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').type("5");
    cy.get(circleTail).last().contains("tail");
    cy.contains("Добавить в tail").click();
    cy.get(circleSmall)
      .should("have.css", "border-color", colorChanging)
      .contains("5");
    cy.get(circleSmall).should("not.exist");
    cy.get(circleTail).last().contains("tail");
    cy.get("@circle")
      .last()
      .should("have.css", "border-color", colorModified)
      .contains("5");
    cy.get("@circle").last().should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').clear();
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
  });
  it("the element is added by index correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').type("5");
    cy.get('[name="indexInput"]').type("1");
    cy.contains("Добавить по индексу").click();
    cy.get(circleContent).eq(0).children("[class*=circle_changing]");
    cy.get(circleContent).eq(0).children(circleHead).contains("5");
    cy.get(circleSmall).should("have.css", "border-color", colorChanging);
    cy.get(circleHead).first().contains("head");
    cy.get(circleContent).eq(1).children("[class*=circle_changing]");
    cy.get(circleContent).eq(1).children(circleHead).contains("5");
    cy.get("@circle").eq(1).should("have.css", "border-color", colorModified);
    cy.get(circleSmall).should("not.exist");
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border-color", colorModified)
      .contains("5");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get('[name="elementInput"]').clear();
    cy.get('[name="indexInput"]').clear();
    cy.contains("Добавить по индексу").should("be.disabled");
  });
  it("the element is removed from head correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get("@circle")
      .eq(0)
      .then(($circle) => {
        const text = $circle.text();
        cy.contains("Удалить из head").click();
        cy.get(circleSmall)
          .should("have.css", "border-color", colorChanging)
          .contains(text);
        cy.get("@circle").eq(0).should("not.have.text", text);
        cy.get(circleSmall).should("not.exist");
        cy.get(circleHead).first().contains("head");
      });
  });
  it("the element is removed from tail correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get("@circle")
      .last()
      .then(($circle) => {
        const text = $circle.text();
        cy.contains("Удалить из tail").click();
        cy.get(circleSmall)
          .should("have.css", "border-color", colorChanging)
          .contains(text);
        cy.get("@circle").last().should("not.have.text", text);
        cy.get(circleSmall).should("not.exist");
        cy.get(circleTail).last().contains("tail");
      });
  });
  it("the element is removed by index correctly", function () {
    cy.get(classCircle).as("circle");
    cy.get("@circle").should("have.css", "border-color", colorDefault);
    cy.get('[name="indexInput"]').type("1");
    cy.get("@circle")
      .eq(1)
      .then(($circle) => {
        const text = $circle.text();
        cy.contains("Удалить по индексу").click();
        cy.get("@circle")
          .eq(0)
          .should("have.css", "border-color", colorChanging);
        cy.get("@circle")
          .eq(1)
          .should("have.css", "border-color", colorChanging);
        cy.get(circleSmall)
          .should("have.css", "border-color", colorChanging)
          .contains(text);
        cy.get("@circle").eq(1).should("not.have.text", text);
        cy.get(circleSmall).should("not.exist");
      });
    cy.get('[name="indexInput"]').clear();
    cy.get("@circle").should("have.css", "border-color", colorDefault);
  });
});
