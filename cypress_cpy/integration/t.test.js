describe('그냥.. 테스트', () => {
  it('test', () => {
    cy.visit('/')
    cy.get('header h1 span')
      .contains('OMDb API')
  })
})