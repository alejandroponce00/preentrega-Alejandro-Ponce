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

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const { user, logout } = useContext(AuthContext);

  // useEffect para cargar productos desde MockAPI
  useEffect(() => {
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
  }, []);

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
            <Home 
              products={products}
              loading={loading}
              error={error}
              addToCart={addToCart}
              search={search}
              setSearch={setSearch}
            />
          } 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetail 
              products={products}
              addToCart={addToCart}
            />
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
              <div>
                <h2>Panel de Admin</h2>
                <p>Solo visible si estás autenticado.</p>
              </div>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;