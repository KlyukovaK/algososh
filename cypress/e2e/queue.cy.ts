/// <reference types="cypress" />

import { colorChanging, colorDefault } from "../../src/constants/constantsTest";

describe("queue page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/queue");
  });
  it("the add button is locked when the input is empty", function () {
    cy.get('[name="input"]').clear();
    cy.contains("Добавить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
    cy.contains("Удалить").should("be.disabled");
    cy.get("[class^=circle_circle]").as("circle");
    for (let i = 0; i < 7; i++) {
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.get('p[class*="circle_index"]').eq(i).contains(i);
      cy.get("@circle").eq(i).should("have.text", " ");
    }
  });
  it("adding an element to the queue occurs correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el, i) => {
      cy.get('[name="input"]').type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
      cy.get("[class^=circle_circle]").as("circle");
      i === 0 && cy.get('div[class*="circle_head"]').eq(i).contains("head");
      cy.get("@circle").eq(i).should("have.css", "border-color", colorChanging);
      cy.get("@circle").eq(i).contains(el);
      cy.get('p[class*="circle_index"]').eq(i).contains(i);
      cy.get('div[class*="circle_tail"]').eq(i).contains("tail");
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.wait(400);
    });
  });
  it("the element is removed from the queue correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el) => {
      cy.get('[name="input"]').type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.wait(400);
    cy.get("[class^=circle_circle]").as("circle");
    cy.contains("Удалить").click();
    cy.get('div[class*="circle_head"]').eq(0).contains("head");
    cy.get("@circle").eq(0).should("have.css", "border-color", colorChanging);
    cy.get("@circle").eq(0).should("have.text", " ");
    cy.get('div[class*="circle_head"]').eq(0).should("have.text", "");
    cy.get("@circle").eq(1).should("have.css", "border-color", colorChanging);
    cy.get("@circle").eq(0).should("have.css", "border-color", colorDefault);
    cy.get('div[class*="circle_head"]').eq(1).contains("head");
    cy.get("@circle").eq(1).should("have.css", "border-color", colorDefault);
  });
  it("queue clearing occurs correctly", function () {
    const test = ["1", "2", "3", "5"];
    test.forEach((el) => {
      cy.get('[name="input"]').type(el);
      cy.contains("Добавить").click();
      cy.wait(400);
    });
    cy.wait(400);
    cy.get("[class^=circle_circle]").as("circle");
    cy.contains("Очистить").click();
    cy.get('[name="input"]').clear();
    cy.contains("Добавить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
    cy.contains("Удалить").should("be.disabled");
    for (let i = 0; i < 7; i++) {
      cy.get("@circle").eq(i).should("have.css", "border-color", colorDefault);
      cy.get('p[class*="circle_index"]').eq(i).contains(i);
      cy.get("@circle").eq(i).should("have.text", " ");
    }
  });
});
