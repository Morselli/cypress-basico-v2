it('testa a página da política de privacidade de forma independente', function() {
  cy.visit('./src/privacy.html')

  cy.get('.privacy').should('be.visible')
})