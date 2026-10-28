import React, { useEffect, useState } from 'react';
import reportingApi from '../../services/reportingApi';
import StatCard from '../../components/common/StatCard';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

export default function FinancialReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getFinancial()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading financial statements...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  const formatMoney = (v) => '₱' + Number(v || 0).toLocaleString('en-PH');
  const margin = data.revenue > 0 ? ((data.netIncome / data.revenue) * 100).toFixed(1) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Total Revenue"
          value={formatMoney(data.revenue)}
          subtext="Gross food & beverage sales"
          icon={TrendingUp}
        />
        <StatCard
          label="Operating Expenses"
          value={formatMoney(data.expenses)}
          subtext="COGS, labor, utilities, rent"
          icon={TrendingDown}
        />
        <StatCard
          label="Net Operating Income"
          value={formatMoney(data.netIncome)}
          subtext="EBITDA contribution"
          icon={Wallet}
        />
        <StatCard
          label="Net Profit Margin"
          value={`${margin}%`}
          subtext="Operating profitability"
          icon={PieChart}
          badge={<span className="pill pill-good">{margin}%</span>}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Monthly P&L Summary</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Financial Item</th>
                <th>Classification</th>
                <th>Amount (PHP)</th>
                <th>Percentage of Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gross Operating Revenue</strong></td>
                <td>Income</td>
                <td style={{ color: '#ffffff', fontWeight: '700' }}>{formatMoney(data.revenue)}</td>
                <td>100.0%</td>
              </tr>
              <tr>
                <td>Operating Costs & COGS</td>
                <td>Expenditure</td>
                <td style={{ color: '#d4a0a0' }}>{formatMoney(data.expenses)}</td>
                <td>{((data.expenses / (data.revenue || 1)) * 100).toFixed(1)}%</td>
              </tr>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <td><strong>Net Operating Margin</strong></td>
                <td><strong>Net Earnings</strong></td>
                <td style={{ color: '#34d399', fontWeight: '800' }}>{formatMoney(data.netIncome)}</td>
                <td><strong>{margin}%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
