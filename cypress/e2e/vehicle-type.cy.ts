describe('vehicle form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('check the default type', () => {
    cy.get('[data-automationid="vehicle-type"]').should('have.value', 'Auto');
  })
})