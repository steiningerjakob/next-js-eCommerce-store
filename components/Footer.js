import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  display: flex;
  justify-content: center;
  line-height: 80%;
  padding: 0px 15px;
  background-color: darkgrey;
  color: lightgrey;
  font-size: 80%;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 998;

  > p {
    text-align: center;

    a {
      text-decoration: none;
    }
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <p>
        Copyright © 2021 Jakob Steininger. Created for educational purposes.
        Enabled by{' '}
        <Link href="https://upleveled.io/">
          <a>upleveled</a>
        </Link>
        .
      </p>
    </footer>
  );
}
