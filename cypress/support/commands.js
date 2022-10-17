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
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.visit('/login')
  cy.get('#email').type(username, { log: false })
  cy.get('#password').type(userpassword, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNote')
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
    cy.intercept('GET', '**/notes/**').as('getNote')

    cy.visit('/login')
    cy.get('#email').type(username)
    cy.get('#password').type(userpassword, { log: false })
    cy.contains('button', 'Login').click()
    cy.wait('@getNote')
    cy.contains('h1', 'Your Notes').should('be.visible')
  }

  if (cacheSession) {
    cy.session([username, userpassword], login)
  } else {
    login()
  }
})

// cypress/support/commands.js

// Outros comands aqui ...

const attachFileHandler = () => cy.get('#file').attachFile('example.json')

Cypress.Commands.add('createNote', (note, attachFile = false) => {
  cy.visit('/notes/new')
  cy.get('#content').type(note)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Create').click()

  cy.contains('.list-group-item', note).should('be.visible')
})

Cypress.Commands.add('editNote', (note, newValue, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.contains('.list-group-item', note).click()
  cy.wait('@getNote')

  cy.get('#content')
    .clear()
    .type(newValue)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', note).should('not.exist')
  cy.contains('.list-group-item', newValue).should('be.visible')
})

Cypress.Commands.add('deleteNote', note => {
  cy.contains('.list-group-item', note).click()
  cy.contains('button', 'Delete').click()

  cy.contains('.list-group-item', note).should('not.exist')
})

// cypress/support/commands.js

// Outros comandos aqui ...

Cypress.Commands.add('fillSettingsFormAndSubmit', () => {
  cy.visit('/settings')
  cy.get('#storage').type('1')
  cy.get('#name').type('Daniel Alves')
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})
