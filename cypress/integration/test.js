const URL = "http://192.168.0.100:8080/";
const container = "[data-cy=container]";

context("Pokedex", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Makes sure everthing is ok when loading site", () => {
    it(" makes sure there are one header", () => {
      cy.get(container).find("h1").should("have.length", 1);
    });
    it("makes sure List is ok", () => {
      cy.get(container).find("li").should("have.length", 20);
    });
    it("makes sure there div to show the pokemon selected", () => {
      cy.get(container).find("#showPokemon").should("have.length", 1);
    });
    it("makes sure there are two buttons", () => {
      cy.get(container).find("button").should("have.length", 2);
    });
    it("makes sure buttons work", () => {
      cy.get("#next-button").click();
      cy.get(container).find("li").should("have.length", 20);
      cy.get("#previous-button").click();
      cy.get(container).find("li").should("have.length", 20);
    });
  });

  describe("Select and pokemon and show it", () => {
    it("Select and click, Pokemon should be visible", () => {
      cy.get("#list > li:nth-child(3)").click();
      cy.contains("VENUSAUR").should("be.visible");
      cy.contains("GRASS").should("be.visible");
    });
    it("Select and click again, Pokemon should be visible", () => {
      cy.get("#list > li:nth-child(4)").click();
      cy.contains("CHARMANDER").should("be.visible");
      cy.contains("FIRE").should("be.visible");
    });
  });
});
