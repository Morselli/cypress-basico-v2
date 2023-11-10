Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius@exemplo.com')
    cy.get('#open-text-area').type('Teste automatizado')

    cy.contains('button', 'Enviar').click()
})