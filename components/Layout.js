import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const containerStyles = css`
  margin: 0 15px;
`;

export default function Layout(props) {
  return (
    <>
      {/* pass props here */}
      <Header
        shoppingCart={props.shoppingCart}
        setShoppingCart={props.setShoppingCart}
      />
      <div css={containerStyles}>{props.children}</div>
      <Footer />
    </>
  );
}
