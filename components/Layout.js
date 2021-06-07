import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const pageContainer = css`
  position: relative;
  min-height: 100vh;
`;

const contentWrap = css`
  margin: 0 15px;
  padding-bottom: 2.5rem;
`;

export default function Layout(props) {
  return (
    <>
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <div css={pageContainer}>
        <div css={contentWrap}>{props.children}</div>
      </div>
      <Footer />
    </>
  );
}
