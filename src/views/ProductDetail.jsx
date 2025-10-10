import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <Link 
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  const imageUrl = product.image || product.avatar || product.imageUrl || product.img;
  const price = product.price ? Number(product.price) : 0;
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
      setIsAdding(false);
      navigate('/cart');
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 mb-6 text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver a productos</span>
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt={product.name || 'Producto'}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Package className="w-32 h-32 text-blue-600 opacity-50" />
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-3">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              {product.category || 'Sin categoría'}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
          
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {product.description || 'Sin descripción disponible'}
          </p>
          
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">Precio</p>
            <p className="text-4xl font-bold text-blue-600">${price.toFixed(2)}</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAdding ? '✓ Agregado al carrito' : 'Agregar al Carrito'}
            </button>
            
            <Link
              to="/"
              className="block w-full text-center bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Seguir Comprando
            </Link>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Información del producto</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Envío gratis en todos los pedidos</li>
              <li>• Garantía de satisfacción</li>
              <li>• Devoluciones fáciles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;