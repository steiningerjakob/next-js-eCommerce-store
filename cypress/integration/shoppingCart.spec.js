describe('Can add to cart, change quantity and remove from cart', () => {
  it('can visit all pages and load all page content', () => {
    cy.visit('/products');
    cy.get('[data-cy="product-list-single-product-link"]').first().click();
    cy.get('[data-cy="single-product-shopping-cart-link"]').should(
      'be.visible',
    );
    cy.get('[data-cy="single-product-shopping-cart-link"]').click();
    cy.get('[data-cy="shopping-cart-item-quantity-counter"]').should(
      'have.text',
      1,
    );
    cy.get('[data-cy="shopping-cart-item-quantity-add"]').click();
    cy.get('[data-cy="shopping-cart-item-quantity-counter"]').should(
      'have.text',
      2,
    );
    cy.get('[data-cy="shopping-cart-item-quantity-subtract"]').click();
    cy.get('[data-cy="shopping-cart-item-quantity-counter"]').should(
      'have.text',
      1,
    );
    cy.get('[data-cy="shopping-cart-item-quantity-remove"]').click();
    cy.get('[data-cy="header-shopping-cart-link"]').should('contain.text', 0);
  });
});
