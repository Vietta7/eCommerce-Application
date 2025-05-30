import React from 'react';
import { Product } from '../../types/product/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  className?: string;
  highlightText?: (text: string) => React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, highlightText }) => {
  const name = product.masterData.current.name['en-GB'];
  const description = product.masterData.current.description['en-GB'];
  const image = product.masterData.current.masterVariant.images[0]?.url || '/placeholder.png';
  const priceData = product.masterData.current.masterVariant.prices[0];
  const originalPrice = priceData?.value.centAmount / 100 || 0;
  const discountedValue = priceData?.discounted?.value;
  const discountedPrice = discountedValue ? discountedValue.centAmount / 100 : undefined;
  const hasDiscount = !!discountedPrice;

  return (
    <div className={`${styles.product_card} ${className || ''}`}>
      <div className={styles.image_container}>
        <img src={image} alt={name} className={styles.image} />
        {hasDiscount && <div className={styles.discount_badge}>-15%</div>}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{highlightText ? highlightText(name) : name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.price_container}>
          <div className={styles.price_wrapper}>
            {hasDiscount ? (
              <>
                <span className={styles.original_price}>${originalPrice.toFixed(2)}</span>
                <span className={styles.discounted_price}>
                  ${discountedPrice?.toFixed(2) ?? originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className={styles.price}>${originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className={styles.plus_button}>
            <span className={styles.plus_icon}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
