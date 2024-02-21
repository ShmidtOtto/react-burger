/// <reference types="cypress" />
import '@4tw/cypress-drag-drop'

// @ts-ignore
Cypress.Commands.add('login', (email: string, password: string) => {  
    cy.get('[data-test-id=email-input]').type(email)
  
    cy.get('[data-test-id=password-input]').type(`${password}{enter}`, { log: false })
  
    cy.getAllLocalStorage().should('exist')
});

// @ts-ignore
Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test-id=${selector}]`, ...args)
});