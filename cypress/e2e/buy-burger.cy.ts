describe('My First Test', () => {
  it('Visits the Kitchen Sink', async () => {
    cy.visit('/');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' });

    cy.getBySel('643d69a5c3f7b9001cfa093c').drag('[data-test-id=top-bun]');
    cy.getBySel('643d69a5c3f7b9001cfa093e').drag('[data-test-id=constructor]');
    cy.getBySel('643d69a5c3f7b9001cfa0947').drag('[data-test-id=constructor]');
    cy.getBySel('submit-order').click();

    cy.login('shmidt_o@inbox.ru', '529440');

    cy.getBySel('submit-order').click();

    cy.wait(16000);
    cy.getBySel('order-number').should("exist");
  })
})