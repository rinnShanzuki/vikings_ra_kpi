import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import SalesAnalytics from './pages/reporting/SalesAnalytics';
import InventoryAnalytics from './pages/reporting/InventoryAnalytics';
import HRAnalytics from './pages/reporting/HRAnalytics';
import FeedbackAnalytics from './pages/reporting/FeedbackAnalytics';
import FinancialReports from './pages/reporting/FinancialReports';
import ConsolidatedReports from './pages/reporting/ConsolidatedReports';
import ReportExport from './pages/reporting/ReportExport';

import KPIDashboard from './pages/kpi/KPIDashboard';
import KPIManagement from './pages/kpi/KPIManagement';
import TargetManagement from './pages/kpi/TargetManagement';
import PerformanceEvaluation from './pages/kpi/PerformanceEvaluation';
import KPIHistory from './pages/kpi/KPIHistory';
import KPIAlerts from './pages/kpi/KPIAlerts';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Executive Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Reporting & Analytics Module */}
        <Route path="/reporting/sales" element={<SalesAnalytics />} />
        <Route path="/reporting/inventory" element={<InventoryAnalytics />} />
        <Route path="/reporting/hr" element={<HRAnalytics />} />
        <Route path="/reporting/feedback" element={<FeedbackAnalytics />} />
        <Route path="/reporting/financial" element={<FinancialReports />} />
        <Route path="/reporting/consolidated" element={<ConsolidatedReports />} />
        <Route path="/reporting/export" element={<ReportExport />} />

        {/* Business Performance & KPI Module */}
        <Route path="/kpi" element={<KPIDashboard />} />
        <Route path="/kpi/manage" element={<KPIManagement />} />
        <Route path="/kpi/targets" element={<TargetManagement />} />
        <Route path="/kpi/evaluation" element={<PerformanceEvaluation />} />
        <Route path="/kpi/history" element={<KPIHistory />} />
        <Route path="/kpi/alerts" element={<KPIAlerts />} />

        {/* Backward-compatible legacy aliases */}
        <Route path="/sales" element={<Navigate to="/reporting/sales" replace />} />
        <Route path="/inventory" element={<Navigate to="/reporting/inventory" replace />} />
        <Route path="/hr" element={<Navigate to="/reporting/hr" replace />} />
        <Route path="/feedback" element={<Navigate to="/reporting/feedback" replace />} />
        <Route path="/financial" element={<Navigate to="/reporting/financial" replace />} />
        <Route path="/consolidated" element={<Navigate to="/reporting/consolidated" replace />} />
        <Route path="/export" element={<Navigate to="/reporting/export" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
