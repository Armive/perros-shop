import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopify = createStorefrontApiClient({
  storeDomain: `https://${process.env.SHOPIFY_STORE_DOMAIN}`,
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION!,
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN!,
});
