// API Service - Manejo de llamadas a MockAPI

const API_URL = 'https://68f3ac9dfd14a9fcc42981d8.mockapi.io/productos';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    
    const data = await response.json();
    
    // Transformar datos de MockAPI para agregar campos faltantes
    const transformedData = data.map(item => ({
      ...item,
      name: item.name || item.nombre || item.title || 'Producto sin nombre',
      image: item.avatar || item.image,
      price: item.price || Math.floor(Math.random() * 100) + 10,
      category: item.category || 'general',
      description: item.description || `Producto de alta calidad: ${item.name || item.nombre || item.title}`
    }));
    
    return transformedData;
  } catch (error) {
    throw new Error(`Error en la API: ${error.message}`);
  }
};

// Puedes agregar más funciones de API aquí
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al cargar el producto: ${error.message}`);
  }
};