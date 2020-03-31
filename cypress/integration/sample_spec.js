describe('Testing the hero list page', function() {

  it('should contain the word WINNR-FEED', function() {
    cy.visit('http://localhost:4200');
    cy.contains("WINNR-FEED");
  })

});
