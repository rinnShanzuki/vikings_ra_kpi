import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import SalesChart from '../../components/charts/SalesChart';
import DataTable from '../../components/common/DataTable';
import DateFilter from '../../components/common/DateFilter';
import { DollarSign, ShoppingBag, Receipt, Download } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function SalesAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  const fetchSales = (query = {}) => {
    setLoading(true);
    reportingApi.getSales(query)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSales(filters);
  }, [filters]);

  const formatMoney = (v) => '₱' + Number(v || 0).toLocaleString('en-PH');

  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'category', header: 'Category' },
    { key: 'item', header: 'Item Name' },
    { key: 'orders', header: 'Order Count' },
    {
      key: 'amount',
      header: 'Gross Amount',
      render: (val) => <strong style={{ color: '#ffffff' }}>{formatMoney(val)}</strong>
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DateFilter
        onApply={(f) => setFilters(f)}
        onReset={() => setFilters({})}
      />

      {loading && <div className="panel"><p>Loading sales records...</p></div>}
      {error && <div className="alert-box alert-error">{error}</div>}

      {data && (
        <>
          <div className="stats-grid">
            <StatCard
              label="Filtered Total Sales"
              value={formatMoney(data.totalSales)}
              subtext="Sum of sales transactions"
              icon={DollarSign}
            />
            <StatCard
              label="Transaction Volume"
              value={data.totalOrders}
              subtext="Total covers served"
              icon={ShoppingBag}
            />
            <StatCard
              label="Average Order Value"
              value={formatMoney(data.averageOrderValue || (data.totalOrders ? data.totalSales / data.totalOrders : 0))}
              subtext="Revenue per order ticket"
              icon={Receipt}
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h3 className="panel-title">Sales Revenue Timeline</h3>
                <p className="panel-subtitle">Day-by-day revenue progression</p>
              </div>
              <NavLink to="/reporting/export" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                <Download size={14} /> Export CSV
              </NavLink>
            </div>
            <SalesChart rows={data.daily} height={320} />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Itemized Sales Ledger</h3>
            </div>
            <DataTable rows={data.daily} columns={columns} />
          </div>
        </>
      )}
    </div>
  );
}
