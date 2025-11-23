import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Cart from './views/Cart';
import ProductDetail from './views/ProductDetail';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import { fetchProducts } from './services/api';
import { createProduct, deleteProduct } from './services/api';

const initialState = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
};

const AdminPanel = ({ products, createProduct, deleteProduct }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio.";
    if (Number(form.price) <= 0) return "El precio debe ser mayor a 0.";
    if (form.description.trim().length < 10) return "La descripción debe tener al menos 10 caracteres.";
    if (!form.imageUrl.trim()) return "La URL de imagen es obligatoria.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        category: "general",
        stock: 1,
        active: true,
      });
      setSuccess("Producto creado correctamente");
      setForm(initialState);
    } catch (err) {
      setError("Error al crear el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      await deleteProduct(id);
      setSuccess("Producto eliminado correctamente");
    } catch (err) {
      setError("Error al eliminar el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Agregar producto</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          name="imageUrl"
          placeholder="URL de imagen"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
        <button
          className="bg-black text-white px-4 py-2 rounded w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar producto"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>

      <h3 className="text-lg font-bold mt-8 mb-4">Productos actuales</h3>
      <ul>
        {products.map(product => (
          <li key={product.id} className="flex items-center justify-between mb-2">
            <span>{product.name} - ${product.price}</span>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(product.id)}
              disabled={loading}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const loadProducts = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchProducts();
          setProducts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [user]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para remover del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Función para actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Calcular total del carrito
  const cartTotal = cart.reduce((total, item) => {
    const price = item.price ? Number(item.price) : 0;
    return total + (price * item.quantity);
  }, 0);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Layout cartItemsCount={cartItemsCount} search={search} setSearch={setSearch} user={user} logout={logout}>
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <Home 
                products={products}
                loading={loading}
                error={error}
                addToCart={addToCart}
                search={search}
                setSearch={setSearch}
              />
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
              <Cart 
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
              />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <PrivateRoute>
              <ProductDetail 
                products={products}
                addToCart={addToCart}
              />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel
                products={products}
                createProduct={async (product) => {
                  await createProduct(product);
                  // Recarga productos después de agregar
                  const data = await fetchProducts();
                  setProducts(data);
                }}
                deleteProduct={async (id) => {
                  await deleteProduct(id);
                  // Recarga productos después de eliminar
                  const data = await fetchProducts();
                  setProducts(data);
                }}
              />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;