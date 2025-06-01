import { FilterValues, Product } from '../types/product/product';

export const getProductName = (product: Product): string => {
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

export const buildWhereClause = (
  categoryId: string,
  subcategoryId: string,
  activeFilters: FilterValues,
): string | undefined => {
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

export const formatFilterValue = (value: string): string => {
  if (value === '120-150') return '$120 – $150';
  if (value === '200-240') return '$200 – $240';
  if (value === '310-430') return '$310 – $430';

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
