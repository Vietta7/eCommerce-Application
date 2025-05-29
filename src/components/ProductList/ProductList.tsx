import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/product/product';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.product_list}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className={styles.product_card} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
