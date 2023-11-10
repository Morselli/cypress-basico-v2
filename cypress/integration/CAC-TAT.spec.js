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
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius-morselli.mail.com')
    cy.get('#open-text-area').type('Lorem ipsum')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Morselli')
    cy.get('#email').type('vinicius-morselli@mail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pharetra ex quis dapibus accumsan. Maecenas elementum vitae ante at pulvinar. Maecenas faucibus, nisi et interdum volutpat, ipsum massa tempus leo, eget ultricies neque lectus vel ante.', {
      delay: 0
    })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Vinicius')
      .should('have.value', 'Vinicius')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Morselli')
      .should('have.value', 'Morselli')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('vinicius-morselli@mail.com')
      .should('have.value', 'vinicius-morselli@mail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})