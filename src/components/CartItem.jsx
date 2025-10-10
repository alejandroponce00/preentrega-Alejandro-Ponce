import React, { useState } from 'react';
import { Package, X } from 'lucide-react';

function CartItem({ item, updateQuantity, removeFromCart }) {
  const [imageError, setImageError] = useState(false);
  const price = item.price ? Number(item.price) : 0;
  const imageUrl = item.image || item.avatar || item.imageUrl || item.img;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={item.name || 'Producto'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Package className="w-10 h-10 text-blue-600 opacity-50" />
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{item.name || 'Producto'}</h3>
        <p className="text-sm text-gray-500">{item.category || 'Sin categoría'}</p>
        <p className="text-lg font-bold text-blue-600 mt-1">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center font-bold"
        >
          -
        </button>
        
        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center justify-center font-bold"
        >
          +
        </button>
      </div>
      
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 transition ml-4"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CartItem;