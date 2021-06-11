/**
 * @jest-environment jsdom
 */

// The comment above is important!
// Without it, jest won't know about frontend context, e.g. cookies

import {
  addBookByBookId,
  removeBookFromShoppingCart,
  subtractBookByBookId,
} from '../cookies';

// 1a. Test function for adding info to cookie on first call
test('addBookByBookId returns quantity 1 on first call', () => {
  const testId = 1;
  const testQuantityValueAfterFirstCall = [{ id: testId, quantity: 1 }];
  const resultAfterFirstCall = addBookByBookId(testId);
  expect(resultAfterFirstCall).toEqual(testQuantityValueAfterFirstCall);
});

// 1b. Test function for removing info from cookie
test('removeBookFromShoppingCart removes object with key from array', () => {
  const testId = 1;
  const testValueArray = removeBookFromShoppingCart(testId);
  expect(testValueArray.some(({ id }) => id === testId)).toBe(false);
});

// 1c. Test function for increasing quantity in cookie
test('addBookByBookId increases quantity when called more than once', () => {
  const testId = 1;
  const testQuantityValueAfterFirstCall = [{ id: testId, quantity: 1 }];
  const testQuantityValueAfterSecondCall = [{ id: testId, quantity: 2 }];
  const resultAfterFirstCall = addBookByBookId(testId);
  const resultAfterSecondCall = addBookByBookId(testId);
  expect(resultAfterFirstCall).toEqual(testQuantityValueAfterFirstCall);
  expect(resultAfterSecondCall).toEqual(testQuantityValueAfterSecondCall);
});

// 1d. Test function for decreasing quantity in cookie
test('subtractBookByBookId reduces quantity of object with key', () => {
  const testId = 'yy';
  const testQuantityValueAfterFirstCall = { id: testId, quantity: 1 };
  const testQuantityValueAfterSecondCall = { id: testId, quantity: 2 };
  const testQuantityValueAfterThirdCall = { id: testId, quantity: 1 };
  const resultAfterFirstCall = addBookByBookId(testId);
  const resultAfterSecondCall = addBookByBookId(testId);
  const resultAfterThirdCall = subtractBookByBookId(testId);
  console.log(resultAfterThirdCall);
  expect(resultAfterFirstCall).toContainEqual(testQuantityValueAfterFirstCall);
  expect(resultAfterSecondCall).toContainEqual(
    testQuantityValueAfterSecondCall,
  );
  expect(resultAfterThirdCall).toContainEqual(testQuantityValueAfterThirdCall);
});
