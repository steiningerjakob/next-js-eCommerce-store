// ToDos:
// 1) replace text links with (react)-icons
// 2) Stretch: add user authentication functionality (Clerk vs. self-built)

import { css } from '@emotion/react';
// import {
//   faSearch,
//   faShoppingBag,
//   faUserCircle,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  padding: 16px 40px;
  background-color: #81b29a;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  > div {
    display: flex;
    align-items: center;
    line-height: 1em;
    margin-left: 24px;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: lightgrey;
    margin-right: 32px;
    :hover {
      color: white;
    }
  }

  div + div {
    margin-left: auto;
  }
`;

// const searchFieldStyles = css`
//   height: 40px;
//   width: 296px;
//   padding: 8px 8px;
//   margin: 0 8px;
//   border-radius: 8px;
//   border: 1px solid #dcdcdc;
//   background-color: white;
//   text-align: left;

//   > span {
//     color: lightgrey;
//   }
// `;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a data-cy="header-home-link">Home</a>
      </Link>
      <div>
        <Link href="/products">
          <a data-cy="header-all-products-link">All Books</a>
        </Link>
      </div>
      {/* <div>
        <input
          id="searchField"
          placeholder="Title, author, ISBN"
          css={searchFieldStyles}
        />
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </div> */}
      <div>
        <div>
          <Link href="/login">
            <a data-cy="header-user-login-link">User Login</a>
          </Link>
        </div>

        <div>
          <Link href="/shoppingcart">
            <a data-cy="header-shopping-cart-link">
              Shopping Bag (
              {props.shoppingCart
                .map((item) => item.quantity)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0,
                )
                .toFixed(0)}
              )
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
