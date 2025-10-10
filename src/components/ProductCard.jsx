import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  // Validar que el producto tenga precio
  const price = product.price ? Number(product.price) : 0;
  
  // Obtener imagen del producto (avatar de MockAPI)
  const imageUrl = product.image || product.avatar || product.imageUrl || product.img;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={imageUrl} 
          alt={product.name || 'Producto'}
          onError={() => setImageError(true)}
        />
      </Link>
      <div className="product-title">
        <Link to={`/product/${product.id}`}>
          {product.name || 'Producto sin nombre'}
        </Link>
      </div>
      <div className="product-price">
        ${price.toFixed(2)}
      </div>
      <div className="product-description">
        {product.description || 'Sin descripción'}
      </div>
      <button 
        className="product-buy" 
        onClick={handleAddToCart}
      >
        {isAdding ? '¡Agregado!' : 'Comprar'}
      </button>
    </div>
  );
}

export default ProductCard;