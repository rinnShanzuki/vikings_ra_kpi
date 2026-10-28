import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import { DollarSign, Package, Users, Star, Wallet, CheckCircle2 } from 'lucide-react';

export default function ConsolidatedReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getConsolidated()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading consolidated restaurant report...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  const formatMoney = (v) => '₱' + Number(v || 0).toLocaleString('en-PH');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Cumulative Sales"
          value={formatMoney(data.sales.totalSales)}
          subtext="Revenue MTD"
          icon={DollarSign}
        />
        <StatCard
          label="Low Stock Alert"
          value={data.inventory.lowStock.length}
          subtext="Raw materials requiring reorder"
          icon={Package}
        />
        <StatCard
          label="Staff Attendance"
          value={`${data.hr.attendanceRate}%`}
          subtext={`${data.hr.presentToday} / ${data.hr.totalStaff} staff`}
          icon={Users}
        />
        <StatCard
          label="Customer Rating"
          value={`${data.feedback.averageRating} / 5`}
          subtext={`${data.feedback.totalResponses} surveys`}
          icon={Star}
        />
        <StatCard
          label="Net Profit"
          value={formatMoney(data.finance.netIncome)}
          subtext="Net income contribution"
          icon={Wallet}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">
            <CheckCircle2 size={18} color="#34d399" />
            Consolidated Operational Audit & Integration Status
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.6' }}>
          This consolidated overview cross-references Point of Sale, Warehouse Inventory, Biometrics HR, Table Feedback, and General Ledger accounts.
          All subsystems are connected through the VikingsERP Application Integration Layer.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="pill pill-good">POS Gateway: Connected</span>
          <span className="pill pill-good">Inventory API: Synced</span>
          <span className="pill pill-good">Timekeeping: Live</span>
          <span className="pill pill-good">Accounting: Balanced</span>
        </div>
      </div>
    </div>
  );
}
