import React from 'react';
import { Product } from '../../types/product/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => {
        const name = product.masterData.current.name['en-GB'];
        const description = product.masterData.current.description['en-GB'];
        const image = product.masterData.current.masterVariant.images[0]?.url || '/placeholder.png';
        const price =
          product.masterData.current.masterVariant.prices[0]?.value.centAmount / 100 || 0;

        return (
          <div key={product.id} className="product-card">
            <img src={image} alt={name} width="200" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>
              <strong>${price.toFixed(2)}</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
