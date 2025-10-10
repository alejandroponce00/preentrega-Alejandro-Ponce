import React from 'react';
import Header from './Header';

function Layout({ children, cartItemsCount }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItemsCount} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;