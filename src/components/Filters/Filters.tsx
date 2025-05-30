import React, { useState, useEffect } from 'react';
import styles from './Filters.module.css';

interface FilterValues {
  size: string[];
  color: string[];
  price: string[];
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  onResetFilters: () => void;
  selectedFilters: FilterValues;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, onResetFilters, selectedFilters }) => {
  const [sizeFilter, setSizeFilter] = useState<string[]>(selectedFilters.size);
  const [colorFilter, setColorFilter] = useState<string[]>(selectedFilters.color);
  const [priceFilter, setPriceFilter] = useState<string[]>(selectedFilters.price);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSizeFilter(selectedFilters.size);
    setColorFilter(selectedFilters.color);
    setPriceFilter(selectedFilters.price);
  }, [selectedFilters]);

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    onFilterChange({
      size: newFilters.size || sizeFilter,
      color: newFilters.color || colorFilter,
      price: newFilters.price || priceFilter,
    });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, size: string) => {
    e.preventDefault();
    const newSizes = sizeFilter.includes(size)
      ? sizeFilter.filter((c) => c !== size)
      : [...sizeFilter, size];
    setSizeFilter(newSizes);
    handleFilterChange({ size: newSizes });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
    e.preventDefault();
    const newColors = colorFilter.includes(color)
      ? colorFilter.filter((c) => c !== color)
      : [...colorFilter, color];
    setColorFilter(newColors);
    handleFilterChange({ color: newColors });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, price: string) => {
    e.preventDefault();
    const newPrices = priceFilter.includes(price)
      ? priceFilter.filter((p) => p !== price)
      : [...priceFilter, price];
    setPriceFilter(newPrices);
    handleFilterChange({ price: newPrices });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSizeFilter([]);
    setColorFilter([]);
    setPriceFilter([]);
    onResetFilters();
    setIsMobileFiltersOpen(true);
  };

  const handleShowAll = (e: React.MouseEvent) => {
    e.preventDefault();
    onResetFilters();
  };

  return (
    <>
      <button
        className={styles.mobile_filters_toggle}
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
      >
        {isMobileFiltersOpen ? (
          <>
            <span>Hide filters</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9L12 16L5 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          <>
            <span>Show filters</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15L12 8L19 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <div className={`${styles.filters} ${isMobileFiltersOpen ? styles.filters_visible : ''}`}>
        <div className={styles.filter_section}>
          <h3>
            <a href="#" onClick={handleShowAll} className={styles.show_all_link}>
              All Dinosaurs
            </a>
          </h3>
          <div className={styles.filter_group}>
            <h4>Size</h4>
            <label>
              <input
                type="checkbox"
                checked={sizeFilter.includes('small')}
                onChange={(e) => handleSizeChange(e, 'small')}
              />
              Small
            </label>
            <label>
              <input
                type="checkbox"
                checked={sizeFilter.includes('medium')}
                onChange={(e) => handleSizeChange(e, 'medium')}
              />
              Medium
            </label>
            <label>
              <input
                type="checkbox"
                checked={sizeFilter.includes('large')}
                onChange={(e) => handleSizeChange(e, 'large')}
              />
              Large
            </label>
          </div>
        </div>

        <div className={styles.filter_section}>
          <h4>Color</h4>
          <div className={styles.filter_group}>
            <label>
              <input
                type="checkbox"
                checked={colorFilter.includes('Red')}
                onChange={(e) => handleColorChange(e, 'Red')}
              />
              Red
            </label>
            <label>
              <input
                type="checkbox"
                checked={colorFilter.includes('Blue')}
                onChange={(e) => handleColorChange(e, 'Blue')}
              />
              Blue
            </label>
            <label>
              <input
                type="checkbox"
                checked={colorFilter.includes('Green')}
                onChange={(e) => handleColorChange(e, 'Green')}
              />
              Green
            </label>
            <label>
              <input
                type="checkbox"
                checked={colorFilter.includes('Orange')}
                onChange={(e) => handleColorChange(e, 'Orange')}
              />
              Orange
            </label>
          </div>
        </div>

        <div className={styles.filter_section}>
          <h4>Price</h4>
          <div className={styles.filter_group}>
            <label>
              <input
                type="checkbox"
                checked={priceFilter.includes('120-150')}
                onChange={(e) => handlePriceChange(e, '120-150')}
              />
              $120 – $150
            </label>
            <label>
              <input
                type="checkbox"
                checked={priceFilter.includes('200-240')}
                onChange={(e) => handlePriceChange(e, '200-240')}
              />
              $200 – $240
            </label>
            <label>
              <input
                type="checkbox"
                checked={priceFilter.includes('310-430')}
                onChange={(e) => handlePriceChange(e, '310-430')}
              />
              $310 – $430
            </label>
          </div>
        </div>

        <button onClick={handleReset} className={styles.reset_button}>
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default Filters;
