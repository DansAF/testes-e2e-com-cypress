// cypress/integration/signup.spec.js

it('Teste no Login', () => {
    const faker = require('faker')
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
  
      cy.wait(5000)
      cy.wait('@getNotes')
      cy.contains('h1', 'Your Notes').should('be.visible')
      cy.wait(3000)
  
      cy.contains('Create a new note').click()
      cy.wait(1000)

      cy.get('#content').type(texto)
      cy.contains('button', 'Create').click()
      cy.wait(3000)
  
      cy.contains('Create a new note').click()
      cy.wait(1000)

      cy.get('#content').type(`${texto}{enter}`)
      cy.contains('button', 'Create').click()
      cy.wait(5000)
  
  
      cy.wait('@getNotes')
      cy.contains('h1', 'Your Notes').should('be.visible')
      cy.wait(10000)
  
      //cy.contains('a', 'Logout').click()
  
  

  })