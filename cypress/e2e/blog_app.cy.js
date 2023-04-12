/* eslint-disable no-undef */
describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Helsinki Finn",
      username: "helsinki",
      password: "helsinki",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login form shown", function () {
    cy.contains("login to application");
  });

  it("login credentials", function () {
    cy.get("#username").type("helsinki");
    cy.get("#password").type("helsinki");
    cy.get("#login-button").click();
    cy.contains("helsinki is logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("helsinki");
      cy.get("#password").type("helsinki");
      cy.get("#login-button").click();
    });
    it("a new blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type("cypress title");
      cy.get("#author").type("cypress author");
      cy.get("#url").type("cypress.url.com");
      cy.get("#create-button").click();
      cy.contains("cypress title");
    });
  });
});
