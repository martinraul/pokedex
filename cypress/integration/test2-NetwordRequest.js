/// <reference types="cypress" />
const container = "[data-cy=container]";

context("Test with Intercepted Network Request", () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = "https://unpkg.com/unfetch/dist/unfetch.umd.js";

    cy.request(polyfillUrl).then((response) => {
      fetchPolyfill = response.body;
    });

    cy.server(),
      cy
        .route(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit20",
          "fixture:pokemonList"
        ).as("LIST");

    cy.route(
      " https://pokeapi.co/api/v2/pokemon/bulbasaur",
      "fixture:bulbasaur"
    ).as("getBulbasaur");

    cy.route(
      " https://pokeapi.co/api/v2/pokemon/venusaur",
      "fixture:venusaur"
    ).as("getVenusaur");

    cy.visit("http://127.0.0.1:8080", {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it("makes sure STUBBED list is loaded and select two STUBBED pokemons", () => {
   
    cy.get(container)
      .find("li")
      .should("have.length", 20)
      .contains("STUBBED")
      .get("#list > li:nth-child(1)")
      .click();

    cy.contains("NINO")
      .should("be.visible")
      .get("#list > li:nth-child(3)")
      .click();

    cy.contains("JUANFA").should("be.visible");
  });
});
