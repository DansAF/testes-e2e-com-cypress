it('Teste de Login com cache', () => {
    cy.intercept('GET', '**/notes').as('getNotes')

    cy.loginGui(
        Cypress.env("login_MAIL"),
        Cypress.env("login_PASSWORD"),
       // {cacheSession: false}
    )
    cy.visit('/login')
    cy.wait('@getNotes')
  })