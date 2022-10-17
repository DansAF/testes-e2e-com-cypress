// cypress/integration/signup.spec.js

it('Processo de signup com verigficaçãod e código', () => {
  const faker = require('faker')
  const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')
  const texto = faker.lorem.words(2)
  const texto2 = faker.lorem.words(78)

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/signup')
  cy.get('#email').type(emailAddress, { log: false })
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes')
    cy.contains('h1', 'Your Notes').should('be.visible')

    cy.contains('Create a new note').click()
    cy.get('#content').type(texto)


    cy.contains('button', 'Create').click()


    cy.contains('Create a new note').click()
    cy.get('#content').type(texto2)


    cy.contains('button', 'Create').click()


    cy.wait('@getNotes')
    cy.contains('h1', 'Your Notes').should('be.visible')

    cy.contains('a', 'Logout').click()


  })
})