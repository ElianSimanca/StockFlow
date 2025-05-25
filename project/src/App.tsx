import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Reports } from './pages/Reports';
import { Alerts } from './pages/Alerts';
import { Integration } from './pages/Integration';
import { Admin } from './pages/Admin';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Render the active page based on navigation selection
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'reports':
        return <Reports />;
      case 'alerts':
        return <Alerts />;
      case 'integration':
        return <Integration />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;