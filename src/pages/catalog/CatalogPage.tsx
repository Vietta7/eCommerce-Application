import React, { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import useAccessToken from '../../hooks/useAccessToken';
import { Product } from '../../types/product/product';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, loading: tokenLoading, error: tokenError } = useAccessToken();
  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      try {
        const projectKey = 'dino-land';
        const response = await fetch(
          `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(errorData);
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to load products. Try again later.');
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (tokenLoading) return <div>Загрузка токена доступа...</div>;
  if (tokenError) return <div>Ошибка: {tokenError}</div>;
  if (error) return <div>Ошибка загрузки каталога: {error}</div>;
  if (isProductsLoading) return <div>Загрузка списка продуктов...</div>;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default CatalogPage;
