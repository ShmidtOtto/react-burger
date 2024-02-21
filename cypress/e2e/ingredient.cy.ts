describe('Ingredients', () => {
    it('Open ingredient modal', () => {
      cy.visit('/');
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' });
  
      cy.getBySel('643d69a5c3f7b9001cfa0941').click();
      cy.getBySel('ingredient-name').should("exist");
    });


    it('Close ingredient modal', () => {
        cy.visit('/');
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: 'ingredients.json' });
    
        cy.getBySel('643d69a5c3f7b9001cfa0941').click();
        cy.getBySel('ingredient-name').should("exist");

        cy.getBySel('modal-close').click();
    })

    it('open ingridient detail in new window', () => {
        cy.visit('ingredients/643d69a5c3f7b9001cfa093e');
        cy.getBySel('ingredient-name').should("exist");
    })
  })