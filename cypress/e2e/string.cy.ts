describe("string page work correctly", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("/recursion");
  });
  it("button is locked when the input is empty", function () {
    cy.get('[data-testid="input"]').should("contain", "");
    cy.get('[data-testid="button-reverse"]').should("be.disabled");
  });
});
