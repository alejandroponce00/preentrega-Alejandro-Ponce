import React from 'react';
import Header from './Header';

function Layout({ children, cartItemsCount, search, setSearch, user, logout }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-10   ">
      <Header cartItemsCount={cartItemsCount} search={search} setSearch={setSearch} user={user} logout={logout} />
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 xl:px-0 xl:max-w-full " style={{maxWidth: '100vw'}}>
        {children}
      </main>
      <footer className="w-full text-center py-4 text-gray-500 text-sm border-t border-gray-200 mt-8">
        Creado por Alejandro Ponce
      </footer>
    </div>
  );
}

export default Layout;