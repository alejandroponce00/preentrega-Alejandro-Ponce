// API Service - Manejo de llamadas a MockAPI

const API_URL = 'https://apiresfull25023.vercel.app/api/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    const data = await response.json();
    // Transformar datos para asegurar compatibilidad
    const productosArray = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
        ? data.products
        : Object.values(data).filter(v => Array.isArray(v))[0] || [];
    const transformedData = productosArray.map(item => ({
      ...item,
      id: item.id || item._id,
      name: item.name || item.nombre || item.title || 'Producto sin nombre',
      image: item.imageUrl || item.image || item.avatar || item.img,
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
    const item = await response.json();
    // Transformar el producto individual
    return {
      ...item,
      id: item.id || item._id,
      name: item.name || item.nombre || item.title || 'Producto sin nombre',
      image: item.imageUrl || item.image || item.avatar || item.img,
      price: item.price || Math.floor(Math.random() * 100) + 10,
      category: item.category || 'general',
      description: item.description || `Producto de alta calidad: ${item.name || item.nombre || item.title}`
    };
  } catch (error) {
    throw new Error(`Error al cargar el producto: ${error.message}`);
  }
};