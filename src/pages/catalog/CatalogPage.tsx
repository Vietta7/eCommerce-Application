import React, { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Filters from '../../components/Filters/Filters';
import useAccessToken from '../../hooks/useAccessToken';
import { Product } from '../../types/product/product';
import { FilterValues } from '../../types/filter/filter';
import styles from './CatalogPage.module.css';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, loading: tokenLoading, error: tokenError } = useAccessToken();

  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    size: [],
    color: [],
    price: [],
  });

  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    size: [],
    color: [],
    price: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      try {
        setIsProductsLoading(true);
        setError(null);

        const projectKey = 'dino-land';
        const where = buildWhereClause(activeFilters);
        const url = `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products${where ? `?where=${encodeURIComponent(where)}` : ''}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.results || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products. Try again later.');
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, [token, activeFilters]);

  const buildWhereClause = (filters: FilterValues): string | undefined => {
    const conditions: string[] = [];

    if (filters.size && filters.size.length > 0) {
      const sizeConditions = filters.size.map(
        (size) =>
          `masterData(current(masterVariant(attributes(name="size" and value="${size.toLowerCase()}"))))`,
      );
      conditions.push(`(${sizeConditions.join(' or ')})`);
    }

    if (filters.color && filters.color.length > 0) {
      const colorConditions = filters.color.map(
        (color) =>
          `masterData(current(masterVariant(attributes(name="color" and value="${color.toLowerCase()}"))))`,
      );
      conditions.push(`(${colorConditions.join(' or ')})`);
    }

    if (filters.price && filters.price.length > 0) {
      const priceConditions = filters.price.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return `masterData(current(masterVariant(prices(value(centAmount >= ${
          min * 100
        } and centAmount <= ${max * 100})))))`;
      });
      conditions.push(`(${priceConditions.join(' or ')})`);
    }

    return conditions.length > 0 ? conditions.join(' and ') : undefined;
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    setSelectedFilters(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      size: [],
      color: [],
      price: [],
    };
    setActiveFilters(resetFilters);
    setSelectedFilters(resetFilters);
  };

  const formatFilterValue = (value: string): string => {
    if (value === '120-150') return '$120 – $150';
    if (value === '200-240') return '$200 – $240';
    if (value === '310-430') return '$310 – $430';

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  if (tokenLoading) return <div>Loading access token...</div>;
  if (tokenError) return <div>Error: {tokenError}</div>;
  if (error) return <div>Catalog loading error: {error}</div>;
  if (isProductsLoading) return <div>Loading products...</div>;

  return (
    <div className={styles.catalog_page}>
      <Filters
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        selectedFilters={selectedFilters}
      />

      <div className={styles.product_list_container}>
        {(activeFilters.size.length > 0 ||
          activeFilters.color.length > 0 ||
          activeFilters.price.length > 0) && (
          <div className={styles.active_filters}>
            <h3>Active Filters:</h3>

            {activeFilters.size.map((size) => (
              <span key={`size-${size}`} className={styles.filter_tag}>
                Size: {formatFilterValue(size)}
              </span>
            ))}

            {activeFilters.color.map((color) => (
              <span key={`color-${color}`} className={styles.filter_tag}>
                Color: {formatFilterValue(color)}
              </span>
            ))}

            {activeFilters.price.map((price) => (
              <span key={`price-${price}`} className={styles.filter_tag}>
                Price: {formatFilterValue(price)}
              </span>
            ))}
          </div>
        )}

        <ProductList products={products} />
      </div>
    </div>
  );
};

export default CatalogPage;
