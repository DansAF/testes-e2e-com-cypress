// cypress/integration/signup.spec.js

it('Processo de signup com verigficaçãod e código', () => {
  const faker = require('faker')
  const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')
  const texto = Cypress.env('text-teste')
  const texto2 = Cypress.env('text-teste2')

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.fillSignupFormAndSubmit(emailAddress, password)

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait(5000)
    cy.wait('@getNotes')
    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.wait(3000)

    cy.contains('Create a new note').click()
    cy.wait(1000)
    cy.get('#content').type(texto)


    cy.contains('button', 'Create').click()

    cy.wait(3000)

    cy.contains('a', 'Logout').click()


  })
})