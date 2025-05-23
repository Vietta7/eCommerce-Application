import React from 'react';
import { Product } from '../../types/product/product';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.product_list}>
        {products.map((product) => {
          const name = product.masterData.current.name['en-GB'];
          const description = product.masterData.current.description['en-GB'];
          const image =
            product.masterData.current.masterVariant.images[0]?.url || '/placeholder.png';
          const price =
            product.masterData.current.masterVariant.prices[0]?.value.centAmount / 100 || 0;

          return (
            <div key={product.id} className={styles.product_card}>
              <div className={styles.image_container}>
                <img src={image} alt={name} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.price_container}>
                  <p className={styles.price}>
                    <strong>${price.toFixed(2)}</strong>
                  </p>
                  <button className={styles.plus_button}>
                    <span className={styles.plus_icon}></span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
