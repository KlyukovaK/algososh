describe("stack page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/stack");
  });
  it("the add button is locked when the input is empty", function () {
    cy.get('[name="input"]').clear();
    cy.contains("Добавить").should("be.disabled");
  });

});