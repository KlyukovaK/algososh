/// <reference types="cypress" /> 
describe("service is available", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("MainPage should open by default", function () {
    cy.visit("/");
  });
  it("string page opened", function () {
    cy.get('a[href*="/recursion"]').click();
    cy.url().should("include", "/recursion");
    cy.contains("Строка")
  });
  it("fibonacci page opened", function () {
    cy.get('a[href*="/fibonacci"]').click();
    cy.url().should("include", "/fibonacci");
    cy.contains("Фибоначчи")
  });
  it("sorting page opened", function () {
    cy.get('a[href*="/sorting"]').click();
    cy.url().should("include", "/sorting");
    cy.contains("Сортировка")
  });
  it("stack page opened", function () {
    cy.get('a[href*="/stack"]').click();
    cy.url().should("include", "/stack");
    cy.contains("Стек")
  });
  it("queue page opened", function () {
    cy.get('a[href*="/queue"]').click();
    cy.url().should("include", "/queue");
    cy.contains("Очередь")
  });
  it("list page opened", function () {
    cy.get('a[href*="/list"]').click();
    cy.url().should("include", "/list");
    cy.contains("Связный список")
  });
});
