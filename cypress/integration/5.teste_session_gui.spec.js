describe('Login & CRUD de uma nota', () => {
  beforeEach(() => {

    cy.intercept('GET', '**/notes').as('getNotes')
    cy.intercept('GET', '**/notes/**').as('getNote')
    cy.loginGui()
    cy.visit('/')

  })

})

it('fazer login', () => {


  cy.loginGui()
  cy.wait(3000)

})


it('Criar, editar, excluir uma nota', () => {
  const faker = require('faker')
  const noteDescription = faker.lorem.words(2)

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.loginGui()
  cy.visit('/notes/new')


  cy.get('#content').type(noteDescription)
  cy.contains('button', 'Create').click()
  //cy.wait(1000)

  cy.wait('@getNotes')
  cy.contains('h1','Your Notes').should('be.visible')
  cy.contains('.list-group-item', noteDescription)
    .should('be.visible')
    .click()

  const updateNoteDescription = faker.lorem.words(2)

  //cy.wait('@getNote')
  cy.get('#content')
    .clear()
    .type(updateNoteDescription)
  cy.contains('button', 'Save').click()
  //cy.wait(1000)

  cy.wait('@getNotes')
  cy.contains('h1','Your Notes').should('be.visible')
  cy.contains('.list-group-item', noteDescription).should('not.exist')
  cy.contains('.list-group-item', updateNoteDescription)
    .should('be.visible')
    .click()

  cy.wait('@getNote')
  cy.contains('#content', updateNoteDescription).should('be.visible')

  //cy.wait(2000)

  cy.contains('button', 'Delete').click()
  //cy.wait(1000)

  cy.wait('@getNotes')
  cy.contains('h1','Your Notes').should('be.visible')
  cy.contains('.list-group-item', updateNoteDescription).should('not.exist')


})


it('Inserir Cartão Créd.', (  ) => {


  cy.intercept('POST', '**/prod/billing').as('paymentRequest')

  // para acessar com a mesma sessão
  cy.loginGui()

  // para acessar fazendo um novo login
  /*  cy.loginGui(
    Cypress.env('login_MAIL'),
    Cypress.env('login_PASSWORD'),
    {cacheSession: false}
    )    */

  cy.visit('/settings')

  cy.get('#storage').type('1')
  cy.get('#name').type('Daniel Alves')

  cy.iframe('[title="Quadro seguro de entrada do pagamento com cartão"]')
    .as('iframe')
    .find('[name=cardnumber]')
    .type('5453 9167 9483 3689')

  cy.get('@iframe')
    .find('[name=exp-date]')
    .type('1023')

  cy.get('@iframe')
    .find('[name=cvc]')
    .type('866')

  cy.get('@iframe')
    .find('[name=postal]')
    .type('12345')

  cy.contains('button', 'Purchase').click()
  cy.wait(1000)

  cy.wait('@paymentRequest') .then(response => {
    expect(response.state).to.equal('Complete')

  })
})


it('Logout', () => {
  cy.loginGui()


  cy.visit('/')
  cy.wait(500)

  cy.contains('.navbar-right [href="#"]', 'Logout').click()

  cy.get('#email').should('be.visible')
})
