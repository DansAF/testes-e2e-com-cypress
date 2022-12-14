describe('Scenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.loginUser()
  })

  it('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes')
  })

  // it.only, para executar apenas o cenário a
  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes')
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })

  it('logs out', () => {
    cy.visit('/')
    cy.wait('@getNotes')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.nav > :nth-child(2) > a').click()
    cy.get('#email').click()
    cy.get('#email').should('be.visible')
    cy.get('#password').click()
    cy.get('#password').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })


})

