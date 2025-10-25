import React from 'react';
import Header from './Header';

function Layout({ children, cartItemsCount, search, setSearch, user, logout }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header cartItemsCount={cartItemsCount} search={search} setSearch={setSearch} user={user} logout={logout} />
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8 xl:px-0 xl:max-w-full" style={{maxWidth: '100vw'}}>
        {children}
      </main>
    </div>
  );
}

export default Layout;