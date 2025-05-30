import React, { useEffect, useState, useMemo } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Filters from '../../components/Filters/Filters';
import useAccessToken from '../../hooks/useAccessToken';
import { Product } from '../../types/product/product';
import { FilterValues } from '../../types/filter/filter';
import styles from './CatalogPage.module.css';
import { SearchIcon, ClearIcon } from '../../components/Icons/BackIcons';

type SortOption = {
  value: string;
  label: string;
  sortFn: (a: Product, b: Product) => number;
};

type Category = {
  id: string;
  key: string;
  name: { [locale: string]: string };
  parent?: { id: string };
};

const getProductName = (product: Product): string => {
  const nameObj = product.masterData.current.name as { [key: string]: string } | undefined;
  if (nameObj?.en) {
    return nameObj.en;
  }

  const nameAttribute = product.masterData.current.masterVariant.attributes?.find(
    (attr) => attr.name === 'Name' || attr.name === 'name',
  );

  if (nameAttribute) {
    if (typeof nameAttribute.value === 'string') {
      return nameAttribute.value;
    }
    if (typeof nameAttribute.value === 'object' && nameAttribute.value !== null) {
      const valueObj = nameAttribute.value as { [key: string]: string };
      if (valueObj.en) {
        return valueObj.en;
      }
    }
  }

  const slugObj = product.masterData.current.slug as { [key: string]: string } | undefined;
  if (slugObj?.en) {
    return slugObj.en
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return product.id;
};

const SORT_OPTIONS: SortOption[] = [
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

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, loading: tokenLoading, error: tokenError } = useAccessToken();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

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

  const [sortOption, setSortOption] = useState<string>(SORT_OPTIONS[0].value);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) return;

      try {
        setIsCategoriesLoading(true);
        const projectKey = 'dino-land';
        const url = `https://api.europe-west1.gcp.commercetools.com/${projectKey}/categories`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const allCats = data.results || [];
        setAllCategories(allCats);

        const mainCategories = data.results.filter((cat: Category) => !cat.parent);

        setCategories([{ id: 'all', key: 'all', name: { en: 'All' } }, ...mainCategories]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load categories.');
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      try {
        setIsProductsLoading(true);
        setError(null);

        const projectKey = 'dino-land';
        const where = buildWhereClause(activeCategory, activeSubcategory);
        const params = new URLSearchParams();
        if (debouncedSearchQuery.trim()) {
          params.append('text.en', debouncedSearchQuery.trim());
        }
        if (where) {
          params.append('where', where);
        }

        const url = `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products?${params.toString()}`;

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
  }, [token, activeFilters, debouncedSearchQuery, activeCategory, activeSubcategory]);

  const buildWhereClause = (categoryId: string, subcategoryId: string): string | undefined => {
    const conditions: string[] = [];

    if (subcategoryId && subcategoryId !== 'all') {
      conditions.push(`masterData(current(categories(id="${subcategoryId}")))`);
    } else if (categoryId && categoryId !== 'all') {
      conditions.push(`masterData(current(categories(id="${categoryId}")))`);
    }

    if (activeFilters.size.length > 0) {
      const sizeConditions = activeFilters.size.map(
        (size) =>
          `masterData(current(masterVariant(attributes(name="size" and value="${size.toLowerCase()}"))))`,
      );
      conditions.push(`(${sizeConditions.join(' or ')})`);
    }

    if (activeFilters.color.length > 0) {
      const colorConditions = activeFilters.color.map(
        (color) =>
          `masterData(current(masterVariant(attributes(name="color" and value="${color.toLowerCase()}"))))`,
      );
      conditions.push(`(${colorConditions.join(' or ')})`);
    }

    if (activeFilters.price.length > 0) {
      const priceConditions = activeFilters.price.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return `masterData(current(masterVariant(prices(value(centAmount >= ${
          min * 100
        } and centAmount <= ${max * 100})))))`;
      });
      conditions.push(`(${priceConditions.join(' or ')})`);
    }

    return conditions.length > 0 ? conditions.join(' and ') : undefined;
  };

  const getSubcategoriesForActiveCategory = useMemo(() => {
    if (activeCategory === 'all') return [];
    return allCategories.filter((cat: Category) => cat.parent && cat.parent.id === activeCategory);
  }, [activeCategory, allCategories]);

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const formatFilterValue = (value: string): string => {
    if (value === '120-150') return '$120 – $150';
    if (value === '200-240') return '$200 – $240';
    if (value === '310-430') return '$310 – $430';

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const getCurrentSortLabel = (): string => {
    const option = SORT_OPTIONS.find((opt) => opt.value === sortOption);
    return option ? option.label : 'Sort by';
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (activeFilters.size.length > 0) {
      result = result.filter((product) =>
        activeFilters.size.some((size) =>
          product.masterData.current.masterVariant.attributes?.some(
            (attr) => attr.name === 'size' && attr.value === size.toLowerCase(),
          ),
        ),
      );
    }

    if (activeFilters.color.length > 0) {
      result = result.filter((product) =>
        activeFilters.color.some((color) =>
          product.masterData.current.masterVariant.attributes?.some(
            (attr) => attr.name === 'color' && attr.value === color.toLowerCase(),
          ),
        ),
      );
    }

    if (activeFilters.price.length > 0) {
      result = result.filter((product) => {
        const price = product.masterData.current.masterVariant.prices?.[0]?.value?.centAmount || 0;
        return activeFilters.price.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return price >= min * 100 && price <= max * 100;
        });
      });
    }

    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.trim().toLowerCase();
      const matched = result.filter((product) => {
        const name = getProductName(product).toLowerCase();
        return name.includes(query);
      });

      const exactMatch = matched.find((product) => getProductName(product).toLowerCase() === query);
      if (exactMatch) {
        return [exactMatch];
      }

      result = matched;
    }

    const selectedSort = SORT_OPTIONS.find((option) => option.value === sortOption);
    if (selectedSort) {
      result.sort(selectedSort.sortFn);
    }

    return result;
  }, [products, activeFilters, sortOption, debouncedSearchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  const isLoading = tokenLoading || isCategoriesLoading || isProductsLoading;
  if (isLoading) return <div>Loading...</div>;
  if (tokenError) return <div>Error: {tokenError}</div>;
  if (error) return <div>Catalog loading error: {error}</div>;
  if (!categories.length) return <div>No categories found</div>;

  return (
    <div className={styles.catalog_page}>
      <Filters
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        selectedFilters={selectedFilters}
      />

      <div className={styles.product_list_container}>
        <div className={styles.search_container}>
          <div className={styles.search_input_wrapper}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search dinosaurs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.search_input}
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className={styles.clear_search_button}>
                <ClearIcon />
              </button>
            )}
          </div>
        </div>

        {debouncedSearchQuery && (
          <div className={styles.search_results_header}>
            <h3>Search results for: &quot;{debouncedSearchQuery}&quot;</h3>
            <p>{filteredAndSortedProducts.length} dinosaurs found</p>
          </div>
        )}

        <div className={styles.sorting_container}>
          <div className={styles.sorting_controls}>
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className={styles.sort_select}
              disabled={isProductsLoading}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.current_sort}>Current sorting: {getCurrentSortLabel()}</div>
        </div>

        <div className={styles.category_tabs}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tab_button} ${activeCategory === category.id ? styles.active_tab : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setActiveSubcategory('all');
              }}
            >
              {category.name.en || category.key}
            </button>
          ))}
        </div>

        {getSubcategoriesForActiveCategory.length > 0 && (
          <div className={styles.subcategory_tabs}>
            {getSubcategoriesForActiveCategory.map((subcategory) => (
              <button
                key={subcategory.id}
                className={`${styles.tab_button} ${activeSubcategory === subcategory.id ? styles.active_tab : ''}`}
                onClick={() => setActiveSubcategory(subcategory.id)}
              >
                {subcategory.name.en || subcategory.key}
              </button>
            ))}
          </div>
        )}

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

        {isProductsLoading ? (
          <div>Loading products...</div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className={styles.no_results}>
            <h3>No dinosaurs found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <ProductList products={filteredAndSortedProducts} searchQuery={debouncedSearchQuery} />
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
