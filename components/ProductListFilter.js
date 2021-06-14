import { css } from '@emotion/react';

const filterContainer = css`
  margin-left: 0;
  padding: 16px 0;
  min-width: 208px;
`;

const ulStyles = css`
  margin: 8px 0;
  padding: 16px 4px;
  font-weight: 600;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
`;

const liStyles = css`
  padding: 6px 0;
  list-style-type: none;
  text-indent: -8px;
  margin-left: 8px;
`;

export default function ProductListFilter(props) {
  // create list of unique genres from products array
  const uniqueGenres = [
    ...new Set(props.products.map((book) => book.genre)),
  ].concat(...['All genres']);
  const uniqueLanguages = [
    ...new Set(props.products.map((book) => book.lang)),
  ].concat(...['All languages']);

  return (
    <div css={filterContainer}>
      <div>
        <ul css={ulStyles}>Filter by Genre</ul>
        {uniqueGenres.map((genre) => (
          <li key={`genre-${genre.id}`} css={liStyles}>
            <input
              type="radio"
              value={genre}
              name="genreFilter"
              onChange={(event) =>
                props.setGenreFilter(event.currentTarget.value)
              }
            />
            {genre}
          </li>
        ))}
        <ul css={ulStyles}>Filter by Language</ul>
        {uniqueLanguages.map((lang) => (
          <li key={`lang-${lang.id}`} css={liStyles}>
            <input
              type="radio"
              value={lang}
              name="languageFilter"
              onChange={(event) =>
                props.setLanguageFilter(event.currentTarget.value)
              }
            />
            {lang}
          </li>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { getAllProducts } = await import('../util/database');

  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
