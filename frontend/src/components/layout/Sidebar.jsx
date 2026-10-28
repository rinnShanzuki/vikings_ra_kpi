import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Users,
  MessageSquare,
  Wallet,
  FileText,
  Download,
  Target,
  Settings,
  Crosshair,
  TrendingUp,
  History,
  AlertTriangle
} from 'lucide-react';

const NAVIGATION_SECTIONS = [
  {
    title: 'Reporting & Analytics',
    items: [
      { path: '/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
      { path: '/reporting/sales', label: 'Sales Analytics', icon: BarChart3 },
      { path: '/reporting/inventory', label: 'Inventory Analytics', icon: Package },
      { path: '/reporting/hr', label: 'Staff / HR Analytics', icon: Users },
      { path: '/reporting/feedback', label: 'Customer Feedback', icon: MessageSquare },
      { path: '/reporting/financial', label: 'Financial Reports', icon: Wallet },
      { path: '/reporting/consolidated', label: 'Consolidated Reports', icon: FileText },
      { path: '/reporting/export', label: 'Report Export', icon: Download }
    ]
  },
  {
    title: 'Business Performance & KPI',
    items: [
      { path: '/kpi', label: 'KPI Dashboard', icon: Target },
      { path: '/kpi/manage', label: 'KPI Management', icon: Settings },
      { path: '/kpi/targets', label: 'Target Management', icon: Crosshair },
      { path: '/kpi/evaluation', label: 'Performance Evaluation', icon: TrendingUp },
      { path: '/kpi/history', label: 'KPI History', icon: History },
      { path: '/kpi/alerts', label: 'KPI Alerts', icon: AlertTriangle }
    ]
  }
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="brand-header">
        <div className="brand-icon-box">V</div>
        <div>
          <div className="brand-title">VikingsERP</div>
          <div className="brand-subtitle">Management Suite</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAVIGATION_SECTIONS.map((section) => (
          <div key={section.title} className="nav-group">
            <div className="nav-group-label">{section.title}</div>
            {section.items.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={17} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
