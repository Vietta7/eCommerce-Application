import { getProductName } from '../../utils/product';

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
  key: string;
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

export const SORT_OPTIONS: SortOption[] = [
  {
    value: 'name-asc',
    label: 'Name (A-Z)',
    sortFn: (a, b) => {
      const nameA = getProductName(a) || '';
      const nameB = getProductName(b) || '';
      return nameA.localeCompare(nameB);
    },
  },
  {
    value: 'name-desc',
    label: 'Name (Z-A)',
    sortFn: (a, b) => {
      const nameA = getProductName(a) || '';
      const nameB = getProductName(b) || '';
      return nameB.localeCompare(nameA);
    },
  },
  {
    value: 'price-asc',
    label: 'Price (Low to High)',
    sortFn: (a, b) => {
      const priceA = a.masterData.current.masterVariant.prices?.[0]?.value?.centAmount || 0;
      const priceB = b.masterData.current.masterVariant.prices?.[0]?.value?.centAmount || 0;
      return priceA - priceB;
    },
  },
  {
    value: 'price-desc',
    label: 'Price (High to Low)',
    sortFn: (a, b) => {
      const priceA = a.masterData.current.masterVariant.prices?.[0]?.value?.centAmount || 0;
      const priceB = b.masterData.current.masterVariant.prices?.[0]?.value?.centAmount || 0;
      return priceB - priceA;
    },
  },
];
