import React, { useState } from 'react';
import ProductList from '../components/ProductList';

function Home({ products, loading, error, addToCart, search, setSearch }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Obtener categorías únicas
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filtrar productos por búsqueda y categoría
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const name = p.name || "";
    const description = p.description || "";
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 text-lg font-semibold mb-2">Error al cargar productos</p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
        
        {/* Barra de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro de Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Productos */}
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}

export default Home;