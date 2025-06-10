import React, { useEffect, useState } from 'react';

import { ProductProjection } from '@commercetools/platform-sdk';

import styles from './ProductPage.module.css';
import Slider from '../../components/Slider/Slider';
import { getProduct } from '../../api/api';
import { useParams } from 'react-router';
import useAccessToken from '../../hooks/useAccessToken';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<ProductProjection>();
  const { productId } = useParams<{ productId: string }>();
  const { token } = useAccessToken();

  useEffect(() => {
    const getProd = async () => {
      try {
        if (!productId) return;
        if (!token) return;
        const res = await getProduct(token, productId);

        setProduct(res);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    getProd();
  }, [token]);

  const language = 'en-GB' as string;

  const name = product?.name[language];
  const description = product?.description?.[language];

  const images = product?.masterVariant.images || [];
  const price = product?.masterVariant.prices![0].value.centAmount as number;
  const salePrice = product?.masterVariant.prices![0].discounted?.value.centAmount as number;

  const currentPrice = (price / 100).toFixed(2);
  const salePriceOutput = salePrice ? ((salePrice || +currentPrice) / 100)?.toFixed(2) : null;

  return (
    <>
      <main className={styles.main}>
        <section className={styles.product}>
          <div className={`${styles.container} ${styles.grid}`}>
            <div className={styles.product__left}>
              <Slider images={images} />
            </div>
            <div className={styles.product__right}>
              <div className={styles.product__info_top}>
                <h1 className={styles.product__name}>{name}</h1>

                <div className={styles.product__price}>
                  <div className={styles.product__price_current}>
                    {salePriceOutput ? `${salePriceOutput} $` : ''}
                  </div>

                  <div
                    className={`${salePriceOutput ? styles.product__price_old : styles.product__price_current}`}
                  >
                    {currentPrice ? `${currentPrice} $` : ''}
                  </div>
                </div>

                <p className={styles.product__descr}>{description}</p>
              </div>

              <div className={styles.product__info_card}>
                <button className={styles.button}>Add To Shopping Cart</button>
              </div>
            </div>
          </div>
        </section>
        <ScrollToTopButton />
      </main>
    </>
  );
};

export default ProductPage;
