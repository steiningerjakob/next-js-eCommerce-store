describe('Can navigate around checkout flow', () => {
  it('can visit all pages and load all page content', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-list-single-product-link"]').first().click();
    cy.get('[data-cy="single-product-shopping-cart-link"]').should(
      'be.visible',
    );
    cy.get('[data-cy="single-product-shopping-cart-link"]').click();
    cy.get('[data-cy="shopping-cart-checkout-link"]').should('be.visible');
    cy.get('[data-cy="shopping-cart-checkout-link"]').click();
    cy.get('[data-cy="checkout-form-firstName"]')
      .click({ force: true })
      .type('Jane');
    cy.get('[data-cy="checkout-form-lastName"]')
      .click({ force: true })
      .type('Doe');
    cy.get('[data-cy="checkout-form-emailAddress"]')
      .click({ force: true })
      .type('jane@doe.com');
    cy.get('[data-cy="checkout-form-phoneNumber"]')
      .click({ force: true })
      .type('06761234567');
    cy.get('[data-cy="checkout-form-address"]')
      .click({ force: true })
      .type('Sappho Street 1');
    cy.get('[data-cy="checkout-form-postalCode"]')
      .click({ force: true })
      .type('1090');
    cy.get('[data-cy="checkout-form-city"]')
      .click({ force: true })
      .type('Vienna');
    cy.get('[data-cy="checkout-form-country"]')
      .click({ force: true })
      .type('Austria');
    cy.get('[data-cy="checkout-form-creditCardNumber"]')
      .click({ force: true })
      .type('1111 2222 3333 4444');
    cy.get('[data-cy="checkout-form-expiration"]')
      .click({ force: true })
      .type('11/25');
    cy.get('[data-cy="checkout-form-nameOnCard"]')
      .click({ force: true })
      .type('Jane Doe');
    cy.get('[data-cy="checkout-form-cvv"]').click({ force: true }).type('123');
    cy.get('[data-cy="checkout-form-submit-button"]').click({ force: true });
    cy.get('[data-cy="checkout-place-order-element"]').should('be.visible');
    cy.get('[data-cy="checkout-place-order-link"]').click();
    cy.get('[data-cy="success-page-message-container"]').should('be.visible');
  });
});
