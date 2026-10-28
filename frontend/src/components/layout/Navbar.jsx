import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, UserCheck } from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard': 'Executive Management Dashboard',
  '/reporting/sales': 'Sales Performance & Analytics',
  '/reporting/inventory': 'Inventory Levels & Reorder Thresholds',
  '/reporting/hr': 'Staff Attendance & HR Analytics',
  '/reporting/feedback': 'Customer Feedback & Satisfaction',
  '/reporting/financial': 'Financial Statements & P&L',
  '/reporting/consolidated': 'Consolidated Operations Overview',
  '/reporting/export': 'Report Generation & CSV Export',
  '/kpi': 'Business Performance & KPI Dashboard',
  '/kpi/manage': 'KPI Target Configuration',
  '/kpi/targets': 'Target Management & Thresholds',
  '/kpi/evaluation': 'Performance Evaluation Matrix',
  '/kpi/history': 'KPI Historical Trends & Timeline',
  '/kpi/alerts': 'Operational Alerts & Underperforming Targets'
};

export default function Navbar() {
  const location = useLocation();
  const { role, setRole, availableRoles } = useAuth();

  const title = PAGE_TITLES[location.pathname] || 'Management Portal';
  const section = location.pathname.startsWith('/kpi') ? 'Business Performance & KPI' : 'Reporting & Analytics';

  return (
    <header className="app-navbar">
      <div className="navbar-breadcrumbs">
        <span className="breadcrumb-root">VikingsERP / {section}</span>
        <h1 className="page-heading">{title}</h1>
      </div>

      <div className="navbar-actions">
        <div className="role-badge-picker">
          <UserCheck size={16} color="#B03030" />
          <span className="role-picker-label">Role:</span>
          <select
            className="role-select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              window.location.reload();
            }}
          >
            {availableRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399' }}>
          <ShieldCheck size={16} />
          <span>API Connected</span>
        </div>
      </div>
    </header>
  );
}
