describe('Shelf Life E2E Testing', () => {
  it('allows navigation between pages', () => {
    cy.visit('http://localhost:5173')
    
    cy.contains('Shelf Life').should('be.visible')
    
    cy.contains('button', 'Dashboard').click()
    cy.contains('Please sign in').should('be.visible')
    
    cy.contains('button', 'Home').click()
    cy.contains('Shelf Life').should('be.visible')
    cy.get('#root button:nth-child(2)').click();
    cy.get('#root button:nth-child(3)').click();
    cy.get('#root button:nth-child(4)').click();
    cy.get('#root button:nth-child(5)').click();
    cy.get('#root button:nth-child(1)').click();
  })
})