import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Info } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <div className="demo-banner">
          <Info size={16} />
          <span>
            Development Preview Mode: Header role selector emulates RBAC permissions. Operational metrics reflect demonstration buffet records.
          </span>
        </div>
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
