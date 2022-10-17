// cypress/integration/signup.spec.js

it('Teste no Login', () => {
  // const faker = require('faker')
  const emailAddress = Cypress.env('login_MAIL')
  const password = Cypress.env('login_PASSWORD')
  const texto = Cypress.env('text-teste3')
  //const texto2 = Cypress.env('text-teste4')

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')
  cy.get('#email').type(emailAddress, { log: false })
  cy.get('#password').type(password, { log: false })
  //cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Login').click()

  cy.wait('@getNotes')
  cy.contains('h1', 'Your Notes').should('be.visible')

  cy.contains('Create a new note').click()

  cy.get('#content').type(texto)
  cy.contains('button', 'Create').click()

  cy.contains('Create a new note').click()

  cy.get('#content').type(`${texto}{enter}`)
  cy.contains('button', 'Create').click()


  cy.wait('@getNotes')
  cy.contains('h1', 'Your Notes').should('be.visible')

  //cy.contains('a', 'Logout').click()



})