import { css } from '@emotion/react';

// visually hidden, but screen-reader accessible

const labelStyles = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const searchFieldStyles = css`
  height: 40px;
  width: 560px;
  padding: 8px 8px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  background-color: white;
  text-align: left;
`;

export default function SearchField() {
  return (
    <div>
      <form action="/products/" method="get">
        <label htmlFor="searchField" css={labelStyles}>
          <span className="visually-hidden">Search books</span>
        </label>
        <div>
          <input
            type="text"
            id="searchField"
            placeholder="Search our library..."
            name="s"
            css={searchFieldStyles}
          />
          <button type="submit" css={labelStyles}>
            Search books
          </button>
        </div>
      </form>
    </div>
  );
}
