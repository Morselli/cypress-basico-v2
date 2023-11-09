/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  this.beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius-morselli@mail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra ex quis dapibus accumsan. Maecenas elementum vitae ante at pulvinar. Maecenas faucibus, nisi et interdum volutpat, ipsum massa tempus leo, eget ultricies neque lectus vel ante.', {
      delay: 0
    })
    cy.get('.button').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius-morselli.mail.com')
    cy.get('#open-text-area').type('Lorem ipsum')
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius-morselli@mail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra ex quis dapibus accumsan. Maecenas elementum vitae ante at pulvinar. Maecenas faucibus, nisi et interdum volutpat, ipsum massa tempus leo, eget ultricies neque lectus vel ante.', {
      delay: 0
    })
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })
})