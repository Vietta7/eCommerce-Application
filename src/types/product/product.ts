export interface ProductImage {
  url: string;
  label?: string;
  dimensions?: {
    w: number;
    h: number;
  };
}

export interface ProductPrice {
  value: {
    currencyCode: string;
    centAmount: number;
  };
}

export interface ProductAttribute {
  name: string;
  value: string | number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
}

export interface ProductCategory {
  typeId: string;
  id: string;
}

export interface ProductMasterDataCurrent {
  name: Record<string, string>;
  description: Record<string, string>;
  slug: Record<string, string>;
  masterVariant: ProductVariant;
  categories: ProductCategory[];
}

export interface Product {
  id: string;
  version: number;
  key: string;
  productType: {
    typeId: string;
    id: string;
  };
  masterData: {
    current: ProductMasterDataCurrent;
  };
  published: boolean;
}
