export const PRODUCTS_QUERY = `
  query Products {
    products(first: 200) {
      edges {
        node {
          id
          title
          handle
          collections(first: 20) {
            edges {
              node {
                id
                title
                handle 
              }
            }
          }
          featuredImage {
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
