import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/product/product';
import styles from './ProductList.module.css';
import { LoaderPage } from '../ui/LoaderPage/LoaderPage';

interface ProductListProps {
  products: Product[];
  searchQuery?: string;
  isLoading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, searchQuery = '' }) => {
  const highlightMatch = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? <mark key={i}>{part}</mark> : part,
      );
  };

  return (
    <div className={styles.container}>
      <div className={styles.product_list}>
        {products.map((product) =>
          isLoading ? (
            <LoaderPage key={product.id} />
          ) : (
            <ProductCard
              key={product.id}
              product={product}
              className={styles.product_card}
              highlightText={highlightMatch}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default ProductList;
