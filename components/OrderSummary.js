import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import Link from 'next/link';
import { getShoppingCartSum } from '../util/shoppingCartFunctions';

const shoppingBagSummaryContainer = css`
  display: flex;
  flex-direction: column;
  margin: 24px 0 32px 64px;
`;

const headingStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  margin: 8px 0;
`;

const shoppingBagContainer = css`
  background-color: #f5f5f5;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 8px;
  padding: 16px;
`;

const shoppingBagItemStyles = css`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 8px 0;
  margin-bottom: 4px;
  border-bottom: 1px solid #dcdcdc;
`;

const imageStyles = css`
  max-width: 72px;
`;

const rightItemColumnStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  > div {
    margin-right: 12px;
    margin-bottom: 16px;
  }

  > button {
    margin-top: 4px;
  }
`;

const totalStyles = css`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5em;
  margin-top: 16px;

  div + div {
    margin-right: 12px;
  }
`;

export default function OrderSummary(props) {
  return (
    <div css={shoppingBagSummaryContainer}>
      <div css={shoppingBagContainer}>
        <div css={headingStyles}>Order summary</div>
        {props.productsInShoppingBag.map((b) => (
          <div key={b.id} css={shoppingBagItemStyles}>
            <div>
              <Link href={`/products/${b.id}`}>
                <a>
                  <img src={`/${b.img}`} alt={b.titleShort} css={imageStyles} />
                </a>
              </Link>
            </div>
            <div>
              <div>{b.titleShort}</div>
              <div>by {b.author}</div>
              <div>Quantity: {b.quantity}</div>
            </div>
            <div css={rightItemColumnStyles}>
              <div>
                {b.currency} {(b.usedPrice * b.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
        <div css={totalStyles}>
          <div>Total:</div>
          <div>€ {getShoppingCartSum(props.productsInShoppingBag)}</div>
        </div>
      </div>
    </div>
  );
}
