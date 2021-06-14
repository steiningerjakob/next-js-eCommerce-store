// ToDos:
// 1) Stretch: add user authentication functionality (Clerk vs. self-built)
// 2) "Breadcrumb" functionality to see where you are on the page flow

import { css } from '@emotion/react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaShoppingBag, FaUserCircle } from 'react-icons/fa';
import SearchField from './SearchField';

const headerStyles = css`
  display: flex;
  padding: 16px 40px;
  background-color: #153243;
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
    font-size: 1.1rem;
    color: lightgrey;
    margin-right: 48px;
    :hover {
      color: white;
    }
  }

  div + div {
    margin-left: auto;
  }
`;

const searchBarContainer = css`
  display: flex;
  align-items: center;
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a data-cy="header-home-link">Home</a>
      </Link>
      <div css={searchBarContainer}>
        <Link href="/products">
          <a data-cy="header-all-products-link">All Books</a>
        </Link>
      </div>
      <div>
        <SearchField />
      </div>
      <div>
        <div>
          <Link href="/login">
            <a data-cy="header-user-login-link">
              <IconContext.Provider
                value={{ size: '1.5em', title: 'user login icon' }}
              >
                <div>
                  <FaUserCircle />
                </div>
              </IconContext.Provider>
            </a>
          </Link>
        </div>

        <div>
          <Link href="/shoppingcart">
            <a data-cy="header-shopping-cart-link">
              <IconContext.Provider
                value={{ size: '1.5em', titl: 'shopping bag icon' }}
              >
                <div>
                  <FaShoppingBag />
                </div>
              </IconContext.Provider>
              (
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
