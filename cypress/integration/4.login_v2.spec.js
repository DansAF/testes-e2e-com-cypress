// cypress/integration/signup.spec.js

it('Teste no Login', () => {

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.loginUser()
  cy.wait('@getNotes')
})