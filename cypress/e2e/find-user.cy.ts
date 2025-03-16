/// <reference types="cypress"/>
describe("Find user Repo", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("location elements input", () => {
    const form = cy.get("form[data-testid='form-user-search']");
    const input = cy.get("input[data-testid='input-user-search']");
    input.type("alendra1945");
    form.submit();
    cy.wait(1000);
    const firstUser = cy
      .get("[data-testid='github-user-0']")
      .should("be.visible");
    firstUser.click();
  });
});
