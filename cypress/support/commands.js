// cypress/support/commands.js

//const cypress = require("cypress")

Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
  cy.visit('/signup')
  cy.get('#email').type(email, { log: false })
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
})

Cypress.Commands.add('loginUser', (
  username = Cypress.env('login_MAIL'),
  userpassword = Cypress.env('login_PASSWORD')
)  => {
  cy.visit('/login')
  cy.get('#email').type(username, { log: false })
  cy.get('#password').type(userpassword, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait(1000)
  cy.contains('h1', 'Your Notes').should('be.visible')

})

/*
  Cypress.Commands.add('loginGui', (
    username = Cypress.env('login_MAIL'),
    userpassword = Cypress.env('login_PASSWORD')
  )  => {
    cy.session([username, userpassword], () => {

      cy.visit('/login')
      cy.get('#email').type(username, { log: false })
      cy.get('#password').type(userpassword, { log: false })
      cy.contains('button', 'Login').click()
      cy.wait(1000)
      cy.contains('h1', 'Your Notes').should('be.visible')

    })

  })*/


Cypress.Commands.add('loginGui', (
  username = Cypress.env('login_MAIL'),
  userpassword = Cypress.env('login_PASSWORD'),
  { cacheSession = true } = {}
) => {
  const login = () => {
    cy.visit('/login')
    cy.get('#email').type(username)
    cy.get('#password').type(userpassword, { log: false })
    cy.contains('button', 'Login').click()
    cy.wait(2000)
    cy.contains('h1', 'Your Notes').should('be.visible')
  }

  if (cacheSession) {
    cy.session([username, userpassword], login)
  } else {
    login()
  }
})