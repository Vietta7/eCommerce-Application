import React, { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Filters from '../../components/Filters/Filters';
import useAccessToken from '../../hooks/useAccessToken';
import { Product } from '../../types/product/product';
import { FilterValues, Category, SORT_OPTIONS } from '../../types/product/product';
import styles from './CatalogPage.module.css';
import { SearchIcon, ClearIcon } from '../../components/Icons/BackIcons';
import { commercetoolsApi } from '../../api/commercetoolsApi';
import { formatFilterValue } from '../../utils/product';
import ScrollToTopButton from '../../components/ScrollToTopButton/ScrollToTopButton';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { token, loading: tokenLoading, error: tokenError } = useAccessToken();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    size: [],
    color: [],
    price: [],
  });

  const [sortOption, setSortOption] = useState<string>(SORT_OPTIONS[0].value);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    if (!token) return;

    const loadCategories = async () => {
      try {
        setIsCategoriesLoading(true);
        const data = await commercetoolsApi.fetchCategories(token);
        const allCats = data.results || [];

        setAllCategories(allCats);
        setCategories([
          { id: 'all', key: 'all', name: { en: 'All' } },
          ...allCats.filter((cat: Category) => !cat.parent),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [token]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    const loadFilteredProducts = async () => {
      try {
        setIsProductsLoading(true);
        const params = new URLSearchParams();

        params.set('staged', 'false');
        params.set('limit', '6');
        params.set('offset', offset.toString());

        if (debouncedSearchQuery.trim()) {
          params.set('text.en-GB', debouncedSearchQuery.trim());
        }

        if (sortOption) {
          params.set('sort', sortOption);
        }

        const categoryId =
          activeSubcategory !== 'all'
            ? activeSubcategory
            : activeCategory !== 'all'
              ? activeCategory
              : null;
        if (categoryId) {
          params.append('filter.query', `categories.id:"${categoryId}"`);
        }

        if (activeFilters.size.length > 0) {
          const sizes = activeFilters.size.map((s) => `"${s.toLowerCase()}"`).join(',');
          params.append('filter.query', `variants.attributes.size:${sizes}`);
        }

        if (activeFilters.color.length > 0) {
          const colors = activeFilters.color.map((c) => `"${c.toLowerCase()}"`).join(',');
          params.append('filter.query', `variants.attributes.color:${colors}`);
        }
        let parts = [];
        if (activeFilters.price.length > 0) {
          parts = activeFilters.price.map((range) => {
            const [min, max] = range.split('-').map(Number);
            return `(${min * 100} to ${max * 100})`;
          });
          params.append('filter.query', `variants.price.centAmount:range ${parts.join(',')}`);
        }

        const data = await commercetoolsApi.fetchProducts(token, params);
        if (offset === 0) {
          setProducts(data.results || []);
        } else {
          setProducts((prev) => [...prev, ...(data.results || [])]);
        }

        setHasMore((data.results?.length ?? 0) === 6);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        setIsProductsLoading(false);
      }
    };

    loadFilteredProducts();
    return () => controller.abort();
  }, [
    token,
    activeCategory,
    activeSubcategory,
    activeFilters,
    debouncedSearchQuery,
    sortOption,
    offset,
  ]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
  };

  const handleResetFilters = () => {
    setActiveFilters({ size: [], color: [], price: [] });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

  const getCurrentSortLabel = (): string => {
    const option = SORT_OPTIONS.find((opt) => opt.value === sortOption);
    return option ? option.label : 'Sort by';
  };

  const getSubcategoriesForActiveCategory = allCategories.filter(
    (cat) => cat.parent && cat.parent.id === activeCategory,
  );

  const isLoading = tokenLoading || isCategoriesLoading || isProductsLoading;

  if (tokenError) return <div>Error: {tokenError}</div>;
  if (error) return <div>Catalog loading error: {error}</div>;
  if (!categories.length) return <div>No categories found</div>;

  return (
    <div className={styles.catalog_page}>
      <Filters
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        selectedFilters={activeFilters}
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
            <p>{products.length} dinosaurs found</p>
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

        {products.length === 0 ? (
          <div className={styles.no_results}>
            <h3>No dinosaurs found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <ProductList
              products={products}
              searchQuery={debouncedSearchQuery}
              isLoading={isLoading}
            />
            {hasMore && (
              <div className={styles.load_more_container}>
                <button
                  type="button"
                  onClick={() => setOffset((prev) => prev + 6)}
                  disabled={isProductsLoading}
                  className={styles.load_more_button}
                >
                  {isProductsLoading ? 'Loading...' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default React.memo(CatalogPage);
