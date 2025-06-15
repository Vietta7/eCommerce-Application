import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product/product';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../hooks/useCart';

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

  const { addToCart, items, removeProductFromCart } = useCart();

  const [isInCart, setIsInCart] = useState(false);
  const [lineItem, setLineItem] = useState('');

  useEffect(() => {
    const storedCart = items;
    if (storedCart.length === 0) {
      setLineItem('');
    } else {
      const itemId = items.filter((item) => item.productId === product.id)[0];
      if (itemId) setLineItem(itemId.lineItemId);
    }
    setIsInCart(storedCart.some((item) => item.productId === product.id));
  }, [product.id, items]);

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];

    if (isInCart) {
      const updatedCart = storedCart.filter((item) => item.id !== product.id);
      setIsInCart(!!updatedCart);
    } else {
      const updatedCart = [...storedCart, product];
      setIsInCart(!!updatedCart);
    }
  };
  const onAddProductToCart = async (productId: string, variantId: number) => {
    try {
      await addToCart({ productId, variantId, quantity: 1 });
    } catch (error) {
      console.error(error);
      toast.error('Error. Product do not add to cart');
      throw error;
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

          {isInCart ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                removeProductFromCart(lineItem);
              }}
              className={isInCart ? styles.check_button : styles.plus_button}
            >
              ✓
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddProductToCart(product.id, 1);
                handleToggleCart(e);
              }}
              className={isInCart ? styles.check_button : styles.plus_button}
              title={isInCart ? 'Remove from cart' : 'Add to cart'}
            >
              <span className={styles.plus_icon}></span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
