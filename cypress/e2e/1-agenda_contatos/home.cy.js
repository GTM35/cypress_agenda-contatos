describe("Testes para a página de contatos", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar um contato na agenda", () => {
    cy.get('[type="text"]').type("Gustavo Teofilo");
    cy.get('[type="email"]').type("Gustavo@ebac.com.br");
    cy.get('[type="tel"]').type(11935730078);
    cy.get(".adicionar").click();

    cy.get(".contato").contains("Gustavo Teofilo").should("have.length", 1);
  });

  it("Deve deletar o ultimo contato na agenda", () => {
    cy.get(".contato").last().find(".delete").click();
    cy.get(".contato").contains("Gustavo Teofilo").should("not.have.length", 1);
  });

  it("Deve adicionar um novo contato e alterar nome e e-mail", () => {
    /* Adiciona um novo contato */
    cy.get('[type="text"]').type("Giovane Oliveira");
    cy.get('[type="email"]').type("Giovane@ebac.com.br");
    cy.get('[type="tel"]').type(11935730078);
    cy.get(".adicionar").click();

    /* Edição do ultimo contato */
    cy.get(".contato").last().find(".edit").click();

    cy.get('input[type="text"]').type("{selectAll}{del}Augusto Oliveira");
    cy.get('input[type="email"]').type("{selectAll}{del}augusto@teste.com");

    /* Confirmando alteração */
    cy.get("button.alterar").click();

    cy.get(`.contato`).contains(`Augusto Oliveira`).should(`have.length`, 1);
  });
});
