import {
  getShoppingCartQuantity,
  getShoppingCartSum,
} from '../shoppingCartFunctions';

// 2a. Test function for adding up shopping cart quantity
test('getShoppingCartQuantity returns correct value', () => {
  const testArray = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
    { id: 3, quantity: 3 },
  ];
  expect(getShoppingCartQuantity(testArray)).toBe('6');
});

// 2b. Test function for adding up shopping cart sum
test('getShoppingCartSum returns correct value', () => {
  const testArray = [
    { id: 1, usedPrice: 1, quantity: 1 },
    { id: 2, usedPrice: 2, quantity: 2 },
    { id: 3, usedPrice: 3, quantity: 3 },
  ];
  expect(getShoppingCartSum(testArray)).toBe('14.00');
});
