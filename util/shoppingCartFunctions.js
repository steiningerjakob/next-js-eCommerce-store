export function getShoppingCartQuantity(array) {
  return array
    .map((b) => b.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(0);
}

export function getShoppingCartSum(array) {
  return array
    .map((b) => b.usedPrice * b.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(2);
}
