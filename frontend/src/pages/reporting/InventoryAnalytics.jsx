import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import InventoryChart from '../../components/charts/InventoryChart';
import DataTable from '../../components/common/DataTable';
import { Package, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function InventoryAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getInventory()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading inventory balances...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  const columns = [
    { key: 'item', header: 'Item Description' },
    { key: 'quantity', header: 'Current Stock' },
    { key: 'reorderPoint', header: 'Reorder Point' },
    { key: 'unit', header: 'Measurement Unit' },
    {
      key: 'status',
      header: 'Stock Status',
      render: (_, row) => {
        const isLow = row.quantity < row.reorderPoint;
        return (
          <span className={`pill ${isLow ? 'pill-warn' : 'pill-good'}`}>
            {isLow ? 'Low Stock Warning' : 'Adequate'}
          </span>
        );
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Tracked Commodities"
          value={data.items.length}
          subtext="Raw materials & ingredients"
          icon={Package}
        />
        <StatCard
          label="Low Stock Items"
          value={data.lowStock.length}
          subtext="Items below reorder point"
          icon={AlertTriangle}
          badge={<span className={`pill ${data.lowStock.length > 0 ? 'pill-danger' : 'pill-good'}`}>{data.lowStock.length > 0 ? 'Action Required' : 'Optimal'}</span>}
        />
        <StatCard
          label="Reorder Coverage"
          value={`${Math.round(((data.items.length - data.lowStock.length) / (data.items.length || 1)) * 100)}%`}
          subtext="Stock compliance rate"
          icon={ShieldCheck}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Stock Level vs Reorder Threshold</h3>
            <p className="panel-subtitle">Visual analysis of on-hand quantities against buffer levels</p>
          </div>
        </div>
        <InventoryChart items={data.items} height={320} />
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Inventory Master Records</h3>
        </div>
        <DataTable rows={data.items} columns={columns} />
      </div>
    </div>
  );
}
