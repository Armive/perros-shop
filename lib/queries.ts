export const PRODUCTS_QUERY = `
  query Products {
    products(first: 12) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
            width
            height
          }
          selectedOrFirstAvailableVariant {
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query Collections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;
