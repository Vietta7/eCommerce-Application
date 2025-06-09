import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product/product';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
  highlightText?: (text: string) => React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, highlightText }) => {
  const name = product?.name?.['en-GB'] ?? 'Unnamed';
  const description = product?.description?.['en-GB'] ?? '';
  const image = product?.masterVariant?.images?.[0]?.url || '/placeholder.png';
  const priceData = product?.masterVariant?.prices?.[0];
  const originalPrice = priceData?.value?.centAmount ? priceData.value.centAmount / 100 : 0;
  const discountedValue = priceData?.discounted?.value;
  const discountedPrice = discountedValue ? discountedValue.centAmount / 100 : undefined;
  const hasDiscount = !!discountedPrice;

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(storedCart.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];

    if (isInCart) {
      const updatedCart = storedCart.filter((item) => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // TODO: временное решение localStorage (заменить ):
      setIsInCart(false);
      toast.success('Product deleted from cart');
    } else {
      const updatedCart = [...storedCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // TODO: временное решение localStorage (заменить):
      setIsInCart(true);
      toast.success('Product added to cart');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className={`${styles.product_card} ${className || ''}`}>
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
          <button
            className={isInCart ? styles.check_button : styles.plus_button}
            onClick={handleToggleCart}
            title={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            {isInCart ? '✓' : <span className={styles.plus_icon}></span>}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
