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
  discounted?: {
    value: {
      currencyCode: string;
      centAmount: number;
    };
  };
}

export interface ProductAttribute {
  name: string;
  value: string | number | Record<string, unknown>;
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
  key?: string;
  typeId: string;
  id: string;
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
  name: Record<string, string>;
  description?: Record<string, string>;
  slug: Record<string, string>;
  categories: ProductCategory[];
  masterVariant: ProductVariant;
  variants?: ProductVariant[];
  published: boolean;
}
export interface ProductMasterDataCurrent {
  name: Record<string, string>;
  description: Record<string, string>;
  slug: Record<string, string>;
  masterVariant: ProductVariant;
  categories: ProductCategory[];
}

export type FilterValues = {
  size: string[];
  color: string[];
  price: string[];
};

export type Category = {
  id: string;
  key: string;
  name: { [locale: string]: string };
  parent?: { id: string };
};

export type SortOption = {
  value: string;
  label: string;
  sortFn: (a: Product, b: Product) => number;
};

export const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name.en-GB asc' },
  { label: 'Name (Z-A)', value: 'name.en-GB desc' },
  { label: 'Price (Low to High)', value: 'price asc' },
  { label: 'Price (High to Low)', value: 'price desc' },
];
