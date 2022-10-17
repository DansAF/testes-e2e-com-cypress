describe('Scenarios where authentication is a pre-requirement', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/notes').as('getNotes')
        cy.loginUser()
      })
      
      it('logs out', () => {
        cy.visit('/')
        cy.wait('@getNotes')
        /* ==== Generated with Cypress Studio ==== */
        if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
          cy.get('.navbar-toggle.collapsed')
            .should('be.visible')
            .click()
        }
        cy.get('.nav > :nth-child(2) > a').click()
        cy.get('#email').click()
        cy.get('#email').should('be.visible')
        cy.get('#password').click()
        cy.get('#password').should('be.visible')
        /* ==== End Cypress Studio ==== */
      })

    })