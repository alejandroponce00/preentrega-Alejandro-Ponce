import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Home, Menu, X, User } from 'lucide-react';

function Header({ cartItemsCount, user, logout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="header">
           <h1 className="text-2xl font-bold  text-violet-950 ">Mi Ropa Shop</h1>
          <div className="header-search">
            
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-blue-600" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Productos</span>
            </Link>
            
            <Link
              to="/cart"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition relative ${
                location.pathname === '/cart' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Carrito</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    location.pathname === '/admin' 
                      ? 'bg-violet-700 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="ml-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === '/login' 
                    ? 'bg-violet-700 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Productos</span>
            </Link>
            
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                location.pathname === '/cart' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Carrito</span>
              </div>
              {cartItemsCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition ${
                    location.pathname === '/admin' 
                      ? 'bg-violet-700 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition ${
                  location.pathname === '/login' 
                    ? 'bg-violet-700 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;