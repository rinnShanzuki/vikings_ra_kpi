import React, { useEffect, useState } from 'react';
import reportingApi from '../services/reportingApi';
import StatCard from '../components/common/StatCard';
import SalesChart from '../components/charts/SalesChart';
import { DollarSign, ShoppingCart, AlertCircle, TrendingUp, Users, Star, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportingApi.getDashboard()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel"><p>Loading executive dashboard data...</p></div>;
  if (error) return <div className="alert-box alert-error">{error}</div>;
  if (!data) return null;

  const formatMoney = (v) => '₱' + Number(v || 0).toLocaleString('en-PH');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="stats-grid">
        <StatCard
          label="Total Gross Sales"
          value={formatMoney(data.sales.totalSales)}
          subtext="October 2026 MTD"
          icon={DollarSign}
        />
        <StatCard
          label="Total Orders / Covers"
          value={data.sales.totalOrders}
          subtext="Completed Dine-in Orders"
          icon={ShoppingCart}
        />
        <StatCard
          label="Low Stock Alerts"
          value={data.inventory.lowStock.length}
          subtext={data.inventory.lowStock.length > 0 ? 'Requires restocking' : 'Optimal Inventory'}
          icon={AlertCircle}
        />
        <StatCard
          label="Net Operating Income"
          value={formatMoney(data.finance.netIncome)}
          subtext={`Revenue: ${formatMoney(data.finance.revenue)}`}
          icon={TrendingUp}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">
              <TrendingUp size={18} color="#B03030" />
              7-Day Sales Trend
            </h2>
            <p className="panel-subtitle">Revenue progression across buffet and beverage services</p>
          </div>
          <NavLink to="/reporting/sales" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
            View Full Sales Analytics <ArrowUpRight size={14} />
          </NavLink>
        </div>
        <SalesChart rows={data.sales.daily} height={300} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <Star size={18} color="#f59e0b" />
              Customer Satisfaction
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '40px', fontWeight: '800', color: '#f59e0b' }}>
              {data.feedback.averageRating}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '18px' }}>/ 5.0</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
            Calculated across {data.feedback.totalResponses} verified customer feedback responses.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <span className="pill pill-good">{data.feedback.positive} Positive</span>
            <span className="pill pill-warn">{data.feedback.neutral} Neutral</span>
            <span className="pill pill-danger">{data.feedback.negative} Negative</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <Users size={18} color="#B03030" />
              Workforce Attendance
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '40px', fontWeight: '800', color: '#ffffff' }}>
              {data.hr.attendanceRate}%
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Daily Rate</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
            {data.hr.presentToday} staff members present today out of {data.hr.totalStaff} total headcount.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <span className="pill pill-good">{data.hr.presentToday} Present</span>
            <span className="pill pill-danger">{data.hr.absentToday} Absent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
