import { FilterValues, Product } from '../types/product/product';

export const getProductName = (product: Product): string => {
  const nameObj = product.name;
  if (nameObj?.['en-GB']) {
    return nameObj['en-GB'];
  }
  if (nameObj?.['en']) {
    return nameObj['en'];
  }

  const nameAttribute = product.masterVariant?.attributes?.find(
    (attr) => attr.name === 'name' || attr.name === 'Name',
  );

  if (nameAttribute) {
    if (typeof nameAttribute.value === 'string') {
      return nameAttribute.value;
    }
    if (typeof nameAttribute.value === 'object' && nameAttribute.value !== null) {
      const valueObj = nameAttribute.value as { [key: string]: string };
      if (valueObj['en-GB']) return valueObj['en-GB'];
      if (valueObj['en']) return valueObj['en'];
    }
  }

  const slugObj = product.slug;
  if (slugObj?.['en-GB']) {
    return slugObj['en-GB']
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return product.id;
};

export const buildWhereClause = (
  categoryId: string,
  subcategoryId: string,
  activeFilters: FilterValues,
): string | undefined => {
  const conditions: string[] = [];

  if (subcategoryId && subcategoryId !== 'all') {
    conditions.push(`categories(id="${subcategoryId}")`);
  } else if (categoryId && categoryId !== 'all') {
    conditions.push(`categories(id="${categoryId}")`);
  }

  if (activeFilters.size.length > 0) {
    const sizeConditions = activeFilters.size.map(
      (size) => `masterVariant(attributes(name="size" and value="${size.toLowerCase()}"))`,
    );
    conditions.push(`(${sizeConditions.join(' or ')})`);
  }

  if (activeFilters.color.length > 0) {
    const colorConditions = activeFilters.color.map(
      (color) => `masterVariant(attributes(name="color" and value="${color.toLowerCase()}"))`,
    );
    conditions.push(`(${colorConditions.join(' or ')})`);
  }

  if (activeFilters.price.length > 0) {
    const priceConditions = activeFilters.price.map((range) => {
      const [min, max] = range.split('-').map(Number);
      return `masterVariant(prices(value(centAmount >= ${min * 100} and centAmount <= ${max * 100})))`;
    });
    conditions.push(`(${priceConditions.join(' or ')})`);
  }

  return conditions.length > 0 ? conditions.join(' and ') : undefined;
};

export const formatFilterValue = (value: string): string => {
  if (value === '100-150') return '$100 – $150';
  if (value === '150-250') return '$150 – $250';
  if (value === '250-500') return '$250 – $500';

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
