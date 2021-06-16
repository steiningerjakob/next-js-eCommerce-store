import { css } from '@emotion/react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaShoppingBag } from 'react-icons/fa';
import SearchField from './SearchField';

const headerStyles = css`
  display: flex;
  padding: 8px 40px;
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
    margin-left: 16px;
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

const leftNavBarContainer = css`
  display: flex;
  align-items: center;
  margin-right: -48px;
`;

const logoStyles = css`
  width: 128px;
  margin-right: -12px;
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <div css={leftNavBarContainer}>
        <Link href="/">
          <a data-cy="header-home-link">
            <img src="cover.png" alt="" css={logoStyles} />
          </a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/products">
          <a data-cy="header-all-products-link">All Books</a>
        </Link>
      </div>
      <div>
        <SearchField />
      </div>
      <div>
        <Link href="/shoppingcart">
          <a data-cy="header-shopping-cart-link">
            <IconContext.Provider
              value={{
                title: 'trash icon',
              }}
            >
              <FaShoppingBag size="1.5em" />
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
    </header>
  );
}
