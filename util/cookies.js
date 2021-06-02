import cookies from 'js-cookie';

export function getShoppingCartCookieValue() {
  const cookieValue = cookies.getJSON('shoppingcart');
  return Array.isArray(cookieValue) ? cookieValue : [];
}

export function addBookByBookId(bookId) {
  const newCookieValue = [...getShoppingCartCookieValue()];
  const bookBookIdInCookie = newCookieValue.find((b) => b.id === bookId);

  if (bookBookIdInCookie) {
    bookBookIdInCookie.quantity = bookBookIdInCookie.quantity + 1;
  } else {
    newCookieValue.push({
      id: bookId,
      quantity: 1,
    });
  }
  cookies.set('shoppingcart', newCookieValue);
  return newCookieValue;
}

export function subtractBookByBookId(bookId) {
  const minValue = 0;
  const newCookieValue = [...getShoppingCartCookieValue()];
  const bookBookIdInCookie = newCookieValue.find((b) => b.id === bookId);

  if (bookBookIdInCookie) {
    if (bookBookIdInCookie.quantity === minValue) {
      return bookBookIdInCookie.quantity;
    } else {
      bookBookIdInCookie.quantity = bookBookIdInCookie.quantity - 1;
    }
  } else {
    newCookieValue.push({
      id: bookId,
      quantity: 0,
    });
  }
  cookies.set('shoppingcart', newCookieValue);
  return newCookieValue;
}

export function removeBookFromShoppingCart(bookId) {
  const newCookieValue = [...getShoppingCartCookieValue()];
  const bookBookIdInCookie = newCookieValue.find((b) => b.id === bookId);
  const removeId = newCookieValue.findIndex((b) => b.id === bookId);

  if (bookBookIdInCookie) {
    newCookieValue.splice(removeId, 1);
  } else {
    return newCookieValue;
  }
  cookies.set('shoppingcart', newCookieValue);
  return newCookieValue;
}

export function clearShoppingCart() {
  const newCookieValue = [...getShoppingCartCookieValue()];
  newCookieValue.length = 0;
  cookies.set('shoppingcart', newCookieValue);
  return newCookieValue;
}

export function parseCookieValue(value, defaultValue) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
}
