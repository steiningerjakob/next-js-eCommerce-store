import cookies from 'js-cookie';

export type ShoppingCart = {
  id: number;
  quantity: number;
}[];

export function getShoppingCartCookieValue(): ShoppingCart {
  const cookieValue = cookies.getJSON('shoppingcart');
  return Array.isArray(cookieValue) ? cookieValue : [];
}

export function addBookByBookId(bookId: number) {
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

export function subtractBookByBookId(bookId: number) {
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

export function removeBookFromShoppingCart(bookId: number) {
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
  const newCookieValue: ShoppingCart = [];
  cookies.set('shoppingcart', newCookieValue);
  return newCookieValue;
}

export function parseCookieValue(value: string, defaultValue: any) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return defaultValue;
  }
}
