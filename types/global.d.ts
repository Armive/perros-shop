declare global {
  interface Product {
    id: string;
    title: string;
    handle: string;
    collections: {
      edges: {
        node: {
          id: string;
          title: string;
          handle: string;
        };
      }[];
    };
    featuredImage: {
      url: string;
      altText: string | null;
      width: number;
      height: number;
    } | null;
    selectedOrFirstAvailableVariant: {
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }
  interface Collection {
    id: string;
    title: string;
    handle: string;
    image:{
      url: string;
      altText: string | null;
      width: number;
      height: number;
    }
  }
}
export {};
