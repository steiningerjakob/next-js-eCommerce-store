import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  display: flex;
  padding: 16px 32px;
  background-color: #b4b8ab;
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
    text-decoration: none;
    color: black;
    margin-right: 24px;
    :hover {
      color: white;
    }
  }

  div + div {
    margin-left: auto;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <div>
        <Link href="/products">
          <a>All Books</a>
        </Link>
      </div>
      <div>
        <div>
          <Link href="/login">
            <a>User Login</a>
          </Link>
        </div>

        <div>
          <Link href="/shoppingcart">
            <a>Shopping Cart</a>
          </Link>
        </div>
      </div>
    </header>
  );
}
